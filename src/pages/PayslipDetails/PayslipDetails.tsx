import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonImg,
  IonButtons,
  IonBackButton,
  IonFooter,
  IonButton,
  useIonToast,
  IonGrid,
  IonRow,
  IonCol,
  CreateAnimation,
  useIonViewDidEnter,
  useIonViewWillEnter,
  IonLoading,
  useIonLoading,
  IonSkeletonText,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import {
  calendar,
  documentText,
  downloadOutline,
  informationCircle,
} from 'ionicons/icons';
import { formatDate } from '../../utils/formatDate';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import CameraComponent from '../../components/Camera';
import { fetchPayslipById } from '../../features/payslipsActions';
import './PayslipDetails.css';

const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showToast] = useIonToast();
  const isNative = Capacitor.isNativePlatform();
  const animationRef = useRef<CreateAnimation | null>(null);
  const [dismiss] = useIonLoading();
  const dispatch = useDispatch()<any>;
  const [imageLoaded, setImageLoaded] = useState(false);
  const { payslip, error, loading } = useSelector(
    (state: RootState) => ({
      payslip: state.payslipsStore.activePayslip.payslip,
      error: state.payslipsStore.activePayslip.error,
      loading: state.payslipsStore.activePayslip.loading,
    }),
    (prev, next) =>
      prev.payslip === next.payslip &&
      prev.error === next.error &&
      prev.loading === next.loading
  );

  // this is an example of how to get the payslip from the state but in this scenario,
  // we want to get it from a different API.
  // const myPayslip = useSelector((state: RootState) =>
  //   state.payslips.payslips.find((payslip) => payslip.id === Number(id))
  // );

  useIonViewWillEnter(() => {
    dispatch(fetchPayslipById(Number(id)));
  });

  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();
  });

  useEffect(() => {
    if (!error) return;

    showToast({
      message: error,
      duration: 2000,
      color: 'danger',
    });
  }, [error]);

  const handleDownload = () => {
    if (!payslip) return;
    isNative ? downloadNative() : downloadWeb();
  };

  const downloadNative = async () => {
    if (!payslip) return;

    try {
      await Filesystem.downloadFile({
        url: payslip.file,
        directory: Directory.Documents,
        path: `payslip_${payslip.id}.png`,
      });

      dismiss();
      showToast({
        message: 'Image downloaded. Check your gallery',
        duration: 2000,
        color: 'success',
      });
    } catch (error) {
      dismiss();
      showToast({
        message: 'Something weird happened. Try later',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  const downloadWeb = () => {
    if (!payslip) return;

    const link = document.createElement('a');
    link.href = payslip.file;
    link.setAttribute('download', `payslip_${payslip.id}.png`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Payslip {id}</IonTitle>
          <IonButtons slot="end">
            <CameraComponent />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && (
          <div className="ion-padding ion-text-center error-message">
            We couldn't fetch your payslip. Please, try later
          </div>
        )}
        {loading ? (
          <IonLoading isOpen={true} message={'Loading payslip...'} />
        ) : (
          payslip && (
            <IonGrid>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="6">
                  <IonImg
                    src={payslip.file}
                    onIonImgDidLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <IonSkeletonText animated className="loading-image" />
                  )}

                  <IonList>
                    <IonItem>
                      <IonIcon icon={calendar} slot="start" />
                      <IonLabel>
                        <h2>From Date</h2>
                        <p>{formatDate(payslip.fromDate)}</p>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonIcon icon={calendar} slot="start" />
                      <IonLabel>
                        <h2>To Date</h2>
                        <p>{formatDate(payslip.toDate)}</p>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonIcon icon={documentText} slot="start" />
                      <IonLabel>
                        <h2>File</h2>
                        <p>
                          <a
                            href={payslip.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        </p>
                      </IonLabel>
                    </IonItem>{' '}
                    <IonItem>
                      <IonIcon icon={informationCircle} slot="start" />
                      <IonLabel>
                        <h2>Note</h2>
                        <p>Remember that I'm mocked data, so I won't change</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          )
        )}
      </IonContent>

      {payslip && (
        <IonFooter>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol size="8" sizeMd="3">
                <CreateAnimation
                  ref={animationRef}
                  duration={2000}
                  iterations={Infinity}
                  delay={1000}
                  keyframes={[
                    { offset: 0, transform: 'scale(1)', opacity: '1' },
                    { offset: 0.5, transform: 'scale(1.2)', opacity: '0.8' },
                    { offset: 1, transform: 'scale(1)', opacity: '1' },
                  ]}
                >
                  <IonButton expand="block" onClick={handleDownload}>
                    DOWNLOAD <IonIcon slot="end" icon={downloadOutline} />
                  </IonButton>
                </CreateAnimation>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default PayslipDetails;
