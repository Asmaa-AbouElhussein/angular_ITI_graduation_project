import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/shared/role.guard';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowCategoryComponent } from './admin-dashboard/show-category/show-category.component';
import { ShowCoursesComponent } from './admin-dashboard/show-courses/show-courses.component';
import { TestComponent } from './admin-dashboard/test/test.component';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { CouresesComponent } from './coureses/coureses.component';
import { CoursesDetailesComponent } from './courses-detailes/courses-detailes.component';
import { CreatecodeComponent } from './createcode/createcode.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SettingComponent } from './setting/setting.component';
import { VideosPageComponent } from './videos-page/videos-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [RoleGuard],
    children: [
      { path: '', component: ShowCoursesComponent },
      { path: 'showcourses', component: ShowCoursesComponent },
      { path: 'showcategory', component: ShowCategoryComponent },
      { path: 'showvideos', component: TestComponent },
      { path: 'code', component: CreatecodeComponent },

    ]

  },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CouresesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'password', component: ForgotPasswordComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'coursedetailes/:id', component: CoursesDetailesComponent },
  { path: 'coursedetailes/:id/:id', component: VideosPageComponent },
  {path:'chat',component:ChatComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
