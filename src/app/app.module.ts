import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer,  FileTransferObject,FileUploadOptions  } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FindpasswordPage } from '../pages/findpassword/findpassword';

import { HomePage } from '../pages/home/home';

import { TabHomePage } from '../pages/home/tab-home/tab-home';
import { TabMessagePage } from '../pages/home/tab-message/tab-message';
import { TabMyInfoPage } from '../pages/home/tab-my-info/tab-my-info';

import { ReportPage } from '../pages/report/report';
import { RemotePage } from '../pages/remote/remote';
import { StudyPage } from '../pages/study/study';
import { StatisticsPage } from '../pages/statistics/statistics';

import { ReportListPage } from '../pages/report/report-list/report-list';
import { ReportMinePage } from '../pages/report/report-mine/report-mine';
import { ReportMineDetailPage } from '../pages/report/report-mine-detail/report-mine-detail';
import { ReportReviewPage } from '../pages/report/report-review/report-review';
import { ReportUserReviewDetailPage } from '../pages/report/report-user-review-detail/report-user-review-detail';
import { ReportUserDetailPage } from '../pages/report/report-user-detail/report-user-detail';
import { ReportUserDetailImagePage } from '../pages/report/report-user-detail-image/report-user-detail-image';
import { ReportUserDetailImageListPage } from '../pages/report/report-user-detail-image-list/report-user-detail-image-list';
import { ReporTemplatePage } from '../pages/report/report-templet/report-templet';
import { ReporTemplateMakePage } from '../pages/report/report-templet-make/report-templet-make'

import { ReportUserDetailIntelliPage } from '../pages/report/report-user-detail-intelli/report-user-detail-intelli';
import { ReportUserDetailRemotePage } from '../pages/report/report-user-detail-remote/report-user-detail-remote';
import { ReportUserDetailReportPage } from '../pages/report/report-user-detail-report/report-user-detail-report';

import { RemoteMeetingPage } from '../pages/remote/remote-meeting/remote-meeting';
import { RemoteQuestionPage } from '../pages/remote/remote-question/remote-question';
import { RemoteMinePage } from '../pages/remote/remote-mine/remote-mine';
import { RemoteReviewPage } from '../pages/remote/remote-review/remote-review';
import { RemotMakeReviewPage } from '../pages/remote/remot-make-review/remot-make-review';
import { RemoteDetailPage } from '../pages/remote/remote-detail/remote-detail';

import { RemoteMeetingNew1Page } from '../pages/remote-meeting-new1/remote-meeting-new1';
import { RemoteMeetingNew2Page } from '../pages/remote-meeting-new2/remote-meeting-new2';

import { StudyOnlinePage } from '../pages/study/study-online/study-online';
import { StudyOnlinePageRoom } from '../pages/study/study-online-room/study-online-room';
import { StudyDiscussPage } from '../pages/study/study-discuss/study-discuss';
import { StudyDiscussEditPage } from '../pages/study/study-discuss-edit/study-discuss-edit';
import { StudyDataSharePage } from '../pages/study/study-data-share/study-data-share';
import { StudyDataShareContentPage } from '../pages/study/study-data-share-content/study-data-share-content';

import { StatisticsPatientPage } from '../pages/statistics/statistics-patient/statistics-patient';
import { StatisticsRemotePage } from '../pages/statistics/statistics-remote/statistics-remote';
import { StatisticsReportPage } from '../pages/statistics/statistics-report/statistics-report';
import { StatisticsMinePage } from '../pages/statistics/statistics-mine/statistics-mine';

import { PatientList } from '../pages/patient-list/patient-list';

import { OnlineVideoComponent } from '../components/online-video/online-video';
import { DiscussUserComponent } from '../components/discuss-user/discuss-user';
import { UserItemComponent } from '../components/user-item/user-item';
import { FromToDateComponent } from '../components/from-to-date/from-to-date';

import { BaseProvider } from '../providers/base/base';
import { AuthProvider } from '../providers/auth/auth';
import { ReportProvider } from '../providers/report/report';
import { MessageProvider } from '../providers/message/message';
import { StatisticsProvider } from '../providers/statistics/statistics';
import { RemoteProvider } from '../providers/remote/remote';
import { StudyProvider } from '../providers/study/study';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    FindpasswordPage,
    TabHomePage,
    TabMessagePage,
    TabMyInfoPage,
    ReportPage,
    RemotePage,
    StudyPage,
    StatisticsPage,

    ReportListPage,
    ReportMinePage,
    ReportMineDetailPage,
    ReportReviewPage,
    ReportUserDetailPage,
    ReportUserDetailImagePage,
    ReportUserDetailImageListPage,
    ReportUserDetailIntelliPage,
    ReportUserDetailRemotePage,
    ReportUserDetailReportPage,
    ReportUserReviewDetailPage,
    ReporTemplatePage,
    ReporTemplateMakePage,

    RemoteMeetingPage,
    RemoteQuestionPage,
    RemoteMinePage,
    RemoteReviewPage,
    RemotMakeReviewPage,
    RemoteMeetingNew1Page,
    RemoteMeetingNew2Page,
    RemoteDetailPage,

    StudyOnlinePage,
    StudyOnlinePageRoom,
    StudyDiscussPage,
    StudyDiscussEditPage,
    StudyDataSharePage,
    StudyDataShareContentPage,

    StatisticsPatientPage,
    StatisticsRemotePage,
    StatisticsReportPage,
    StatisticsMinePage,
    PatientList,

    OnlineVideoComponent,
    DiscussUserComponent,
    UserItemComponent,
    FromToDateComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {backButtonText:'',backButtonIcon:'undo',pageTransition: 'ios-transition'}),
    HttpClientModule,
    ChartsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    FindpasswordPage,
    TabHomePage,
    TabMessagePage,
    TabMyInfoPage,
    ReportPage,
    RemotePage,
    StudyPage,
    StatisticsPage,

    ReportListPage,
    ReportMinePage,
    ReportMineDetailPage,
    ReportReviewPage,
    ReportUserDetailPage,
    ReportUserDetailImagePage,
    ReportUserDetailImageListPage,
    ReportUserDetailIntelliPage,
    ReportUserDetailRemotePage,
    ReportUserDetailReportPage,
    ReportUserReviewDetailPage,
    ReporTemplatePage,
    ReporTemplateMakePage,

    RemoteMeetingPage,
    RemoteQuestionPage,
    RemoteMinePage,
    RemoteReviewPage,
    RemotMakeReviewPage,
    RemoteMeetingNew1Page,
    RemoteMeetingNew2Page,
    RemoteDetailPage,

    StudyOnlinePage,
    StudyOnlinePageRoom,
    StudyDiscussPage,
    StudyDiscussEditPage,
    StudyDataSharePage,
    StudyDataShareContentPage,

    StatisticsPatientPage,
    StatisticsReportPage,
    StatisticsRemotePage,
    StatisticsMinePage,
    PatientList,

    OnlineVideoComponent,
    DiscussUserComponent,
    UserItemComponent,
    FromToDateComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseProvider,
    AuthProvider,
    ReportProvider,
    MessageProvider,
    StatisticsProvider,
    RemoteProvider,
    StudyProvider,

    File,
    Transfer,
    Camera,
    FilePath,
    FileChooser,
    FileTransfer,
    FileTransferObject,
    AndroidPermissions,
    Diagnostic, 

  ]
})

@Injectable()
export class AppModule {}
