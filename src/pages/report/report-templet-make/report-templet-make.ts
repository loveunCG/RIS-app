import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { ReportUserDetailPage } from '../../../pages/report/report-user-detail/report-user-detail';

import { ReportProvider } from '../../../providers/report/report';
import { query } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the ReporTemplateMakePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-templet-make',
  templateUrl: 'report-templet-make.html',
})
export class ReporTemplateMakePage {
  templateSubmit:any;
  templatecontent:any;
  teplatedata:any;
  templatetitle:string;
  templateimg:string;
  templatesuggestion:string;
  templatecheckup:string;
  devicename:any = [];
  classname:any = [];
  subclassname:any;
  template:any;
  templateDeivceList:any;
  templateClassList:any;
  subclassid:any;
  templateid:any;
  classid:any;
  public isedit:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider,     private formBuilder: FormBuilder,
     public alertController:AlertController) { 
       console.log( this.navParams.data)
      this.reportService.getTemplateDevice(null).subscribe((data)=>{
        this.template = data;
        if(this.template.response_code == 1){
           this.templateDeivceList = this.template.data.template_device;
           this.templateClassList = this.template.data.template_class;
        }else{
          return;
        }
      }, err =>{
        return;
      });
       if(this.navParams.data.edit_type == 1){
        this.templatetitle = '';
        this.templateimg = '';
        this.templatesuggestion = '';
        this.templatecheckup = '';
        this.devicename[0] = this.navParams.data.device_name;
        this.classname[0] = this.navParams.data.class_name;
        this.subclassname = this.navParams.data.subclass_name;
        this.subclassid = this.navParams.data.subclass_id;
        this.templateid = ''
       }else{
        this.isedit = true;
        this.devicename[0] = this.navParams.data.device_name;
        this.classname[0] = this.navParams.data.class_name;
        this.subclassname = this.navParams.data.subclass_name;
        this.subclassid = this.navParams.data.subclass_id;
        var query = {
          'template_device':this.navParams.data.device_name,
          'template_subclass_id':this.navParams.data.subclass_id
        }
        this.reportService.getTemplateContent(query).subscribe((data)=>{
          this.templatecontent = data;
          console.log("111111111111111111111",this.templatecontent )

          if(this.templatecontent.data[this.navParams.data.index]){
            if(this.templatecontent.data[this.navParams.data.index].template_content_title){
              this.templatetitle = this.templatecontent.data[this.navParams.data.index].template_content_title
            }
            else{
              this.templatetitle = ''
            }
            if(this.templatecontent.data[this.navParams.data.index].template_content_image){
              this.templateimg = this.templatecontent.data[this.navParams.data.index].template_content_image
            }
            else{
              this.templateimg = ''
            }
            if(this.templatecontent.data[this.navParams.data.index].template_content_title){
              this.templatesuggestion = this.templatecontent.data[this.navParams.data.index].template_content_title
            }
            else{
              this.templatesuggestion = ''
            }
            if(this.templatecontent.data[this.navParams.data.index].checkup_name){
              this.templatecheckup = this.templatecontent.data[this.navParams.data.index].checkup_name
            }
            else{
              this.templatecheckup = ''
            }
            if(this.templatecontent.data[this.navParams.data.index].template_content_id){
              this.templateid = this.templatecontent.data[this.navParams.data.index].template_content_id
            }
            else{
              this.templateid = ''
            }
          }else{
            this.templatetitle = '';
            this.templateimg = '';
            this.templatesuggestion = '';
            this.templatecheckup = '';
            this.templateid = '';
          }
          
        });
       }
       this.templateSubmit = this.formBuilder.group({
        device_name: [this.devicename[0] , Validators.required],
        class_name: [this.classname[0] , Validators.required],
        subclass_name: ['', Validators.required],
        template_title: [ '', Validators.required],
        template_image: [ '', Validators.required],
        template_suggestion: ['', Validators.required],
        template_checkup: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    
  }

  removeClick(){
    var query={
      'template_content_id':this.templateid
    }
    this.reportService.getTemplatecontentRemove(query).subscribe(data=>{
      this.navCtrl.pop();
    }, 
    err=>{
       console.log(err); 
    });
  }

  editClick(){
    let templateval = this.templateSubmit.value;
    var query;
    if(this.templateid == '' && !this.subclassid){
      query = {
        'template_device':templateval.device_name,    
        'template_subclass_id':this.subclassid ,
        'template_title':templateval.template_title,
        'template_content_image':templateval.template_image,
        'template_content_suggestion':templateval.template_suggestion,
        'template_content_checkup':templateval.template_checkup,
      }
      this.reportService.getTemplateEdit(query).subscribe(data=>{
          this.navCtrl.pop();
      })
    }
    else if(this.templateid == '' && this.subclassid){
      query = {
        'template_device':templateval.device_name,    
        'template_subclass_id':this.subclassid,
        'template_title':templateval.template_title,
        'template_content_image':templateval.template_image,
        'template_content_suggestion':templateval.template_suggestion,
        'template_content_checkup':templateval.template_checkup,
      }
      this.reportService.getTemplateEdit(query).subscribe(data=>{
        this.navCtrl.pop();
      })
    }
    else if(this.templateid != ''){
      query = {
        'template_device':templateval.device_name,           
        'template_subclass_id':this.subclassid,
        'template_id':this.templateid,
        'template_title':templateval.template_title,
        'template_content_image':templateval.template_image,
        'template_content_suggestion':templateval.template_suggestion,
        'template_content_checkup':templateval.template_checkup,
      }
      this.reportService.getTemplateEdit(query).subscribe(data=>{
        this.navCtrl.pop();
      })
    }
    console.log("@@@@@@@" , query, this.templateid)
  }
}
