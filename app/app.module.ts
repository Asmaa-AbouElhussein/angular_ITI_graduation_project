import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowCategoryComponent } from './admin-dashboard/show-category/show-category.component';
import { AddEditCategoryComponent } from './admin-dashboard/add-edit-category/add-edit-category.component';
import { ApiService } from './services/api.service';
import { CouresesComponent } from './coureses/coureses.component';
import { ContactComponent } from './contact/contact.component';
import { CommentComponent } from './comment/comment.component';
import { SwiperModule } from 'swiper/angular';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VideoFormComponent } from './admin-dashboard/video-form/video-form.component';
import { TestComponent } from './admin-dashboard/test/test.component';
import { AddEditCoursesComponent } from './admin-dashboard/add-edit-courses/add-edit-courses.component';
import { ShowCoursesComponent } from './admin-dashboard/show-courses/show-courses.component';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { CoursesDetailesComponent } from './courses-detailes/courses-detailes.component';
import { VideosPageComponent } from './videos-page/videos-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreatecodeComponent } from './createcode/createcode.component';
import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SettingComponent } from './setting/setting.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ChatComponent } from './chat/chat.component';
SwiperCore.use([Pagination])
SwiperCore.use([Navigation])

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ScrollToTopComponent,
    FooterComponent,
    AdminDashboardComponent,
    ShowCategoryComponent,
    AddEditCategoryComponent,
    CouresesComponent,
    ContactComponent,
    AboutComponent,
    NotfoundComponent,
    ChatComponent,
    RegisterComponent,
    LoginComponent, TestComponent, VideoFormComponent,
    AddEditCoursesComponent, ShowCoursesComponent, CommentComponent, CoursesDetailesComponent, VideosPageComponent, ForgotPasswordComponent, CreatecodeComponent, SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    BsDropdownModule,
    CommonModule,
    CollapseModule,
    SwiperModule, BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
