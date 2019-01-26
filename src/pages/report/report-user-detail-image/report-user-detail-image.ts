import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ReportProvider } from '../../../providers/report/report';
import { BasePage } from '../../base-page/base-page';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { concat } from 'rxjs/operators/concat';
import Hammer from 'hammerjs';
/**
 * Generated class for the ReportUserDetailImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var dialogPolyfill;
declare var cornerstoneTools;
declare var cornerstone;
declare var hammer;
declare var cornerstoneWADOImageLoader;
declare var $;

let config = {};
let triggle = 1;
let loaded = false;

@Component({
  selector: 'page-report-user-detail-image',
  templateUrl: 'report-user-detail-image.html',
})
export class ReportUserDetailImagePage extends BasePage {
  dicomelement:any;
  toolflag:boolean = false;
  url:string;
  viewport:any;
  hospital_name:string;
  index:number=0;
  objUID:any;
  selflag:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,  public reportService:ReportProvider, public toast:ToastController, 
    public alertCtrl: AlertController , ) {
    super(toast);  
    this.hospital_name = navParams.data.hospital_name;
    this.objUID=navParams.data.objectUID;
    this.url="wadouri:http://120.55.63.29:5006/getDicom?operation=wado&studyUID=" + navParams.data.studyUID + "&seriesUID=" + 
              navParams.data.studyUID + "&objectUID=" + navParams.data.objectUID[this.index].objectUID + "&contentType=application/dicom"
    }

  ionViewDidLoad() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.configure({
       beforeSend: function(xhr) {
       }
    });
    cornerstoneTools.external.Hammer = Hammer;
     var imageId = this.url;
     let zoomconfig = {
        minScale: 0.25,
        maxScale: 20.0,
        preventZoomOutsideImage: true,
        drawHandles: false,
        drawHandlesOnHover: true,
        arrowFirst: true
    }
     this.dicomelement = document.getElementById("dicomImage");
     var delement = this.dicomelement
     cornerstone.enable(delement);
     cornerstone.loadAndCacheImage(imageId).then(image => {
      this.viewport = cornerstone.getDefaultViewportForImage(delement, image);
      cornerstone.displayImage(delement, image, this.viewport);
      cornerstoneTools.touchInput.enable(delement);
      cornerstoneTools.wwwcTouchDrag.activate(delement);
      cornerstoneTools.mouseInput.enable(delement);
      cornerstoneTools.zoom.setConfiguration(zoomconfig);
      this.selflag=true;
      document.getElementById('mrbottomright').textContent = "Zoom: " + this.viewport.scale.toFixed(2);
      document.getElementById('mrbottomleft').textContent = "WW/WC:" + Math.round(this.viewport.voi.windowWidth) + "/" + Math.round(this.viewport.voi.windowCenter);
      document.getElementById('mrtopleft').textContent = "医院名称:" + this.hospital_name;
      document.getElementById('mrtopright').textContent = "图片:" + (this.index+1) 
      delement.addEventListener("cornerstoneimagerendered", (e:Event) => this.change(e));      
    },err=>{console.error(err); return});
    
  }


  change(e){
    var viewport = cornerstone.getViewport(e.target); 
    document.getElementById('mrbottomright').textContent = "Zoom: " + viewport.scale.toFixed(2);
    document.getElementById('mrbottomleft').textContent = "WW/WC:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter);
   }

  viewtool(){
    if(this.toolflag){
      this.toolflag = false;
    }
    else{
      this.toolflag = true;
    }
  }

  touchDisable(){
    var delement = this.dicomelement
    cornerstoneTools.panTouchDrag.deactivate(delement);
    cornerstoneTools.rotateTouchDrag.deactivate(delement);
    cornerstoneTools.rotateTouch.disable(delement);
    cornerstoneTools.ellipticalRoiTouch.deactivate(delement);
    cornerstoneTools.angleTouch.deactivate(delement);
    cornerstoneTools.rectangleRoiTouch.deactivate(delement);
    cornerstoneTools.lengthTouch.deactivate(delement);
    cornerstoneTools.probeTouch.deactivate(delement);
    cornerstoneTools.zoomTouchDrag.deactivate(delement);
    cornerstoneTools.wwwcTouchDrag.deactivate(delement);
    cornerstoneTools.stackScrollTouchDrag.deactivate(delement);

    
  }

  enableWindowLevelTool(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.wwwcTouchDrag.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  pan(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.panTouchDrag.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  rotate(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.rotateTouchDrag.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  zoomPinch(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.zoomTouchPinch.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  zoomDrag(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.zoomTouchDrag.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  stackScroll(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.stackScrollTouchDrag.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  length(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.lengthTouch.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  probe(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.probeTouch.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  circleroi(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.ellipticalRoiTouch.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  rectangleroi(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.rectangleRoiTouch.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }

  angle(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.angleTouch.activate(delement);
    //toolSelector.textContent = e.currentTarget.innerHTML
  }
 
  clearToolData(){
    var delement = this.dicomelement
    this.touchDisable();
    cornerstoneTools.wwwcTouchDrag.activate(delement);
    
    var toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;
    toolStateManager.clear(delement);
    cornerstone.updateImage(delement);
  }

  previous(){
    if(this.index>0){
      this.index = this.index - 1;
    }
    this.dicomimgloading(this.index );
    document.getElementById('mrtopright').textContent = "图片:" + (this.index+1) 
  }
  
  next(){
    if(this.index<this.objUID.length-1){
      this.index = this.index + 1;
    }
    this.dicomimgloading(this.index);
    document.getElementById('mrtopright').textContent = "图片:" + (this.index+1) 
  }

  select(){
    let alert = this.alertCtrl.create();
    alert.setTitle('选择图片');
    for(var i=0; i<this.navParams.data.objectUID.length; i++){
      alert.addInput({type: 'radio', label: '图片' + (i + 1) , value:i.toString()});
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
       data=Number(data);
        this.dicomimgloading(data);
      }
    });
    alert.present();
  }

  dicomimgloading(id:number){
    this.index=id;
    var imageId = "wadouri:http://120.55.63.29:5006/getDicom?operation=wado&studyUID=" + this.navParams.data.studyUID + "&seriesUID=" + 
    this.navParams.data.studyUID + "&objectUID=" + this.navParams.data.objectUID[this.index].objectUID + "&contentType=application/dicom";
    var delement = this.dicomelement
    cornerstone.loadAndCacheImage(imageId).then(image => {
     this.viewport = cornerstone.getDefaultViewportForImage(delement, image);
     cornerstone.displayImage(delement, image, this.viewport);
     cornerstoneTools.touchInput.enable(delement);
     cornerstoneTools.wwwcTouchDrag.activate(delement);
     document.getElementById('mrtopright').textContent = "图片:" + (this.index+1) 
    }).catch(err => console.error('Error', err));
  }
}

