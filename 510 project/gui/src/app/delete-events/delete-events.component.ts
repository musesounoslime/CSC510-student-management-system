import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-delete-events',
  templateUrl: './delete-events.component.html',
  styleUrls: ['./delete-events.component.css']
})
//Course delete component
export class DeleteEventsComponent implements OnInit {

  constructor(private api: HttpClientService, private message: NzMessageService) { }
  value = '';
  items = [];
  currentPage = 1;
  total = 0;
  list: any = [];
  setOfCheckedId:any = new Set<number>();
  checked = false;
  indeterminate = false;
  pageSize = 10;
  ngOnInit(): void {
    this.fetchEvents();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  onAllChecked(value: boolean): void {
    this.list.forEach((item: any) => this.updateCheckedSet(item.id, value));
  }

  async deleteEvents() {
    if ([...this.setOfCheckedId].length === 0) return;
    try {
      const result: any = await this.api.deleteEvents({ ids: [...this.setOfCheckedId] });
      result.subscribe((res: any) => {
        this.message.success(res.message);
        this.fetchEvents();
      })
    } catch (e: any) {
      this.message.error(
        e.message
      );
    }
  }
  onPageIndexChange(event: any) {
    this.currentPage = event;
    this.fetchEvents();
  }
  search() {
    this.currentPage = 1;
    this.fetchEvents();
  }
  async fetchEvents() {
    try {
      const result = await this.api.fetchEvents(this.currentPage, this.value);
      result.subscribe((res: any) => {
        this.list = [];
        this.list = [...res.data.list];
        this.total = res.data.total;
      })
    } catch (e) {
      console.log(e);
    }
  }
}
