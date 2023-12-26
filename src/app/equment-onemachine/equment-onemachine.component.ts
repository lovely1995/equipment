import { EquimentService } from './../equiment.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables,ChartOptions, ChartType, RadialLinearScale, LinearScale } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


Chart.register(...registerables);
@Component({
  selector: 'app-equment-onemachine',
  templateUrl: './equment-onemachine.component.html',
  styleUrls: ['./equment-onemachine.component.css']
})
export class EqumentOnemachineComponent implements OnInit{

  data:any;
  currentSDate:any="2023-12-21";
  currentEDate:any="2023-12-21";

  machineId:any;
  machineName:any;
  //當下最新數值
  machineEle:any;
  machineTmp:any;
  machineShake:any;
  machineDttm:any;
  //當下健康度
  machineHealthyEle:any;
  machineHealthyTmp:any;
  machineHealthyShake:any;
  //當下健康度分數
  machineHealthyScoreEle:any;
  machineHealthyScoreTmp:any;
  machineHealthyScoreShake:any;
  //array
  P1ELEArray:any[] = [];
  P1TMPArray:any[] = [];
  P1SHAKEArray:any[] = [];
  DTTMArray:any[] = [];
  //
  myChartele:any =Chart;
  myCharttmp:any =Chart;
  myChartshake:any =Chart;
  //limit
  elelimit:any=0;
  elelimitdown:any=0;
  tmplimit:any=0;
  tmplimitdown:any=0;
  shakelimit:any=0;
  shakelimitdown:any=0;

  //first into page
  firstinropage:any=true;
  //
  loading:any=true;
  green:any="green-circle";
  yellow:any="yellow-circle";
  red:any="red-circle";

