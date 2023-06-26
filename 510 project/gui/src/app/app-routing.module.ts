import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseSelectComponent } from './course-select/course-select.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { DeleteEventsComponent } from './delete-events/delete-events.component';
import { AcademicSessionComponent } from './academic-session/academic-session.component';
import { LookupEventsComponent } from './lookup-events/lookup-events.component';
import { PersonalScheduleComponent } from './personal-schedule/personal-schedule.component';
import { HomeComponent } from './home/home.component';
import { GradeChartComponent } from './grade-chart/grade-chart.component'
const routes: Routes = [
  {
    path: 'common', component: HomeComponent, children: [
      {
        path: 'course-select',
        component: CourseSelectComponent
      },
      {
        path: 'lookup-events',
        component: LookupEventsComponent
      },
      {
        path: 'personal-schedule',
        component: PersonalScheduleComponent
      },
      {
        path: 'delete-events',
        component: DeleteEventsComponent
      },
      {
        path: 'add-events',
        component: AddEventsComponent
      },
      {
        path: 'academic-session',
        component: AcademicSessionComponent
      },
      {
        path: 'grade-chart',
        component: GradeChartComponent
      }
    ]
  },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
