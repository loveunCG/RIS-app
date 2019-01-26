import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';
import { StudyProvider } from '../../../providers/study/study';
import { ToastController } from 'ionic-angular';
import * as io from 'socket.io-client';
/**
 * Generated class for the StudyOnlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var RTCMultiConnection;
  let videoflag;
  var roomid;
@Component({
  selector: 'page-study-online-room',
  templateUrl: 'study-online-room.html',
})
export class StudyOnlinePageRoom {
  connection:any ;  
  usr_id:string;
  chatval:any;
  txtval:string = "";
  session_id:string;
  title:string;
  no:any;
  socket:any;
  roomData:any;
  lession_id:any;
  private studySubmit:FormGroup;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, public studyService:StudyProvider, public platform:Platform) {
    this.usr_id = navParams.data.room_id;
    this.studySubmit = this.formBuilder.group({
      chat: ["", Validators.required],
    });
    this.session_id = this.studyService.getSecretData().id;
    this.title = navParams.data.classtitle;
    this.lession_id = navParams.data.classlession_id;
    this.roomData = {
      usr_id:this.usr_id,
      lession_id:this.lession_id
    }
  }

  ionViewDidLoad() {
    //this.connection.socketURL="https://rtcmulticonnection.herokuapp.com:443/";
    this.connection = new RTCMultiConnection(this.usr_id);
    this.connection.socketMessageEvent = 'video-broadcast';

    this.connection.socketURL="https://120.55.63.29:5003/";
    this.socket = io('https://120.55.63.29:5004');
    this.connection.session = { audio:true, video:true , data:true, oneway : true};
    var vwidth = this.platform.width() * 0.9;
    var vheight = this.platform.height() * 0.4;

    this.connection.mediaConstraints = {
      audio: true,
      video: {
          width: vwidth,
          height: vheight,
          frameRate: 30,
          aspectRatio: 1.77,
          facingMode: "application"
      }
  };

  
  if(this.usr_id == this.session_id){
    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false
    };
    this.onOpen();
    this.socket.emit('openLessionRoom', this.roomData);
  }
  else{
    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };
    this.join();
   }



    setInterval(data=>{
      var numberOfUsersInTheRoom = this.connection.getAllParticipants().length;
      this.no = numberOfUsersInTheRoom;      
      this.connection.checkPresence(this.usr_id, function (isRoomExist) {
      });
      }, 5000);
      
    this.connection.onstream = function(event) {  
      console.log(JSON.stringify(event));
      console.log("111111111", (event));
      console.log("wwwwww")
      document.getElementById('video').appendChild(event.mediaElement);
         setTimeout(function() {
             event.mediaElement.play();
         }, 5000);
    };



    this.connection.onmessage = this.appendDIV
  }


  onOpen(){
    this.connection.open(this.usr_id)
    this.join();
    this.connection.socket.on('video-broadcast', function(message) {
      console.log(message);
    });
    this.connection.socket.emit('video-broadcast', 'My userid is: ' + this.connection.userid);
  }
 
  join(){
    this.connection.join(this.usr_id);
  }

  appendDIV(event:any){
    console.log(event)
    var date = new Date();
    var displayDate = date.getHours().toLocaleString() + ":" + date.getMinutes().toLocaleString() + ":" + date.getSeconds().toLocaleString(); 
    if(typeof(event) == "object"){
      this.txtval = event.data.username + "  :  " + event.data.msg + "  " + displayDate;
    }else{
      this.txtval =  event + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0" + displayDate;
    }

    var para = document.createElement("p");
    var node = document.createTextNode(this.txtval);
    para.appendChild(node);
    
    var element = document.getElementById("content");
    element.appendChild(para);
    para.scrollIntoView();
  }

  send(){
    if(this.studySubmit.value.chat == ""){return;}
    var sendData = {
      username : this.studyService.getSecretData().usr_name,
      msg : this.studySubmit.value.chat
    }
    this.connection.send(sendData);
    this.appendDIV(sendData.username + "  :  " + sendData.msg)
    this.studySubmit = this.formBuilder.group({
      chat: ["", Validators.required],
    });
  }

  ionViewDidLeave(){
    
  }

  ionViewWillLeave(){
    this.socket.disconnect ();
    this.connection.disconnectWith(this.usr_id);
   }
}