  constructor(private route: ActivatedRoute,private EquimentService:EquimentService,private datePipe: DatePipe) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.machineId = params['machineId'];
      this.machineName = params['machineName'];

      });

 
      //search data
      this.showmachineinfo();
     
    
  }


  _chartSub(id:any,x:any,y:any,y1:any=null,y2:any=null,ymax:any=null){


    return new Chart(id, {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: '#數值',
            data: y,
            backgroundColor: 'rgba(0, 0, 255, 0.2)', // Blue color for background
            borderColor: 'rgba(0, 0, 255, 1)', // Blue color for border
            borderWidth: 1
          },
          {
            label: '#異常',
            data: y1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: '#警戒',
            data: y2,
            backgroundColor: 'rgba(255, 165, 0, 0.2)', // Orange color for lower limit
            borderColor: 'rgba(255, 165, 0, 1)',
            borderWidth: 1
          }
      ]
      },
      options: {
        responsive :false,
        scales: {
          y: {
            max: ymax, // Set the maximum value for the Y-axis
            beginAtZero: true // Set this to true if you want the Y-axis to start from zero
          }
          // x: {
          //   type: 'time',
          //   time: {
          //     parser: 'HH:mm:ss',
          //     unit: 'hour',
          //     displayFormats: {
          //       hour: 'HH:mm'
          //     },
          //     tooltipFormat: 'D MMM YYYY - HH:mm:ss'
          //   }
          // }
        },
        plugins: {
 
          legend: {
            display: true
          }
        },
      }
  });
  }





  putvalueinchart(){


    //console.log(this.P1ELEArray);

    let eletlimitup = Array(this.DTTMArray.length).fill(this.elelimit);
    let eletlimitdown = Array(this.DTTMArray.length).fill(this.elelimitdown);
    this.myChartele=this._chartSub("ele",this.DTTMArray,this.P1ELEArray,eletlimitup,eletlimitdown,20);

    let tmptlimitup = Array(this.DTTMArray.length).fill(this.tmplimit);
    let tmptlimitdown = Array(this.DTTMArray.length).fill(this.tmplimitdown);
    this.myCharttmp=this._chartSub("tmp",this.DTTMArray, this.P1TMPArray,tmptlimitup,tmptlimitdown,70);

    
    let shakelimitup = Array(this.DTTMArray.length).fill(this.shakelimit);
    let shakelimitdown = Array(this.DTTMArray.length).fill(this.shakelimitdown);
    this.myChartshake=this._chartSub("shake",this.DTTMArray,this.P1SHAKEArray,shakelimitup,shakelimitdown,3.2);



  }


 showmachinehealthy(){
    this.EquimentService
    .postData(
      "GetOneMachineHealthy", 
      {
        "eqnme":`${this.machineName}`,
        "eleval":`${this.machineEle}`,
        "tmpval":`${this.machineTmp}`,
        "shakeval":`${this.machineShake}`,
      }
    )    
    .subscribe((res:any)=>{
      if(res.resultData && res.resultData.length>0){

        for (let i = 0; i < res.resultData.length; i++) {
          if(res.resultData[i].action=="電流"){
            this.machineHealthyEle=res.resultData[i].healthy;
            this.machineHealthyScoreEle=res.resultData[i].healthyval;
            this.elelimit=res.resultData[i].healthylimit;
            this.elelimitdown=res.resultData[i].healthylimitdown;
          }
          if(res.resultData[i].action=="溫度"){
            this.machineHealthyTmp=res.resultData[i].healthy;
            this.machineHealthyScoreTmp=res.resultData[i].healthyval;
            this.tmplimit=res.resultData[i].healthylimit;
            this.tmplimitdown=res.resultData[i].healthylimitdown;
          }
          if(res.resultData[i].action=="震動"){
            this.machineHealthyShake=res.resultData[i].healthy;
            this.machineHealthyScoreShake=res.resultData[i].healthyval;
            this.shakelimit=res.resultData[i].healthylimit;
            this.shakelimitdown=res.resultData[i].healthylimitdown;
          }
        }


        //把資料個別切出來
        this.splitdata();
        if(this.firstinropage){
          this.putvalueinchart();
          this.firstinropage=false;
        }
        else{
          // 更新 Chart 的資料
          console.log(this.elelimit);
          this.myChartele.data.labels =  this.DTTMArray;
          //
          let eletlimitup = Array(this.DTTMArray.length).fill(this.elelimit);
          this.myChartele.data.datasets[0].data=[];
          this.myChartele.data.datasets[1].data=[];
          this.myChartele.data.datasets[0].data =  this.P1ELEArray;
          this.myChartele.data.datasets[1].data =  eletlimitup;
          this.myCharttmp.data.labels =  this.DTTMArray;
          //
          let tmptlimitup = Array(this.DTTMArray.length).fill(this.tmplimit);
          this.myCharttmp.data.datasets[0].data=[];
          this.myCharttmp.data.datasets[1].data=[];
          this.myCharttmp.data.datasets[0].data =  this.P1TMPArray;
          this.myCharttmp.data.datasets[1].data =  tmptlimitup;
          this.myChartshake.data.labels =  this.DTTMArray;
          //
          let shakelimitup = Array(this.DTTMArray.length).fill(this.shakelimit);
          this.myChartshake.data.datasets[0].data=[];
          this.myChartshake.data.datasets[1].data=[];
          this.myChartshake.data.datasets[0].data =  this.P1SHAKEArray;
          this.myChartshake.data.datasets[1].data =  shakelimitup;
          this.myChartshake.data.labels =  this.DTTMArray;

          // 呼叫 update 方法來更新 Chart
          this.myChartele.update();
          this.myCharttmp.update();
          this.myChartshake.update();

          console.log("刷新");
          } 


      }else{
        console.log("查無資料");
      }
    });
  }



  showmachineinfo(){
    this.loading=true;
    this.data=this.EquimentService
    .postData(
      "GetOneMachine", 
        {
            "sdte":`${this.currentSDate}`,
            "edte":`${this.currentEDate}`,
        }
      )    
    .subscribe((res:any)=>{
      this.data=res.resultData;
      if(res.resultData && res.resultData.length>0)
      {
        //設備健康度
        this.showmachinehealthy();


      }
      else
      {
        //空資料
        this.myChartele.data.labels =[];
        this.myChartele.data.datasets[0].data =  [];

        this.myCharttmp.data.labels =[];
        this.myCharttmp.data.datasets[0].data =  [];

        this.myChartshake.data.labels =[];
        this.myChartshake.data.datasets[0].data =  [];

        this.myChartele.update();
        this.myCharttmp.update();
        this.myChartshake.update();
        console.log("查無資料");
      }
      this.waitonesec();
  

    });

  
 }



 splitdata(){
  this.P1ELEArray = [];
  this.P1TMPArray = [];
  this.P1SHAKEArray = [];
  this.DTTMArray = [];

  for (const item of this.data) {
    this.P1ELEArray.push(item.P1ELE);
    this.P1TMPArray.push(item.P1TMP);
    this.P1SHAKEArray.push(item.P1SHAKE);


    const newdt =this.formatTimeLabel(item.DTTM);
    // 假設 DTTMArray 是一個包含日期時間字符串的陣列
    // const count = this.DTTMArray.filter(dateTime => dateTime.includes(newdt)).length;
    // if(count>0) continue;
    this.DTTMArray.push(newdt);


  }





  this.machineEle= this.P1ELEArray[this.P1ELEArray.length - 1];
  this.machineTmp = this.P1TMPArray[this.P1TMPArray.length - 1];
  this.machineShake = this.P1SHAKEArray[this.P1SHAKEArray.length - 1];
  //
  this.machineDttm= this.data[this.data.length - 1].DTTM.split('T')[1];
 }


  private formatTimeLabel(dateTime: string): string {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // 格式化為 HH:00
  const formattedHours = hours < 10 ? '0' + hours : '' + hours;
  const formattedMonutes = minutes < 10 ? '0' + minutes : '' + minutes;
 
  return `${formattedHours}:${formattedMonutes}`;
 
  }

  waitonesec(){
    // 创建一个 Observable，它会在5秒后发出一个值
    const delayedObservable = new Observable<number>(observer => {
      // 在这里执行需要延迟的操作
      observer.next(1);
      observer.complete();
    }).pipe(
      // 使用 delay 操作符来延迟5秒
      delay(1000)
    );

    // 订阅 Observable
    delayedObservable.subscribe(value => {
      this.loading=false;
    });
  }

  gethealthycolor(healthy:any){
    if(healthy=="健康") return this.green;
    if(healthy=="亞健康") return this.yellow;
    if(healthy=="異常") return this.red;
  }

}
