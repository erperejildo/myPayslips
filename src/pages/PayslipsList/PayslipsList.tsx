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
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter,
} from '@ionic/react';
import './PayslipsList.css';
import { formatDate } from '../../utils/formatDate';
import { fetchPayslips } from '../../store/payslipsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';

const PayslipsList: React.FC = () => {
  const dispatch = useDispatch()<any>;
  const [present, dismiss] = useIonLoading();
  const { payslips, loading } = useSelector(
    (state: RootState) => state.payslips
  );

  useIonViewWillEnter(() => {
    present('Getting payslips...');
    dispatch(fetchPayslips());
    dismiss();
  });

  useEffect(() => {
    if (!loading) dismiss();
  }, [loading]);

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
            {loading
              ? [...Array(10)].map((_, index) => (
                  <IonCol size="6" size-md="3" size-lg="2" key={index}>
                    <IonCard className="payslip-card">
                      <IonCardHeader>
                        <IonSkeletonText />
                      </IonCardHeader>
                      <IonCardContent>
                        <p>
                          <IonSkeletonText />
                        </p>
                        <p>
                          <IonSkeletonText />
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))
              : payslips.map((payslip) => (
                  <IonCol size="6" size-md="3" size-lg="2" key={payslip.id}>
                    <IonCard
                      color={'light'}
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
