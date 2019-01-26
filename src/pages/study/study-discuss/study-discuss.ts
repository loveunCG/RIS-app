import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { StudyProvider } from '../../../providers/study/study';
import { concat } from 'rxjs/operators/concat';
import { StudyDiscussEditPage } from '../../../pages/study/study-discuss-edit/study-discuss-edit';
/**
 * Generated class for the StudyDiscussPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-study-discuss',
  templateUrl: 'study-discuss.html',
})
export class StudyDiscussPage {
  discuss:any;
  isauthor:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public studyProvider:StudyProvider, public alertController:AlertController) {
    this.studyProvider.getDiscussList(null).subscribe((data)=>{
      this.discuss = data;
      console.log("11111111",this.discuss)

    });
    console.log("??????????", this.isauthor)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyDiscussPage');

  }

  content(title, content, postid, autho){
    if( this.studyProvider.getSecretData().usr_name == autho){
      this.isauthor=true;
   }
    this.navCtrl.push(StudyDiscussEditPage,{psottitle:title,postcontent:content, isauthor:this.isauthor, post_id:postid})
  }

  addpost(){
    this.navCtrl.push(StudyDiscussEditPage)
  }

  commentList(index, post_id){
    let alert = this.alertController.create();
    alert.setTitle('注释');
    for(var i=0; i < this.discuss[index].comment.length ; i++){
      alert.addInput({type: 'radio', label: this.discuss[index].comment[i].content, value:i.toString()});
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: '确认',

      handler: data => {
       data=Number(data);
       console.log("aaa",data )
       if(!(data+1)){return}
       if(this.studyProvider.getSecretData().usr_name == this.discuss[index].comment[data].name){
        let alert = this.alertController.create({
          title: this.discuss[index].comment[data].name,
          subTitle: this.discuss[index].comment[data].content,
          inputs: [
            {
              name: 'change_comment',
              placeholder: '注释'
            },],
          buttons: [
            {
              text: '删除',
              handler: removedata => {
                let query = { 
                              'comment_id': this.discuss[index].comment[data].comment_id
                            };
                console.log("errorqqqqqqqqqq")
                this.studyProvider.getRemoveComment(query).subscribe((message)=>{
                  console.log("removedata", removedata);
                },err =>{console.log("error"), err});
              }
            },
            {

              text: '保存',
              handler: contentdata => {
                
                console.log("33333333", contentdata)
                let query = { 'cmt_content' : contentdata.change_comment,
                              'cmt_pst_id': post_id,
                              'comment_id': this.discuss[index].comment[data].comment_id
                            };
                console.log("errorqqqqqqqqqq")
                this.studyProvider.getaddComment(query).subscribe((message)=>{
                  this.studyProvider.getDiscussList(null).subscribe((data)=>{
                    this.discuss = data;
                    console.log("11111111",this.discuss)
                  });
                },err =>{console.log("error"), err});
              }
            }
          ]
        });
               
        alert.present();
       }
       else{
        let alert = this.alertController.create({
          title: this.discuss[index].comment[data].name,
          subTitle: this.discuss[index].comment[data].content,
          buttons: ['确认']
        });
        alert.present();
       }
      }
    });
    alert.present();
  }

  ionViewWillEnter(){
    this.studyProvider.getDiscussList(null).subscribe((data)=>{
      this.discuss = data;
      console.log("11111111",this.discuss)
    });
  }

}
