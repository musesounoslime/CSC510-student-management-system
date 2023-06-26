import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {
  AcademicSessionValue = '';
  AcademicSession = [{ academicSession: 'fall 2022' }, { academicSession: 'fall 2023' }];
  course = '';
  type = '';
  date = [];
  Weeks = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri'];
  week = '';
  startTime = null;
  endTime = null;
  location = '';
  description = '';
  instructor = '';
  section = '';
  constructor(private api: HttpClientService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.fetchAcademicSession();
  }
  dateFormat(fmt: string, date: any) {
    let ret;
    date = new Date(date)
    const opt: any = {
      'Y+': date.getFullYear().toString(),
      'm+': (date.getMonth() + 1).toString(),
      'd+': date.getDate().toString(),
      'H+': date.getHours().toString(),
      'M+': date.getMinutes().toString(),
      'S+': date.getSeconds().toString(),
      'W+': date.getDay()
    };
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
      }
    }
    return fmt;
  }
  formatAMPM(date: any) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    hours = hours < 10 ? `0${hours}` : hours;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
  }
  async addEvent() {
    try {
      const result: any = await this.api.addEvents({
        datas: [
          {
            academic_session: this.AcademicSessionValue,
            course: this.course,
            type: this.type,
            date: `${this.dateFormat('mm/dd', this.date[0])}-${this.dateFormat('mm/dd', this.date[1])}`,
            time: this.week + '_' + `${this.formatAMPM(this.startTime)}-${this.formatAMPM(this.endTime)}`,
            location: this.location,
            description: this.description,
            instructor: this.instructor,
            section : this.section
          }
        ]
      });
      result.subscribe((res: any) => {
        this.message.success(
          res.message
        );
      })

      this.course = '';
      this.type = '';
      this.date = [];
      this.startTime = null;
      this.endTime = null;
      this.location = '';
      this.week = '';
    } catch (e: any) {
      this.message.error(
        e.message
      );
    }
  }

  async fetchAcademicSession() {
    try {
      const result: any = await this.api.fetchAcademicSession();
      result.subscribe((res: any) => {
        this.AcademicSession = res.data;
      })
    } catch (e) {
      console.log(e);
    }
  }
  onChange(event: any) {
    console.log();

  }
}
