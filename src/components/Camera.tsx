import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonSegment,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Camera.css';
import { cameraOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

interface ContainerProps {}

const CameraComponent: React.FC<ContainerProps> = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    const img = `data:image/jpe;base64,${image.base64String}`;
    setImage(img);
  };

  const handleToggleModal = async () => {
    setToggleModal(true);
  };

  return (
    <>
      <IonButton onClick={() => handleToggleModal()}>
        <IonIcon
          slot="icon-only"
          icon={cameraOutline}
          color={'light'}
        ></IonIcon>
      </IonButton>

      <IonModal
        breakpoints={[0, 0.5, 0.8]}
        initialBreakpoint={0.5}
        ref={modal}
        isOpen={toggleModal != false}
        onIonModalDidDismiss={() => setToggleModal(false)}
      >
        <IonHeader>
          <IonToolbar color={'light'}>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
            <IonTitle>Camera Example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is just a simple example of the camera native plugin (also works
          on the web). In the past, I used to collaborate on a{' '}
          <a
            href="https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview/issues?q=erperejildo"
            target="_blank"
          >
            Cordova camera plugin
          </a>
          <p className="ion-padding">
            {image ? (
              <img src={image} alt="Image taken" />
            ) : (
              <IonButton color={'success'} expand="block" onClick={takePicture}>
                Take Picture
              </IonButton>
            )}
          </p>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CameraComponent;
