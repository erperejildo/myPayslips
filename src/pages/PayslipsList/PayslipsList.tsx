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
  useIonViewDidEnter,
} from '@ionic/react';
import './PayslipsList.css';
import { formatDate } from '../../utils/formatDate';
import { setPayslips } from '../../store/payslipsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const PayslipsList: React.FC = () => {
  const dispatch = useDispatch();
  const payslips = useSelector((state: RootState) => state.payslips.payslips);
  const [present, dismiss] = useIonLoading();

  useIonViewDidEnter(() => {
    present('Getting payslips...');
    // This page content is just a mock so I'm faking a fetch with a loading modal
    setTimeout(() => {
      const fetchedPayslips = [
        {
          id: 1,
          fromDate: new Date('2023-06-01'),
          toDate: new Date('2023-06-30'),
          file: 'https://via.placeholder.com/100x200',
        },
        {
          id: 2,
          fromDate: new Date('2023-07-01'),
          toDate: new Date('2023-07-30'),
          file: 'https://via.placeholder.com/100x200',
        },
        {
          id: 3,
          fromDate: new Date('2024-01-01'),
          toDate: new Date('2024-02-30'),
          file: 'https://via.placeholder.com/100x200',
        },
      ];
      dispatch(setPayslips(fetchedPayslips));
      dismiss();
    }, 500);
  });

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
                    <IonCardTitle>{payslip.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>From: {formatDate(payslip.fromDate)}</p>
                    <p>To: {formatDate(payslip.toDate)}</p>
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
