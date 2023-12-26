import { Component, Input, OnInit } from '@angular/core';
import { PickitemService } from './../pickitem.service';

@Component({
  selector: 'app-setnum',
  templateUrl: './setnum.component.html',
  styleUrls: ['./setnum.component.css']
})
export class SetnumComponent implements OnInit{


  constructor(private PickitemService:PickitemService) {}


  front:any;
  back:any;
  backAx:any;

  searchOK:any;

  selectedValue:any;
  inputVal:any
  data:any=[];
  btn_select:any;

  ngOnInit(){

this.showdata();
  }

  init(){
    this.data=[];
    this.selectedValue="";
    this.btn_select="";
    this.searchOK=false;
  }
showdata(){
  this.getData("前保",4);
  this.getData("後保",4);
  this.getData("後軸",9);
}
  getData(nme:any,cnt:any){
  
    
  
    this.PickitemService
    .postData(
      "showRecord", {
          "NAME":`${nme}`,
          "CAR_QTY":`0`,
          "CNT":`${cnt}`,
          "FORWORDCNT":`0`,
          "BACKCNT":`0`,
        }
      )    
      .subscribe((res:any)=>{
 
        console.log(res.resultData);
        //重置起點 第一台車序
        if(res.resultData.length > 0){  
          //第一台車序 頭
          if(nme=="前保") this.front= res.resultData[0].CAR_QTY;
          if(nme=="後保")  this.back=res.resultData[0].CAR_QTY;
          if(nme=="後軸")  this.backAx=res.resultData[0].CAR_QTY;
        }else{
          return;
        }

    });
  }

inputCarqty(){
  this.data=[];
  
this.PickitemService
.postData(
  "takeCarqty", {
      "CAR_QTY":`${this.inputVal}`,
      "NAME":`${this.selectedValue}`
    }
  )    
  .subscribe((res:any)=>{
  console.log( res.resultData);
  this.data=res.resultData;
 
  
});
}
  saveDataList(){
  if(this.backAx%10 != 1) return;
    //var _foundData = this.DATA.find((item:any) => item.CAR_QTY == car_qty);
  var val =this.backAx;
  val =val -10;
    //建立車序 N,N+1,N+2......
    var totalQty=val+",";
  
  
  
    this.PickitemService
    .postData(
      "InsertRecordBatch", {
        "CAR_QTY_HEAD":`${val}`,
          "CAR_QTY_LIST":`${totalQty}`,
          "NAME":`後軸`
        }
      )    
      .subscribe((res:any)=>{
      //console.log( res.resultData);
   
      this.showdata();
      
    });
  }

  //save list 完成(前/後保)
saveData(nme:any){
var val;
if(nme=="前保") val =this.front;
if(nme=="後保") val =this.front;

val=val-1;
  this.PickitemService
  .postData(
    "InsertRecord", {
        "CAR_QTY_HEAD":`${val}`,
        "CAR_QTY_LIST":`${val}`,
        "NAME":`${nme}`
      }
    )    
    .subscribe((res:any)=>{
   // console.log( res.resultData);

    this.showdata();
    this.searchOK=true;
  });
}



givebtn_select(qty:any){

  this.btn_select=qty;
  this.searchOK=true;
}


saveCarqty(){
  
}


}
