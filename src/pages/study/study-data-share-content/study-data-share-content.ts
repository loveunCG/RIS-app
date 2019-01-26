import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, AlertController  } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { RemoteMeetingNew1Page } from '../../../pages/remote-meeting-new1/remote-meeting-new1';
import { RemoteProvider } from '../../../providers/remote/remote';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemoteMeetingPage } from '../../../pages/remote/remote-meeting/remote-meeting';
import { GESTURE_GO_BACK_SWIPE } from 'ionic-angular/gestures/gesture-controller';
import { RemoteMinePage } from '../../../pages/remote/remote-mine/remote-mine';
import { FileChooser } from '@ionic-native/file-chooser';


import { BasePage } from '../../base-page/base-page';
import { StudyProvider } from '../../../providers/study/study';
/**
 * Generated class for the StudyDataSharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-study-data-share-content',
  templateUrl: 'study-data-share-content.html',
})
export class StudyDataShareContentPage {
  loading: Loading;
  currentpath:string;
  datashareContet:any;
  downloadPath:string;
  sharePath:any=[];
  hosname:string;
  datashareList:any;
  constructor( public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public dataSevice: RemoteProvider,
    public loadingCtrl: LoadingController,
    private fileChooser: FileChooser,
    private alertCtrl: AlertController,
    public studyProvider:StudyProvider) {
      this.studyProvider.getHospitalShareList(null).subscribe((data)=>{
        this.datashareList = data;
        this.hosname = this.datashareList.hospital_folder;
        this.getShaerList(this.hosname); 
        console.log("qqqqqqqqqqqqq",this.hosname )
      });
  }

  getShaerList(url:string){
    var query={folder_path:url};
    this.studyProvider.getDataShareList(query).subscribe((data)=>{
      this.datashareContet = data.data;
      console.log("qqqqqqqqqqqqq",this.datashareContet )
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyDataSharePage');
  }

  public fileselect() {
    // Destination URL

  
    this.fileChooser.open()
    .then(uri =>       
      this.filePath.resolveNativePath(uri)
        .then(filePath => {
        var fpath = filePath;
        this.upload(fpath);
        console.log(fpath);
      }))
  }

  upload(fpath:string){

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject  = this.transfer.create();

    var uploadfilename = fpath.substr(fpath.lastIndexOf('/') + 1);
    var path = this.hosname
    var options:FileUploadOptions = {
      fileKey: 'file',
      fileName: uploadfilename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: {data_path:path},
      params: {data_path:path}
    }

    var uploadPath = 'http://120.55.63.29:5001/api/study/StduyDataShareListContent';
    console.log("qqqqqqqqqqqqq",options, uploadPath, uploadfilename )
    fileTransfer.upload(fpath, uploadPath, options)
    .then((data) => {
    console.log(data+" Uploaded Successfully");
    loader.dismiss();
    this.presentToast("File uploaded successfully"); 
    this.getShaerList(path);},
    error =>{
      loader.dismiss();
      this.presentToast('File uploaded faile');
      return;
    }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  download(filename:string) {
    var datapath;
    if(this.hosname == ''){
      datapath = '/' + filename;
    }
    else{
      datapath = this.hosname + '/' + filename;
    }
    var currentPath = this.hosname;


    if(datapath != ""){
      let loader = this.loadingCtrl.create({
        content: "下载..."
      });
      loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'http://120.55.63.29:5001/api/study/StduyDataShareDownload?' + 'data_path=' + datapath;
      console.log("@@@@@@@@@@", url)
      fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + filename).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.presentToast("download complete");
        loader.dismiss();
      }, (error) => {
        // handle error
        console.log("error")
        loader.dismiss();
        this.presentToast('下载失败');
      });
      this.getShaerList(currentPath)
    }
    else{
        let alert = this.alertCtrl.create({
          title: '通知',
          subTitle: '选择资料',
          buttons: ['确认']
        });
        alert.present();
    }

    this.downloadPath = "";
  }


  onClickList(title:string){
    this.sharePath.push(title);
    this.hosname += "/" + this.sharePath[this.sharePath.length-1];
    this.getShaerList(this.hosname);
  }

  sharepreve(){
    console.log(this.sharePath.length); 
    if(this.sharePath.length<1){
      this.navCtrl.pop();
    }else{
      var strpath = this.hosname.lastIndexOf('/');
      this.hosname = this.hosname.substring(0, strpath)
      this.sharePath.pop();
      this.getShaerList(this.hosname);
    }
  }

  sharesetting(title:string){
    var datapath;
    var currentPath
    if(this.hosname == ''){
      datapath = title;
      currentPath = '/'
    }
    else{
      datapath = this.hosname + '/' + title;
      currentPath = this.hosname;
    }
    console.log("qqqqqqqqqqqqq",datapath,  currentPath)
    let alert = this.alertCtrl.create();
    alert.setTitle('通知');
    alert.addInput({type: 'radio', label:'删除', value:'0'});
    alert.addInput({type: 'radio', label: '改名', value:'1'});
    alert.addButton('Cancel');
    alert.addButton({
      text: '确认',
      handler: data => {
        if(data==0){
          var query={
            folder_path_name:datapath
          }
          this.studyProvider.getRemoveShareList(query).subscribe((data)=>{
            console.log("qqqqqqqqqqqqq",data )
            this.getShaerList(currentPath);
          })
        }else{
          let alert = this.alertCtrl.create({
            title: '改 名',
            inputs: [
              {
                name: 'changename',
                placeholder: 'changename'
              }
            ],
            buttons: [
              {
                text: '取消',
              },
              {
                text: '改名',
                handler: data => {
                  if(data.changename!=""){
                    var query={
                      data_path:currentPath,
                      preve_name:title,
                      change_name:data.changename
                    }
                    this.studyProvider.getRenameShareList(query).subscribe((data)=>{
                      console.log("qqqqqqqqqqqqq",data )
                      if(data.response_code==0){
                        this.presentToast(' 改名失败了.');
                        return;
                      }
                      this.getShaerList(currentPath);
                    }),
                    err=>{
                      this.presentToast(' 改名失败了.');
                      return;
                    }
                  }
                  else{
                    return;
                  }
                }
              }
            ]
          });
          alert.present();
        }
      }});
      alert.present();
  }

  makeFolder(){
    var currentPath
    if(this.hosname == ''){
      currentPath = '/'
    }
    else{
      currentPath = this.hosname;
    }
    let alert = this.alertCtrl.create({
      title: '新建文件夹',
      inputs: [
        {
          name: 'foldername',
          placeholder: 'foldername'
        }
      ],
      buttons: [
        {
          text: '取消',
        },
        {
          text: '新建文件夹',
          handler: data => {
            var query={
              folder_path:currentPath,
              folder_name:data.foldername
            }
            this.studyProvider.getMakeShareList(query).subscribe((data)=>{
              if(data.response_code==0){
                this.presentToast('新建文件夹 失败了.');
                return;
              }
              this.getShaerList(currentPath);
            })
          }
        }
      ]
    });
    alert.present();
  }
}
