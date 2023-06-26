import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-lookup-events',
  templateUrl: './lookup-events.component.html',
  styleUrls: ['./lookup-events.component.css']
})
export class LookupEventsComponent implements OnInit {
  value = '';
  constructor(private api: HttpClientService,) { }
  AcademicSessionValue = '';
  courseList: any = [];
  currentPage = 1;
  total = 0;
  pageSize = 10;
  ngOnInit(): void {
    this.fetchCourseList();

  }

  onPageIndexChange(event: any) {
    this.currentPage = event;
    this.fetchCourseList();
  }

  async fetchCourseList() {
    try {
      (await this.api.fetchCourseList(this.AcademicSessionValue, this.value, this.currentPage)).subscribe((result: any) => {
        this.courseList = result.data.list;
        this.total = result.data.total;
      });
    } catch (e) {
      console.log(e)
    }
  }

  search() {
    this.currentPage = 1;
    this.fetchCourseList();
  }
}
