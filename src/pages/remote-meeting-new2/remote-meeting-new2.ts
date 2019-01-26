import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading  } from 'ionic-angular';
// import { File } from '@ionic-native/file';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { RemoteMeetingNew1Page } from '../../pages/remote-meeting-new1/remote-meeting-new1';
import { RemoteProvider } from '../../providers/remote/remote';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemoteMeetingPage } from '../../pages/remote/remote-meeting/remote-meeting';
import { GESTURE_GO_BACK_SWIPE } from 'ionic-angular/gestures/gesture-controller';
import { RemoteMinePage } from '../../pages/remote/remote-mine/remote-mine';
import { HttpModule } from '@angular/http';

/**
 * Generated class for the RemoteMeetingNew2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;


@Component({
  selector: 'page-remote-meeting-new2',
  templateUrl: 'remote-meeting-new2.html',
})
export class RemoteMeetingNew2Page {
  private remoteSubmit : FormGroup;
  lastImage: string = null;
  loading: Loading;
  private isremoteflag:boolean =false; 

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    // private camera: Camera,
    // private transfer: Transfer,
    // private file: File,
    // private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public dataSevice: RemoteProvider,
    public loadingCtrl: LoadingController) {
      if(this.navParams.data.status){
        this.dataSevice.isRemote = this.navParams.data.status;
      }
      if(this.dataSevice.remoteDetail.remoteData){
        var contact_status = this.dataSevice.remoteDetail.remoteData.contact_status;
        if(contact_status==1||contact_status==3||contact_status==4||contact_status==5){
          this.dataSevice.isSave = false;
        }else{
          this.dataSevice.isSave = true;
        }
      }

      if(dataSevice.isRemote == 4){
        this.isremoteflag = true;
      }

      this.remoteSubmit = this.formBuilder.group({
        patient_id: ['', Validators.required],
        image_num: ['', Validators.required],
        disease_summary: ['', Validators.required],
        medical_history: ['', Validators.required],
        contact_problem: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log(this.dataSevice.remoteDetail);
    console.log('ionViewDidLoad RemoteMeetingNew2Page');
  }
  // public presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Select Image Source',
  //     buttons: [
  //       {
  //         text: 'Load from Library',
  //         handler: () => {
  //           this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  //         }
  //       },
  //       {
  //         text: 'Use Camera',
  //         handler: () => {
  //           this.takePicture(this.camera.PictureSourceType.CAMERA);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }
  // Create a new name for the image
// private createFileName() {
//   var d = new Date(),
//   n = d.getTime(),
//   newFileName =  n + ".jpg";
//   return newFileName;
// }
patientSearch():any{
  console.log( this.remoteSubmit.value.image_num);
  var query = { image_num: this.remoteSubmit.value.image_num};
  this.dataSevice.getpatientInfo(query).subscribe((data)=>{
    this.dataSevice.remoteDetail.remoteData = data;
    this.dataSevice.remoteDetail.remoteData.patient_id = data.booking_id;
    if(data.image_num=='') {
      this.presentToast('找不到患者的信息');
    }

  });
}
onSave():any{

  this.dataSevice.remoteSubmit = this.remoteSubmit.value;
  if(this.dataSevice.isRemote == 1){
    this.dataSevice.remoteSubmit.contact_type = 1;
  }
  else if(this.dataSevice.isRemote == 2)
  {
    this.dataSevice.remoteSubmit.contact_type = 2;
  }
  else if(this.dataSevice.isRemote == 3)
  {
    this.dataSevice.remoteSubmit.contact_type =this.dataSevice.remoteDetail.remoteData.contact_type;
  }
  if(!this.dataSevice.remoteSubmit.hasOwnProperty("patient_id")||this.dataSevice.remoteSubmit.patient_id==''){
    this.presentToast('请输入患者的信息');
    return;

  }
  this.dataSevice.remoteSubmit.save_status = 2;
  this.dataSevice.sendRequest(this.dataSevice.Const.urlsaveRemote,
    this.dataSevice.remoteSubmit).subscribe((data)=>{
      if(data['status'] == "success"){
        this.dataSevice.remoteSubmit = {};
        this.navCtrl.pop();
        }else{
      }   
  })
}
onNext():any{
  this.dataSevice.remoteSubmit = this.remoteSubmit.value;
  this.navCtrl.push(RemoteMeetingNew1Page);
}
// Copy the image to a local folder
// private copyFileToLocalDir(namePath, currentName, newFileName) {
//   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
//     this.lastImage = newFileName;
//   }, error => {
//     this.presentToast('Error while storing file.');
//   });
// }

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
// public pathForImage(img) {
//   if (img === null) {
//     return '';
//   } else {
//     return cordova.file.dataDirectory + img;
//   }
// }
// public takePicture(sourceType) {
//   // Create options for the Camera Dialog
//   var options = {
//     quality: 100,
//     sourceType: sourceType,
//     saveToPhotoAlbum: false,
//     correctOrientation: true
//   };

  // Get the data of an image
//   this.camera.getPicture(options).then((imagePath) => {
//     // Special handling for Android library
//     if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
//       this.filePath.resolveNativePath(imagePath)
//         .then(filePath => {
//           let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
//           let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
//           this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//         });
//     } else {
//       var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
//       var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//     }
//   }, (err) => {
//     this.presentToast('Error while selecting image.');
//   });
// }
// public uploadImage() {
//   // Destination URL
//   var url = "http://yoururl/upload.php";

//   // File for Upload
//   var targetPath = this.pathForImage(this.lastImage);

//   // File name only
//   var filename = this.lastImage;

//   var options = {
//     fileKey: "file",
//     fileName: filename,
//     chunkedMode: false,
//     mimeType: "multipart/form-data",
//     params : {'fileName': filename}
//   };

//   const fileTransfer: TransferObject = this.transfer.create();

//   this.loading = this.loadingCtrl.create({
//     content: 'Uploading...',
//   });
//   this.loading.present();

//   // Use the FileTransfer to upload the image
//   fileTransfer.upload(targetPath, url, options).then(data => {
//     this.loading.dismissAll()
//     this.presentToast('Image succesful uploaded.');
//   }, err => {
//     this.loading.dismissAll()
//     this.presentToast('Error while uploading file.');
//   });
// }

}
