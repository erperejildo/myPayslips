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
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { calendar, documentText, downloadOutline } from 'ionicons/icons';
import { formatDate } from '../../utils/formatDate';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showToast] = useIonToast();
  const isNative = Capacitor.isNativePlatform();
  const [present, dismiss] = useIonLoading();

  // Mock data. In a real world, coming from API
  const myPayslip: Payslip = {
    id: Number(id),
    fromDate: new Date('2023-06-01'),
    toDate: new Date('2023-06-30'),
    file: 'https://via.placeholder.com/150x50',
  };

  const handleDownload = () => {
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
    const link = document.createElement('a');
    link.href = myPayslip.file;
    link.setAttribute('download', `payslip_${myPayslip.id}.png`);
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
            <IonCol size="12" sizeMd="2">
              <IonButton expand="block" onClick={handleDownload}>
                DOWNLOAD <IonIcon slot="end" icon={downloadOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default PayslipDetails;
