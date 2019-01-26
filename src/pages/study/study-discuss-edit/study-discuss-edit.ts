import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { StudyProvider } from '../../../providers/study/study';
import { concat } from 'rxjs/operators/concat';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the StudyDiscussPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-study-discuss-edit',
  templateUrl: 'study-discuss-edit.html',
})
export class StudyDiscussEditPage {
  discuss:any;
  posttitle:string = "";
  postcontent:String = "";
  buttonflag:boolean;
  isadd:boolean;
  private postSubmit : FormGroup;
  isauthor:boolean;
  postdata:any;
  cmt_pst_id:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public studyProvider:StudyProvider, public alertController:AlertController,  private formBuilder: FormBuilder,) {
    
    if(navParams.data.psottitle){
      this.buttonflag = true
      this.posttitle = navParams.data.psottitle;
      this.postcontent = navParams.data.postcontent;
      this.isauthor = navParams.data.isauthor;
      this.cmt_pst_id = navParams.data.post_id;
    }else{
      this.buttonflag = false
    }

    this.postSubmit = this.formBuilder.group({
      posttitle:[this.posttitle, Validators.required],
      postcontent:[this.postcontent, Validators.required]
    });

    console.log('ionViewDidLoad 11111111111', this.posttitle, this.postcontent);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyDiscussPage');
  }

  addcomment(){
    let alert = this.alertController.create({
      title: 'comment',
      inputs: [
        {
          name: 'comment',
          placeholder: 'comment'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'save',
          handler: data => {
            let query = {'cmt_content' : data.comment,
                        'cmt_pst_id': this.cmt_pst_id};
                        console.log("errorqqqqqqqqqq")
                        this.studyProvider.getaddComment(query).subscribe((data)=>{
                          this.navCtrl.pop();
                        },err =>{console.log("error"), err});
          }
        }
      ]
    });
    alert.present();
  }

  delpost(){
    var query = {
      'post_id':  this.cmt_pst_id
    }
    this.studyProvider.getRemoveDiscuss(query).subscribe((data)=>{
      this.navCtrl.pop();
      console.log("getRemoveDiscuss"), data;
    },err =>{console.log("error"), err});
  }

  editpost(){
    this.postdata=this.postSubmit.value;
    this.postdata=this.postSubmit.value;
    var query = {
      'pst_title' : this.postdata.posttitle,
      'pst_content': this.postdata.postcontent,
      'post_id':  this.cmt_pst_id
    }
    this.studyProvider.getaddDiscuss(query).subscribe((data)=>{
      this.navCtrl.pop();
    },err =>{console.log("error"), err});
  
  }

  addcommentcontent(query:any){

  }

  addpost(){
    this.postdata=this.postSubmit.value;
    var query = {
      'pst_title' : this.postdata.posttitle,
      'pst_content': this.postdata.postcontent
    }
    this.studyProvider.getaddDiscuss(query).subscribe((data)=>{
      this.navCtrl.pop();
    },err =>{console.log("error"), err});
  }

}
