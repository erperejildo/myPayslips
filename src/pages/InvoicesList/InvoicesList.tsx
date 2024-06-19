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
} from '@ionic/react';
import './InvoicesList.css';

const invoices: Invoice[] = [
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

const InvoicesList: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Invoices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {invoices.map((invoice) => (
              <IonCol size="6" size-md="3" size-lg="2" key={invoice.id}>
                <IonCard className="custom-card">
                  <IonCardHeader>
                    <IonCardTitle>Invoice {invoice.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>From: {invoice.fromDate}</p>
                    <p>To: {invoice.toDate}</p>
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

export default InvoicesList;
