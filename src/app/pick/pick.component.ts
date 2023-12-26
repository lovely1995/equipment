import { Component, Input, OnInit } from '@angular/core';
import { PickitemService } from './../pickitem.service';


@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent implements OnInit {
    //傳遞參數
  @Input() paraData: any;

  NAME:any="";

  // CAR_QTY="151025";
  CAR_QTY_HEAD=0;
  CAR_QTY=0;
  CAR_QTY_LAST=0;
  CNT=5;
  DATA:any;
  //畫面上第幾台
  CNT_FOR_CNT=0;

  //往前/往後
  ADD_CNT_SELECT=0;
  MINUS_CNT_SELECT=0;
  //讀取完成
  LOAD_FINISH=false;
  //預計進線時間
  PRED_TI:any;
  PRED_TI_FINISH=false;
  //
  MESSAGE="";
  foundData:any;
  //查無資料
  NODATA=false;




  constructor(private PickitemService:PickitemService) {}

 //start 
 ngOnInit(){

  this.NAME=this.paraData;
  if(this.NAME=="後軸") 
  {
    this.CNT=9;
    this.startTimer();
  }
  if(this.NAME=="前保") this.CNT=5;
  if(this.NAME=="後保") this.CNT=4;


  this.CAR_QTY=0;

  this.getData();
  
 


 }



 startTimer() {
  const currentTime = new Date();
  const seconds = currentTime.getSeconds();

  if (seconds == 10) {
    // 当前秒数小于10时，执行console.log("test");
    this.getData();
  }

  // 设置定时器，每隔一秒检查一次是否满足条件
  setInterval(() => {
    const currentTime = new Date();
    const seconds = currentTime.getSeconds();

    if (seconds == 10) {
      this.getData();
    }
  }, 1000);
}



getYear(date:any){
  date =new Date(date);
  const year =date.getFullYear();
  if(year>=2000) return true;
  else  return  false;
}

 formatDateToYYYYMMDDHHMMSS(date:any) {
  date =new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
//後軸
addCNT_FOR_CNT_AX(){
  this.LOAD_FINISH=false;
  //車序+N
  this.ADD_CNT_SELECT=this.CAR_QTY+10;

  console.log(this.ADD_CNT_SELECT);
  this.MINUS_CNT_SELECT=0;
  //call API
  this.getData();

  //選第一台車
  this.CNT_FOR_CNT=0;
  //clear
  this.ADD_CNT_SELECT=0;
  this.MINUS_CNT_SELECT=0;
  this.showDetail();
}
//後軸
minusCNT_FOR_CNT_AX(){
  this.LOAD_FINISH=false;
  //車序-N
  this.ADD_CNT_SELECT=this.CAR_QTY-10;

  console.log(this.ADD_CNT_SELECT);
  this.MINUS_CNT_SELECT=0;
  //call API
  this.getData();

  //選第一台車
  this.CNT_FOR_CNT=0;
  //clear
  this.ADD_CNT_SELECT=0;
  this.MINUS_CNT_SELECT=0;
  this.showDetail();
}

//預計進線時間
showPredTi(){
  this.PRED_TI_FINISH=false;
  this.PickitemService
  .postData(
    "showPredTi", {
        "CAR_QTY":`${this.CAR_QTY}`,
      }
    )    
    .subscribe((res:any)=>{

        if(res.resultData){
          //console.log(res.resultData.TI_PREDICT_TIME);
          if(res.resultData.TI_PREDICT_TIME) 
          {
            this.PRED_TI=this.formatDateToYYYYMMDDHHMMSS(res.resultData.TI_PREDICT_TIME);
            this.PRED_TI_FINISH=true;
          }
          else{
            this.PRED_TI=" [查無預計進線時間]";
            this.PRED_TI_FINISH=true
          }
        }
        else{
          this.PRED_TI=" [查無預計進線時間]";
          this.PRED_TI_FINISH=true
        }
    
  });
}

//保桿
addCNT_FOR_CNT(){
  
  this.saveData();
  if(this.CNT_FOR_CNT == this.CNT) {
    //車序+N
    this.ADD_CNT_SELECT=this.CAR_QTY+this.CNT+1;

    this.MINUS_CNT_SELECT=0;
    //call API
    this.getData();

    //選第一台車
    this.CNT_FOR_CNT=0;
    //clear
    this.ADD_CNT_SELECT=0;
    this.MINUS_CNT_SELECT=0;
    return;
  }
 
  this.CNT_FOR_CNT++;
  this.showDetail();
  //因為讀取太久了 透過前端控制畫面
  console.log( this.DATA[this.CNT_FOR_CNT-1]);
  this.DATA[this.CNT_FOR_CNT-1].OK=1;
}
//保桿
minusCNT_FOR_CNT(){
  console.log(this.CNT_FOR_CNT);
  if(this.CNT_FOR_CNT == 0) {
    //車序-N
    this.MINUS_CNT_SELECT=this.CAR_QTY-1;
    this.backdelData();

    this.ADD_CNT_SELECT=0;
    //call API
    this.getData();

    //選最後一台車
    this.CNT_FOR_CNT=this.CNT;

    //clear
    this.ADD_CNT_SELECT=0;
    this.MINUS_CNT_SELECT=0;


    return;
  }

  this.CNT_FOR_CNT--;
  this.showDetail();
  this.delData();
  //因為讀取太久了 透過前端控制畫面
  this.DATA[this.CNT_FOR_CNT].OK=0;
}

showDetail(){
  this.foundData = this.DATA[this.CNT_FOR_CNT];
  // console.log(this.foundData);
}


 //show view
getData(){
  this.NODATA=false;
  this.LOAD_FINISH=false;
  var _car_qty=this.CAR_QTY;
  var _FORWORDCNT=this.ADD_CNT_SELECT;
  var _BACKCNT =this.MINUS_CNT_SELECT;
  var _CNT_FOR_CNT=this.CNT_FOR_CNT;

  console.log(this.MINUS_CNT_SELECT);



  this.PickitemService
  .postData(
    "showRecord", {
        "NAME":`${this.NAME}`,
        "CAR_QTY":`${_car_qty}`,
        "CNT":`${this.CNT}`,
        "FORWORDCNT":`${_FORWORDCNT}`,
        "BACKCNT":`${_BACKCNT}`,
      }
    )    
    .subscribe((res:any)=>{
      //console.log( res.resultData);
      //console.log(">>>>"+res.resultData.length);


      //重置起點 第一台車序
      if(res.resultData.length > 0){  
        //第一台車序 頭
        this.CAR_QTY_HEAD=res.resultData[0].CAR_QTY;
        this.CAR_QTY=res.resultData[0].CAR_QTY;
      }else{
        //console.log("no");

        this.LOAD_FINISH=true;
        this.NODATA=true;
        return;
      }

      
      var resCnt = res.resultData.length;
      //最後一台車序
      this.CAR_QTY_LAST=res.resultData[resCnt-1].CAR_QTY;

      this.DATA=res.resultData;
      this.showDetail();
      this.showPredTi();

      this.LOAD_FINISH=true;
      // this.submitMessage=res.resultData.MESSAGE;  
      // this.showMaintainList();
  });

}
  

//save list 全部完成(後軸)
saveDataList(){

  //var _foundData = this.DATA.find((item:any) => item.CAR_QTY == car_qty);

  //建立車序 N,N+1,N+2......
  var totalQty="";

  for(var i=this.CAR_QTY;i<=this.CAR_QTY_LAST;i++){
    if(i==this.CAR_QTY_LAST){
      totalQty+=i;
    }else{
      totalQty+=i+",";
    }

  }


  this.PickitemService
  .postData(
    "InsertRecordBatch", {
      "CAR_QTY_HEAD":`${this.CAR_QTY_HEAD}`,
        "CAR_QTY_LIST":`${totalQty}`,
        "NAME":`${this.NAME}`
      }
    )    
    .subscribe((res:any)=>{
    console.log( res.resultData);
    if(res.resultData.MESSAGE.indexOf('PRIMARY KEY') !== -1) this.MESSAGE="資料已存在";
    this.getData();
    
  });
}

//delete list 全部完成(後軸)
delDataList(){

  //var _foundData = this.DATA.find((item:any) => item.CAR_QTY == car_qty);

  //建立車序 N,N+1,N+2......
  var totalQty="";

  for(var i=this.CAR_QTY;i<=this.CAR_QTY_LAST;i++){
    if(i==this.CAR_QTY_LAST){
      totalQty+=i;
    }else{
      totalQty+=i+",";
    }

  }


  this.PickitemService
  .postData(
    "DelRecordBatch", {
        "CAR_QTY_LIST":`${totalQty}`,
        "NAME":`${this.NAME}`
      }
    )    
    .subscribe((res:any)=>{

      this.getData();

    
  });
}


//save list 完成(前/後保)
saveData(){

  this.PickitemService
  .postData(
    "InsertRecord", {
        "CAR_QTY_HEAD":`${this.CAR_QTY_HEAD}`,
        "CAR_QTY_LIST":`${  this.foundData.CAR_QTY}`,
        "NAME":`${this.NAME}`
      }
    )    
    .subscribe((res:any)=>{
    console.log( res.resultData);
    if(res.resultData.MESSAGE.indexOf('PRIMARY KEY') !== -1) this.MESSAGE="資料已存在";
    //this.getData();
    
  });
}


//del list 完成(前/後保)
delData(){

  this.PickitemService
  .postData(
    "DelRecord", {
        "CAR_QTY_LIST":`${  this.foundData.CAR_QTY}`,
        "NAME":`${this.NAME}`
      }
    )    
    .subscribe((res:any)=>{
    console.log( res.resultData);

    //this.getData();
    
  });
}
//del list 完成(前/後保) 上一頁
backdelData(){

  this.PickitemService
  .postData(
    "DelRecord", {
        "CAR_QTY_LIST":`${  this.MINUS_CNT_SELECT}`,
        "NAME":`${this.NAME}`
      }
    )    
    .subscribe((res:any)=>{
    console.log( res.resultData);

    //this.getData();
    
  });
}




}
