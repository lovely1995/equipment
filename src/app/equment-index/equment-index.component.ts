import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

Chart.register(...registerables);
@Component({
  selector: 'app-equment-index',
  templateUrl: './equment-index.component.html',
  styleUrls: ['./equment-index.component.css']
})
export class EqumentIndexComponent implements OnInit{
  ngOnInit(){
  
    this._chart("chartMain",[20, 80,0]);
    this._chart("chartEg",[10, 85,5]);
    this._chart("chartAs",[5, 90,5]);
    this._chart("chartEd",[10, 70,20]);
    this._chart("chartCb",[20, 60,20]);


    this._chartSub("maintainall",[20, 80]);
    // this._chartSub("maintainEg",[90, 10]);
    // this._chartSub("maintainCb",[30, 70]);
    // this._chartSub("maintainEd",[95, 5]);
    // this._chartSub("maintainAs",[0, 100]);

    this._chartSub("maintainfinishall",[10, 90]);
    // this._chartSub("maintainfinishEg",[80, 20]);
    // this._chartSub("maintainfinishCb",[40, 60]);
    // this._chartSub("maintainfinishEd",[90, 10]);
    // this._chartSub("maintainfinishAs",[0, 100]);


    this.displayedColumns=["ACTION", "HEALTHY" ];



  }

  setCurrentDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.currentSDate = `${year}-${month}-${day}`;
    this.currentEDate = `${year}-${month}-${day}`;



  }

  
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator, {static: false}) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  } 
  

  //
  currentSDate: any;
  currentEDate: any;


  constructor() {
    // Initialize currentDate with today's date
    this.setCurrentDate();
    this.dataSource = new MatTableDataSource<any>();
  }



  
  _chart(id:any,data:any){
    //healthy
    this.dataSource.data=[ { ACTION: '裝潢線輸送帶',MACHINEID :'001' } , { ACTION: '測試01',MACHINEID :'002' } , { ACTION: '測試01',MACHINEID :'002' }];

    
    if(data==null) data=[];
    var myChart = new Chart(id, {
      type: 'doughnut',
      data: {
        labels: ['異常', '健康', '亞健康'],
        datasets: [{
            label: '#比例',
            data:data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(34, 139, 34, 0.2)',
                'rgba(255, 206, 86, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(34, 139, 34, 1)',
                'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
          scales: {
              y: {
                display: false
              }
          }
      }
  });
  }

  _chartSub(id:any,data:any){
    if(data==null) data=[12, 19];

    var myChart = new Chart(id, {
      type: 'doughnut',
      data: {
        labels: ['未完成', '完成'],
        datasets: [{
            label: '#比例',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(34, 139, 34, 0.2)',


            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(34, 139, 34, 1)',


            ],
            borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
          scales: {
              y: {
                display: false
              }
          }
      }
  });
  }
}
