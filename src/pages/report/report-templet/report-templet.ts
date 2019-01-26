import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { BasePage } from '../../base-page/base-page';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { ReportUserDetailPage } from '../../../pages/report/report-user-detail/report-user-detail';

import { ReportProvider } from '../../../providers/report/report';
import { ReporTemplateMakePage } from '../../../pages/report/report-templet-make/report-templet-make';

/**
 * Generated class for the ReportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-templet',
  templateUrl: 'report-templet.html',
})
export class ReporTemplatePage extends BasePage {
  isdevice:boolean=false;
  isclass:boolean=false;
  issubclass:boolean=false;
  template:any;
  templateDeivceList:any;
  templateClassList:any;
  devicenameflag:number;
  classflag:number;
  subclassindex:number;
  templatesubclass:any;
  templatesubclasslist:any;
  templatecontent:any;
  templatecontentList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, 
    public toast:ToastController, public alertController:AlertController) { 
    super(toast);
    this.reportService.getTemplateDevice(null).subscribe((data)=>{
      this.template = data;
      console.log("",this.template )
      if(this.template.response_code == 1){
         this.templateDeivceList = this.template.data.template_device;
         this.templateClassList = this.template.data.template_class;
      }else{
        return;
      }
    }, err =>{
      return;
    });
  }

  ionViewDidLoad() {
  }

  deviceClick(device:number){
    this.isclass = false;
    this.issubclass = false;
    if( this.devicenameflag == device ){
      if(this.isdevice){
        this.isdevice = false;
      }
      else{
        this.isdevice = true;
      }
    }
    else{
      this.devicenameflag = device;
      if(!this.isdevice){
        this.isdevice = true;
      }
    }
    console.log( this.devicenameflag )

  }

  classClick(device_name:string, class_id:any, index:number ){
    if( this.classflag == index ){
      if(this.isclass){
        this.isclass = false;
      }
      else{
        this.isclass = true;
      }
    }else{
      this.classflag = index;      
      if(!this.isclass){
        this.isclass = true;
      }
    }


    var query = {
      'template_device':device_name,
      'template_class_id':class_id
    }

    this.reportService.getTemplateSubClass(query).subscribe((data)=>{
      this.templatesubclass = data
      this.templatesubclasslist =  this.templatesubclass.data;
    }, err =>{
      return;
    });
  }

  subclassClick(device_name:any, subclass_id:any, index:any ){
    if( this.subclassindex == index ){
      if(this.issubclass){
        this.issubclass = false;
      }
      else{
        this.issubclass = true;
      }
    }else{
      this.subclassindex = index;      
      if(!this.issubclass){
        this.issubclass = true;
      }
    }


    var query = {
      'template_device':device_name,
      'template_subclass_id':subclass_id
    }
    this.reportService.getTemplateContent(query).subscribe((data)=>{
      this.templatecontent = data
      this.templatecontentList = this.templatecontent.data;
      console.log("22222222", this.templatecontent)
    }, err =>{
      return;
    });
  }
  
  contentClick(device_name:any,subclass_id:any, index:any ){
    console.log("!!!!!!!!!!!", index)
    var query = {
          'template_device':device_name,
          'template_subclass_id':subclass_id
        }
        // this.reportService.getTemplateContent(query).subscribe((data)=>{
        //   this.templatecontent = data
          // if(this.templatecontent.data[index]){
          //   this.templatecontentList =  this.templatecontent.data[index];
            let alert = this.alertController.create({
              title: this.templatecontentList[0].template_content_title,
              message: "影像学表现<br><br>" + this.templatecontentList[0].template_content_image + "<br><br>" + "建议<br><br>" + this.templatecontentList[0].template_content_suggestion,
              buttons: [
                {
                  text: '取消'
                },
                {
                  text: '确认',
                  handler: () => {
                    this.reportService.template_image = this.templatecontentList[0].template_content_image;
                    this.reportService.template_suggestion = this.templatecontentList[0].template_content_suggestion;
                    this.reportService.istemplate = true;
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            alert.present();
          //}
          // else{
          //   return;
          // }
          

        // }, err =>{
        //   return;
        // });
  }

  subClassAdd(devicename:string, classid:number, index:number){
    let alert = this.alertController.create({
      title: '二级分类添加',
      inputs: [
        {
          name: 'subclass',
          placeholder: 'subclass'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: '添加',
          handler: data => {
            if(data.subclass == ""){
              return;
            }else{
               var query = {
                'template_device':devicename,
                'template_class_id':classid,
                'template_subclass_name':data.subclass
               }
            this.reportService.getTemplatsubClassEdit(query).subscribe(data=>{
                this.classClick(devicename, classid, index );
            });
            }
           
          }
        }
      ]
    });
    alert.present();
  }

  eidttemplate(devicename:any,classname:any, subclassname:any, subclassid:any, index:any){
    
    this.navCtrl.push(ReporTemplateMakePage, {edit_type:2, device_name:devicename, class_name:classname, subclass_name:subclassname ,subclass_id:subclassid, index:index});
  }

  ionViewWillEnter(){
    this.isdevice = false;
    this.isclass = false;
    this.issubclass = false;
  }

  newtemplate(devicename:any,classname:any, subclassname:any, subclassid:any){
    let alert = this.alertController.create({
      title: "设定",
      buttons: [
        {
          text: '删除',
          handler: () => {
            var query={
              'template_subclass_id':subclassid
            }
            this.reportService.getTemplateRemove(query).subscribe(data=>{
              this.isclass = false;
            }, 
            err=>{
                console.log(err); 
            });
          }
        },
        {
          text: '编辑',
          handler: () => {
            this.navCtrl.push(ReporTemplateMakePage, {edit_type:1, device_name:devicename, class_name:classname, subclass_name:subclassname ,subclass_id:subclassid});
          }
        }
      ]
    });
    alert.present();
  }
    

}
