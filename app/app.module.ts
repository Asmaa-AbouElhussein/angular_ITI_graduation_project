import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowCategoryComponent } from './admin-dashboard/show-category/show-category.component';
import { AddEditCategoryComponent } from './admin-dashboard/add-edit-category/add-edit-category.component';
import { ApiService } from './services/api.service';
import { CouresesComponent } from './coureses/coureses.component';
import { ContactComponent } from './contact/contact.component';
import { CommentComponent } from './comment/comment.component';
import { SwiperModule } from 'swiper/angular';

import { AboutComponent } from './about/about.component';
import { ForumComponent } from './forum/forum.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VideoFormComponent } from './admin-dashboard/video-form/video-form.component';
import { TestComponent } from './admin-dashboard/test/test.component';
import { AddEditCoursesComponent } from './admin-dashboard/add-edit-courses/add-edit-courses.component';
import { ShowCoursesComponent } from './admin-dashboard/show-courses/show-courses.component';

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
    ForumComponent,
    NotfoundComponent,
    RegisterComponent,
    LoginComponent,TestComponent,VideoFormComponent, 
    AddEditCoursesComponent, ShowCoursesComponent,CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
