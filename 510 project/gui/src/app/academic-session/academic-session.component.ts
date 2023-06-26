import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-academic-session',
  templateUrl: './academic-session.component.html',
  styleUrls: ['./academic-session.component.css']
})
export class AcademicSessionComponent implements OnInit {

  constructor(private api: HttpClientService, private message: NzMessageService) { }
  value = '';
  items = [];
  currentPage = 1;
  total = 0;
  AcademicSession: any = [];
  setOfCheckedId: any = new Set<number>();
  checked = false;
  indeterminate = false;
  pageSize = 10;
  ngOnInit(): void {
    this.fetchAcademicSession();
  }
  async add() {
    try {
      const result = await this.api.addAcademicSession({ academicSession: this.value });
      result.subscribe((res: any) => {
        this.message.success(res.message);
        this.fetchAcademicSession();
      })
    } catch (e: any) {
      this.message.error(
        e.message
      );
      console.log(e);
    }
  }
  async deleteAcademicSession(id: any) {
    console.log(id);
    try {
      const result = await this.api.deleteAcademicSession({ id: id });
      result.subscribe((res: any) => {
        this.message.success(res.message);
        this.fetchAcademicSession();
      })
    } catch (e: any) {
      this.message.error(
        e.message
      );
    }
  }

  async fetchAcademicSession() {
    try {
      const result = await this.api.fetchAcademicSessionList(this.currentPage);
      result.subscribe((res: any) => {
        this.AcademicSession = res.data.list;
        this.total = res.data.total;
      })
    } catch (e) {
      console.log(e);
    }
  }

  onPageIndexChange(event: any) {
    this.currentPage = event;
    this.fetchAcademicSession();
  }


}
