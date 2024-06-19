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
  useIonLoading,
  IonGrid,
  IonRow,
  IonCol,
  CreateAnimation,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { calendar, documentText, downloadOutline } from 'ionicons/icons';
import { formatDate } from '../../utils/formatDate';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchPayslipById } from '../../store/payslipsSlice';

const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showToast] = useIonToast();
  const isNative = Capacitor.isNativePlatform();
  const [present, dismiss] = useIonLoading();
  const animationRef = useRef<CreateAnimation | null>(null);
  const dispatch = useDispatch()<any>;

  const myPayslip = useSelector((state: RootState) =>
    state.payslips.payslips.find((payslip) => payslip.id === Number(id))
  );

  useEffect(() => {
    if (!myPayslip) {
      dispatch(fetchPayslipById(Number(id)));
    }
  }, [myPayslip, dispatch, id]);

  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();
  });

  const handleDownload = () => {
    if (!myPayslip) return;

    isNative ? downloadNative() : downloadWeb();
  };

  const base64FromPath = async (path: string): Promise<Blob | string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string');
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  const downloadNative = async () => {
    if (!myPayslip) return;

    present('Downloading payslip...');
    try {
      const filename = `payslip_${myPayslip.id}.png`;
      const base64Data = await base64FromPath(myPayslip.file);
      await Filesystem.writeFile({
        path: filename,
        data: base64Data,
        directory: Directory.Documents,
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
      console.error(error);
    }
  };

  const downloadWeb = () => {
    if (!myPayslip) return;

    const link = document.createElement('a');
    link.href = myPayslip.file;
    link.setAttribute('download', `payslip_${myPayslip.id}.png`);
    document.body.appendChild(link);
    link.click();
  };

  if (!myPayslip) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color={'primary'}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          Loading payslip details...
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Payslip {id}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="6">
              <IonImg src={myPayslip.file} alt={`Payslip ${myPayslip.id}`} />
              <IonList>
                <IonItem>
                  <IonIcon icon={calendar} slot="start" />
                  <IonLabel>
                    <h2>From Date</h2>
                    <p>{formatDate(myPayslip.fromDate)}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={calendar} slot="start" />
                  <IonLabel>
                    <h2>To Date</h2>
                    <p>{formatDate(myPayslip.toDate)}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={documentText} slot="start" />
                  <IonLabel>
                    <h2>File</h2>
                    <p>
                      <a
                        href={myPayslip.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                    </p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="8" sizeMd="2">
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
    </IonPage>
  );
};

export default PayslipDetails;
