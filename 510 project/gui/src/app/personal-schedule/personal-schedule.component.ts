import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-personal-schedule',
  templateUrl: './personal-schedule.component.html',
  styleUrls: ['./personal-schedule.component.css']
})
export class PersonalScheduleComponent implements OnInit {

  constructor(private api: HttpClientService, private message: NzMessageService,private elRef : ElementRef) { }
  value = '';
  items = [];
  datas: any = [];
  currentPage = 1;
  total = 0;
  list: any = [];
  setOfCheckedId: any = new Set<number>();
  checked = false;
  indeterminate = false;
  pageSize = 10;
  courseList:any = [];
  conflictItem: any = {};
  isOpen = false;
  row = {};
  months: any = [];
  arr = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  days = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  mon: any = [];
  tues: any = [];
  wed: any = [];
  thur: any = [];
  fri: any = [];
  currentMonth = '';
  AcademicSession = [];
  academicSessionValue = '';
  currentItem:any = {};
  async ngOnInit() {
    this.fetchEvents();
    await this.fetchAcademicSession();
    await this.fetchAllCourseList();
  }

  onMonthChange() {
    console.log(this.currentMonth)
    let arr = this.currentMonth.split('-');
    // console.log(Number(arr[0]), Number(arr[1]));
    this.getDays(Number(arr[0]), Number(arr[1]));
    this.days.forEach((item:any, index:any) => {
      if (index < 5) {
        this.days[index] = this.mon[index] || '';
      } else if (index >= 5 && index < 10) {
        this.days[index] = this.tues[index - 5] || '';
      } else if (index >= 10 && index < 15) {
        this.days[index] = this.wed[index - 10] || '';
      } else if (index >= 15 && index < 20) {
        this.days[index] = this.thur[index - 15] || '';
      } else if (index >= 20) {
        this.days[index] = this.fri[index - 20] || '';
      }
    });
    this.months.forEach((item: any) => {
      if (item.month === this.currentMonth) {
        this.academicSessionValue = item.academicSession;
      }
    })
    const courseList = this.datas.filter((item: any) => {
      let _dateArr = item.date.split('-');
      let startDate = _dateArr[0].slice(0, 2);
      let endDate = _dateArr[1].slice(0, 2);
      console.log(startDate, endDate)
      return item.academic_session === this.academicSessionValue && Number(startDate) <= Number(arr[1]) && Number(endDate) >= Number(arr[1])
    }
    );
    console.log(this.datas);
    console.log(courseList)
    let timeItem:any = document.getElementsByClassName('time-item');
    if (arr.length > 0) {
      for (let i = timeItem.length - 1; i >= 0; i--) {
        timeItem[i].remove();
      }
    }
    if (courseList.length > 0) {
      courseList.forEach((item: any) => {
        let _dateArr = item.date.split('-');
        let startDate = _dateArr[0].slice(0, 2) + _dateArr[0].slice(-2);
        let endDate = _dateArr[1].slice(0, 2) + _dateArr[1].slice(-2);
        // console.log(startDate, endDate)
        let timeArr = item.time.split('_');
        let week = timeArr[0];
        let left = 0;
        let width = 0;
        if (week === 'Mon') {
          left = 0;
          let status = false;
          this.mon.forEach((ref: any, i: any) => {
            let day = ref < 10 ? `0${ref}` : ref;
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && !status) {
              left = i * 4;
              status = true;
            }
            console.log(endDate, `${arr[1]}${day}`)
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && Number(endDate) >= Number(`${arr[1]}${day}`)) {
              width += 4;
            }
          })
        } else if (week === 'Tues') {
          left = 20;
          let status = false;
          this.tues.forEach((ref: any, i: any) => {
            let day = ref < 10 ? `0${ref}` : ref;
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && !status) {
              left += i * 4;
              status = true;
            }
            console.log(endDate, `${arr[1]}${day}`)
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && Number(endDate) >= Number(`${arr[1]}${day}`)) {
              width += 4;
            }
          })
        } else if (week === 'Wed') {
          left = 40;
          let status = false;
          this.wed.forEach((ref: any, i: any) => {
            let day = ref < 10 ? `0${ref}` : ref;
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && !status) {
              left += i * 4;
              status = true;
            }
            console.log(endDate, `${arr[1]}${day}`)
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && Number(endDate) >= Number(`${arr[1]}${day}`)) {
              width += 4;
            }
          })
        } else if (week === 'Thur') {
          left = 60;
          let status = false;
          this.thur.forEach((ref: any, i: any) => {
            let day = ref < 10 ? `0${ref}` : ref;
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && !status) {
              left += i * 4;
              status = true;
            }
            console.log(endDate, `${arr[1]}${day}`)
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && Number(endDate) >= Number(`${arr[1]}${day}`)) {
              width += 4;
            }
          })
        } else if (week === 'Fri') {
          left = 80;
          let status = false;
          this.fri.forEach((ref: any, i: any) => {
            let day = ref < 10 ? `0${ref}` : ref;
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && !status) {
              left += i * 4;
              status = true;
            }
            console.log(endDate, `${arr[1]}${day}`)
            if (Number(startDate) <= Number(`${arr[1]}${day}`) && Number(endDate) >= Number(`${arr[1]}${day}`)) {
              width += 4;
            }
          })
        }
        let time = timeArr[1].split('-');
        let startTime = time[0];
        let endTime = time[1];
        let startMoment = `${startTime.slice(0, 2)}${time[0].slice(-2)}`;
        let endMoment = `${endTime.slice(0, 2)}${time[1].slice(-2)}`;
        let el1:any = document.getElementById(startMoment);
        let top = el1.offsetTop;
        let el2:any = document.getElementById(endMoment);
        let botttom = el2.offsetTop;
        let top2 = (Number(startTime.slice(3, 5)) / 60 * 37).toFixed(2);
        let botttom2 = (Number(endTime.slice(3, 5)) / 60 * 37).toFixed(2);
        let height = botttom + Number(botttom2) - Number(top + Number(top2));
        console.log('top', top, top2);
        let element:any = document.createElement('a');
        element.style.position = 'absolute';
        element.className = 'time-item';
        // element.style.border = 'solid #409EFF 1px';
        element.style.width = `calc(${width}% - 4px)`;
        element.style.maxWidth = `${width}%`;
        element.style.height = height + 'px';
        element.style.left = `${left}%`;
        element.style.top = `${top + Number(top2)}px`;
        element.style.marginLeft = '1px';
        element.style.marginRight = '1px';
        element.style.overflowY = 'hidden';
        element.style.textAlign = 'center';
        element.style.background = '#409EFF';
        element.style.color = '#ffffff';
        element.innerHTML = `<p style="transform: scale(0.8);line-height:14px;">${item.course}</p>
            `;
        element.onmouseenter = () => {
          element.style.cursor = 'pointer';
        }
        // element.onclick = () => {
        //   this.currentItem = item;
        //   this.isOpen = true;
        // }
        element.onmouseleave = () => {
          element.style.cursor = 'none';
        }
        let timeLine:any = document.getElementById('time-line');
        timeLine.appendChild(element);
      })
    }
    // this.onChange();
    // console.log(courseList, this.academicSessionValue);
  }

  async fetchAllCourseList() {
    try {
        (await this.api.fetchAllCourseList()).subscribe((result:any )=>{
          this.datas = [...result.data.list];
          this.onChange();
        });
    } catch (e) {
        console.log(e);
    }
  }
  print(){
    window.print()
  }
  onChange() {
    const courseList = this.datas.filter((item:any) => {
        return item.academic_session === this.academicSessionValue && item.date === this.value
    }
    );
    let arr = document.getElementsByClassName('time-item');
    if (arr.length > 0) {
        for (let i = arr.length - 1; i >= 0; i--) {
            arr[i].remove();
        }
    }
    if (courseList.length > 0) {
        courseList.forEach((item:any) => {
            let arr = item.time.split('_');
            let week = arr[0];
            let left:any = '';
            switch (week) {
                case 'Mon': left = 0;
                    break;
                case 'Tues': left = '20%';
                    break;
                case 'Wed': left = '40%';
                    break;
                case 'Thur': left = '60%';
                    break;
                case 'Fri': left = '80%';
                    break;
            }
            let time = arr[1].split('-');
            let startTime = time[0];
            let endTime = time[1];
            let startMoment = `${startTime.slice(0, 2)}${time[0].slice(-2)}`;
            let endMoment = `${endTime.slice(0, 2)}${time[1].slice(-2)}`;
            console.log(startMoment, endMoment);
            let el1:any = document.getElementById(startMoment);
            let top = el1.offsetTop;
            let el2:any = document.getElementById(endMoment);
            let botttom = el2.offsetTop;
            let top2 = (Number(startTime.slice(3, 5)) / 60 * 37).toFixed(2);
            let botttom2 = (Number(endTime.slice(3, 5)) / 60 * 37).toFixed(2);
            let height = botttom + Number(botttom2) - Number(top + Number(top2));
            console.log(startMoment, top, top2, startTime.slice(3, 5), botttom, botttom2, endMoment)
            let element = document.createElement('a');
            element.style.position = 'absolute';
            element.className = 'time-item';
            element.style.border = 'solid #409EFF 1px';
            element.style.width = '19%';
            element.style.height = height + 'px';
            element.style.left = left;
            element.style.top = `${top + Number(top2)}px`;
            element.style.marginLeft = '4px';
            element.style.marginRight = '4px';
            element.style.overflowY = 'hidden';
            element.style.textAlign = 'center';
            element.style.background = '#409EFF';
            element.style.color = '#ffffff';
            element.innerHTML = `<p style="transform: scale(0.8);line-height:14px;">${item.course} </p>
            `;
            element.onmouseenter = () => {
                element.style.cursor = 'pointer';
            }
            // element.onclick = () => {
            //     this.currentItem = item;
            //     this.isOpen = true;
            // }
            element.onmouseleave = () => {
                element.style.cursor = 'none';
            }
            let timeLine:any = document.getElementById('time-line');
            timeLine.appendChild(element);
        })
    }
}
  async fetchAcademicSession() {
    try {
      (await this.api.fetchAcademicSession()).subscribe((result: any) => {
        this.AcademicSession = result.data;
        console.log(result.data)
        this.AcademicSession.forEach((item: any) => {
          if (item.academicSession.indexOf('Fall') >= 0) {
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-07` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-08` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-09` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-10` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-11` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-12` })
          } else if (item.academicSession.indexOf('Spring') >= 0) {
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-01` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-02` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-03` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-04` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-05` })
            this.months.push({ academicSession: item.academicSession, month: `${item.academicSession.slice(-4)}-06` })
          }
        });
        this.currentMonth = this.months[0].month;
        this.onMonthChange();
        console.log(this.months)
      });
    } catch (e) {
      console.log(e);
    }
  }
  getWeek(year: any, month: any, date: any) {
    var dt = new Date(year, month, date);
    return dt.getDay();
  }

  getDays(year: any, month: any) {
    this.mon = [];
    this.tues = [];
    this.wed = [];
    this.thur = [];
    this.fri = [];
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      for (let i = 1; i < 32; i++) {
        let week = this.getWeek(year, month - 1, i);
        if (week == 1) {
          this.mon.push(i);
        } else if (week == 2) {
          this.tues.push(i);
        } else if (week == 3) {
          this.wed.push(i);
        } else if (week == 4) {
          this.thur.push(i);
        } else if (week == 5) {
          this.fri.push(i);
        }
      }
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      for (let i = 1; i < 31; i++) {
        let week = this.getWeek(year, month - 1, i);
        if (week == 1) {
          this.mon.push(i);
        } else if (week == 2) {
          this.tues.push(i);
        } else if (week == 3) {
          this.wed.push(i);
        } else if (week == 4) {
          this.thur.push(i);
        } else if (week == 5) {
          this.fri.push(i);
        }
      }
    }
    if (month == 2) {
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        for (let i = 1; i < 30; i++) {
          let week = this.getWeek(year, month - 1, i);
          if (week == 1) {
            this.mon.push(i);
          } else if (week == 2) {
            this.tues.push(i);
          } else if (week == 3) {
            this.wed.push(i);
          } else if (week == 4) {
            this.thur.push(i);
          } else if (week == 5) {
            this.fri.push(i);
          }
        }
      } else {
        for (let i = 1; i < 29; i++) {
          let week = this.getWeek(year, month - 1, i);
          if (week == 1) {
            this.mon.push(i);
          } else if (week == 2) {
            this.tues.push(i);
          } else if (week == 3) {
            this.wed.push(i);
          } else if (week == 4) {
            this.thur.push(i);
          } else if (week == 5) {
            this.fri.push(i);
          }
        }
      }
    }
    console.log(this.mon);
    console.log(this.tues);
    console.log(this.wed);
    console.log(this.thur);
    console.log(this.fri)

  }

  onPageIndexChange(event: any) {
    this.currentPage = event;
    this.fetchEvents();
  }

  onOk() {
    this.addCourse(this.row);
  }
  search() {
    this.currentPage = 1;
    this.fetchEvents();
  }

  async deleteCourse(id: any) {
    try {
      (await this.api.deleteCourse({ courseId: id })).subscribe(async (result: any) => {
        this.message.success(result.message);
        await this.fetchEvents();
        setTimeout(()=>{
          this.onChange();
        }, 3000)
      });
    } catch (e: any) {
      this.message.error(e.message);
    }
  }

  async addCourse(row: any) {
    try {
      (await this.api.addCourse({ courseId: row.id, coverId: this.conflictItem.id || 0 })).subscribe(async (result: any) => {
        this.message.success(result.message);
        await this.fetchEvents();
        setTimeout( ()=>{
          this.onMonthChange();
        }, 3000)
        this.isOpen = false;
      });
    } catch (e: any) {
      this.message.error(e.message);
    }
  }

  tryAddCourse(row: any) {
    if (this.courseList.length > 0) {
      this.courseList.forEach((item: any) => {
        if (this.isOpen) return;
        let itemDate = item.date.replace(/\//g, '').split('-');
        let rowDate = row.date.replace(/\//g, '').split('-');
        // let itemStartDate = itemDate[0];
        let diff = false;
        if (Number(itemDate[0]) >= Number(rowDate[0]) && Number(itemDate[0]) <= Number(rowDate[1]) ||
          Number(itemDate[1]) >= Number(rowDate[0]) && Number(itemDate[1]) <= Number(rowDate[1]) ||
          Number(rowDate[0]) >= Number(itemDate[0]) && Number(rowDate[0]) <= Number(itemDate[1]) ||
          Number(rowDate[1]) >= Number(itemDate[0]) && Number(rowDate[1]) <= Number(itemDate[1])) {
          diff = true;
        }
        console.log(itemDate[0], itemDate[1], rowDate[0], rowDate[1])
        if (item.academic_session == row.academic_session && diff) {
          let arr = row.time.split('_');
          let week = arr[0];
          let time = arr[1].split('-');
          let startTime = time[0];
          let endTime = time[1];
          let startMoment = time[0].slice(-2);
          let endMoment = time[1].slice(-2);

          if (startMoment == 'pm' && Number(startTime.slice(0, 2)) != 12) {
            startTime = (Number(startTime.slice(0, 2)) + 12) + startTime.slice(2, 5);
          } else {
            startTime = startTime.slice(0, 2) + startTime.slice(2, 5);
          }
          if (endMoment == 'pm' && Number(endTime.slice(0, 2)) != 12) {
            endTime = (Number(endTime.slice(0, 2)) + 12) + endTime.slice(2, 5);
          } else {
            endTime = endTime.slice(0, 2) + endTime.slice(2, 5);
          }
          let startHour = startTime.split(':')[0];
          let startMinute = startTime.split(':')[1];
          let endHour = endTime.split(':')[0];
          let endMinute = endTime.split(':')[1];
          // console.log(startHour, startMinute, endHour, endMinute);

          let arr2 = item.time.split('_');
          let week2 = arr2[0];
          let time2 = arr2[1].split('-');
          let startTime2 = time2[0];
          let endTime2 = time2[1];
          let startMoment2 = time2[0].slice(-2);
          let endMoment2 = time2[1].slice(-2);
          if (startMoment2 == 'pm' && Number(startTime2.slice(0, 2)) != 12) {
            startTime2 = (Number(startTime2.slice(0, 2)) + 12) + startTime2.slice(2, 5);
          } else {
            startTime2 = startTime2.slice(0, 2) + startTime2.slice(2, 5);
          }
          if (endMoment2 == 'pm' && Number(endTime2.slice(0, 2)) != 12) {
            endTime2 = (Number(endTime2.slice(0, 2)) + 12) + endTime2.slice(2, 5);
          } else {
            endTime2 = endTime2.slice(0, 2) + endTime2.slice(2, 5);
          }
          let startHour2 = startTime2.split(':')[0];
          let startMinute2 = startTime2.split(':')[1];
          let endHour2 = endTime2.split(':')[0];
          let endMinute2 = endTime2.split(':')[1];
          // console.log(week, week2);
          if (Number(`${endHour}${endMinute}`) > Number(`${startHour2}${startMinute2}`) && week == week2 &&
            Number(`${startHour}${startMinute}`) < Number(`${endHour2}${endMinute2}`)) {
            this.conflictItem = item;
            this.isOpen = true;
            this.row = row;
            console.log(this.conflictItem, item)
            console.log(startHour2, startMinute2, endHour2, endMinute2, this.isOpen);
          }
        }
      })
      if (!this.isOpen) this.addCourse(row);
    } else {
      this.addCourse(row);
    }
  }
  async fetchEvents() {
    try {
      (await this.api.fetchAllCourseList()).subscribe(async (list: any) => {
        this.courseList = list.data.list || [];
        (await this.api.fetchCourseIds()).subscribe(async (ids: any) => {
          (await this.api.fetchEvents(this.currentPage, this.value)).subscribe((result: any) => {
            this.list = result.data.list.map((item: any) => {
              return ids.data.filter((ref: any) => (ref === item.id)).length > 0 ? { ...item, isAdd: false } : { ...item, isAdd: true }
            });
            this.total = result.data.total;
          }
          )
        })
      })
    } catch (e) {
      console.log(e);
    }
  }

}
