import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'app-grade-chart',
  templateUrl: './grade-chart.component.html',
  styleUrls: ['./grade-chart.component.css']
})
export class GradeChartComponent implements OnInit {
  options: EChartsOption =  {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 224, name: 'A   224' },
          { value: 6, name: 'B   6' },
          { value: 3, name: 'C   3' },
          { value: 2, name: 'W   2' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  options1: EChartsOption =  {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 52, name: 'A   52' },
          { value: 12, name: 'B   12' },
          { value: 2, name: 'C    2' },

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  options2: EChartsOption =  {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 97, name: 'A   97' },
          { value: 56, name: 'B   56' },
          { value: 15, name: 'C   15' },
          { value: 2, name: 'D    2' },
          { value: 1, name: 'F    1' },
          { value: 3, name: 'W    3' },

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  options3: EChartsOption =  {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 22, name: 'A   22' },
          { value: 15, name: 'B   15' },
          { value: 2, name: 'W    2' },

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  options4: EChartsOption =  {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 56, name: 'A   56' },
          { value: 33, name: 'B   33' },

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  constructor() { }

  ngOnInit(): void {

  }



}
