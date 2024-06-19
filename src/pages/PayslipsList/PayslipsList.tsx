import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from '@ionic/react';
import './PayslipsList.css';
import { useEffect } from 'react';

const payslips: Payslip[] = [
  {
    id: 1,
    fromDate: '2023-06-01',
    toDate: '2023-06-30',
    file: 'https://via.placeholder.com/100x200',
  },
  {
    id: 2,
    fromDate: '2023-07-01',
    toDate: '2023-07-30',
    file: 'https://via.placeholder.com/100x200',
  },
  {
    id: 3,
    fromDate: '2023-07-01',
    toDate: '2023-07-30',
    file: 'https://via.placeholder.com/100x200',
  },
];

const PayslipsList: React.FC = () => {
  const [present, dismiss] = useIonLoading();

  // This page content is just a mock so I'm faking a fetch with a loading modal
  useEffect(() => {
    present('Getting payslips...');
    setTimeout(() => {
      dismiss();
    }, 500);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {payslips.map((payslip) => (
              <IonCol size="6" size-md="3" size-lg="2" key={payslip.id}>
                <IonCard
                  className="payslip-card"
                  routerLink={`/payslips/${payslip.id}`}
                >
                  <IonCardHeader>
                    <IonCardTitle>Payslip {payslip.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>From: {payslip.fromDate}</p>
                    <p>To: {payslip.toDate}</p>
                  </IonCardContent>{' '}
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PayslipsList;
