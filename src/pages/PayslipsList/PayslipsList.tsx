import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import './PayslipsList.css';
import { formatDate } from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { fetchPayslips } from '../../features/payslipsActions';

const PayslipsList: React.FC = () => {
  const dispatch = useDispatch()<any>;
  const [showToast] = useIonToast();
  const { payslips, error, loading } = useSelector(
    (state: RootState) => ({
      payslips: state.payslipsStore.payslips.list,
      error: state.payslipsStore.payslips.error,
      loading: state.payslipsStore.payslips.loading,
    }),
    (prev, next) =>
      prev.payslips === next.payslips &&
      prev.error === next.error &&
      prev.loading === next.loading
  );

  useEffect(() => {
    dispatch(fetchPayslips());
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;

    showToast({
      message: error,
      duration: 2000,
      color: 'danger',
    });
  }, [error]);

  const doRefresh = async (event: any) => {
    dispatch(fetchPayslips());
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>

        {error && (
          <div className="ion-padding ion-text-center error-message">
            We couldn't fetch your payslips. Please, try later
          </div>
        )}

        <IonLoading isOpen={loading} message={'Getting payslips...'} />
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
