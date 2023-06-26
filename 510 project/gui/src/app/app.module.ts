import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientService } from './http-client.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseSelectComponent } from './course-select/course-select.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { DeleteEventsComponent } from './delete-events/delete-events.component';
import { AcademicSessionComponent } from './academic-session/academic-session.component';
import { LookupEventsComponent } from './lookup-events/lookup-events.component';
import { PersonalScheduleComponent } from './personal-schedule/personal-schedule.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { HomeComponent } from './home/home.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { GradeChartComponent } from './grade-chart/grade-chart.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NzModalModule } from 'ng-zorro-antd/modal'
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CourseSelectComponent,
    AddEventsComponent,
    DeleteEventsComponent,
    AcademicSessionComponent,
    LookupEventsComponent,
    PersonalScheduleComponent,
    HomeComponent,
    GradeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzMenuModule,
    NzButtonModule,
    NzFormModule,
    NzDropDownModule,
    NzListModule,
    NzSelectModule,
    NzInputModule,
    NzGridModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzMessageModule,
    NzTableModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    NzModalModule,
  ],
  providers: [HttpClientService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
