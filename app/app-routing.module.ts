import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { CouresesComponent } from './coureses/coureses.component';
import { CoursesDetailesComponent } from './courses-detailes/courses-detailes.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VideosPageComponent } from './videos-page/videos-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'home',component:HomeComponent},
  {path:'courses',component:CouresesComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'password',component:ForgotPasswordComponent},
  {path:'coursedetailes/:id',component:CoursesDetailesComponent},
  {path:'coursedetailes/:id/:id',component: VideosPageComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
