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
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { calendar, documentText } from 'ionicons/icons';
import { formatDate } from '../../utils/formatDate';

const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data
  const myPayslip: Payslip = {
    id: Number(id),
    fromDate: new Date('2023-06-01'),
    toDate: new Date('2023-06-30'),
    file: 'https://via.placeholder.com/150x50',
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
      </IonContent>

      <IonFooter>
        <IonButton expand="block">DOWNLOAD</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default PayslipDetails;
