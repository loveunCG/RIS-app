import { ToastController } from 'ionic-angular';

export class BasePage {
  constructor(public toastCtrl?: ToastController) {
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
