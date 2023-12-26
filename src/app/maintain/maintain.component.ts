import { PickitemService } from './../pickitem.service';
import { Component, OnInit, ViewChild,ElementRef, Input  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.css'],
  //  styleUrls: ['../../app/styles.css'],
})
export class MaintainComponent implements OnInit{
  //傳遞參數
  @Input() paraData: any;




  //頁面
  title:any;
  //para
  SID_SELECT:any="add";
  editData:any;
  //操作階段
  //edit or add
  usestate:any;
  //訊息
  submitMessage:any;
  //視窗隱藏物件
  doneAndHideBtn:any=false;
  //編輯視窗
  MODL1:any;
  MODL2:any;
  SPEC:any;
  OPTION_CODE:any;
  COLR:any;
  COLOR_CHINESE:any;
  ITEM_NO:any;
  PATH:any;
  AB_PATH:any;//相對路徑
  CAR_CONTENT:any;
  SID:any;
  CUST_COLR:any;
  //上傳之檔案
  selectedFile: any;
  uploadError:any;//提示
  //
  searchqty:any;
  searchtpe:any;
  searchpic:any;
  //讀取狀態
  TABLE_FINISH=false;

 //start 
 ngOnInit(){

 

  this.showMaintainList();

 }

 
 dataSource: MatTableDataSource<any>;
 displayedColumns: string[] = [];


//  displayedColumns: string[] = ["NO", "CARCODE", "TYPE", "SPECIF","SELECT",
//  "COLOR","COLOR_CHINESE","ITEM_NO","PATH","CONTENT","ACTION" ];


 @ViewChild(MatPaginator, {static: false}) set paginator(paginator: MatPaginator) {
   this.dataSource.paginator = paginator;
 } 

 data:any = [];

 constructor(private PickitemService:PickitemService) {

  
   this.dataSource = new MatTableDataSource<any>();
 
 }

 //初始化
 reInit(){
   this.submitMessage="";
   this.doneAndHideBtn=false;
   this.uploadError="";

 }

 //搜尋 車系 車型 圖檔 
 searchPara(){
  if(this.searchqty!="" || this.searchtpe!="" || this.searchpic!=""){
    this.TABLE_FINISH=false;
    this.data=this.PickitemService
    .postData(
      "search", 
        {
            "NAME":`${this.title}`,
            "MODL1":`${this.searchqty}`,
            "MODL2":`${this.searchtpe}`,
            "PATH":`${this.searchpic}`,
        }
      )    
    .subscribe((res:any)=>{
  
      this.data=res.resultData;
      if(res.resultData){
        this.TABLE_FINISH=true;
        //console.log( this.data);
        //this.dataSource.data = this.data;
      }

  
    });
    return;
  }


 }
  getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并补齐两位
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return dateTimeString;
}








 takeData(sid:any){

   this.reInit();
  
   if(sid=='')
   {
     this.MODL1="";
     this.MODL2="";
     this.SPEC="";
     this.OPTION_CODE="";
     this.COLR="";;
     this.PATH="";
     this.AB_PATH="";
     this.CAR_CONTENT="";
     this.COLOR_CHINESE="";
     this.ITEM_NO="";
     this.SID="";
     this.CUST_COLR="";
     this.usestate="add";
    // console.log(`無資料`);
     return;
   }


   this.SID_SELECT=sid;

   //找出該筆資料
   const foundData = this.data.find((item:any) => item.SID == sid);

   if(foundData==null){
     console.log(`$ 系統異常，查無 ID = {sid} 的資料`);
   }else{
     this.usestate="edit";
     this.editData=foundData;
     //
     this.MODL1=foundData.MODL1;
     this.MODL2=foundData.MODL2;
     this.SPEC=foundData.SPEC;
     this.OPTION_CODE=foundData.OPTION_CODE;
     this.COLR=foundData.COLR;
     this.COLOR_CHINESE=foundData.COLOR_CHINESE;
     this.PATH=foundData.PATH;
     //
     this.AB_PATH= foundData.PATH+'.jpg';
 
     this.CAR_CONTENT=foundData.CAR_CONTENT;
     this.ITEM_NO=foundData.ITEM_NO;
     this.CUST_COLR=foundData.CUST_COLR;
     this.SID=foundData.SID;

   //  console.log(this.usestate);
   }


 }


 submitData(){

  
  if(this.title=="後軸"){
    if(this.MODL1=="" || this.MODL2=="" || this.SPEC==""  || this.OPTION_CODE==""|| this.COLR=="" )
    {
      this.submitMessage="資料尚有空白!";    
 
      return;
    }
  }else{
    if(this.MODL1=="" || this.MODL2=="" || this.SPEC=="" || this.OPTION_CODE=="" || this.COLR=="" )
    {
      this.submitMessage="資料尚有空白!";    
 
      return;
    }
  }

 

   // console.log(this.usestate);
if(this.usestate=="add"){
  let __sid =this.getCurrentDateTime()+this.MODL1+this.MODL2;
  this.PickitemService
  .postData(
    "InsertPara", {
        "__SID":`${__sid}`,
        "NAME":`${this.title}`,
        "MODL1":`${this.MODL1}`,
        "MODL2":`${this.MODL2}`,
        "SPEC":`${this.SPEC}`,
        "OPTION_CODE":`${this.OPTION_CODE}`,
        "COLR":`${this.COLR}`,
        "CUST_COLR":`${this.CUST_COLR}`,
        "COLOR_CHINESE":`${this.COLOR_CHINESE}`,
        "PATH":`${this.PATH}`,
        "ITEM_NO":`${this.ITEM_NO}`,
        "CAR_CONTENT":`${this.CAR_CONTENT}`,
      }
    )    
    .subscribe((res:any)=>{
    //console.log( res.resultData);
    this.submitMessage=res.resultData.MESSAGE;  
    this.upLoadPic(__sid);
    //this.showMaintainList();

    
  });
}
else{
      this.PickitemService
      .postData(
        "UpdatePara", {
            "NAME":`${this.title}`,
            "MODL1":`${this.MODL1}`,
            "MODL2":`${this.MODL2}`,
            "SPEC":`${this.SPEC}`,
            "OPTION_CODE":`${this.OPTION_CODE}`,
            "COLR":`${this.COLR}`,
            "COLOR_CHINESE":`${this.COLOR_CHINESE}`,
            "PATH":`${this.PATH}`,
            "ITEM_NO":`${this.ITEM_NO}`,
            "CUST_COLR":`${this.CUST_COLR}`,
            "SID":`${this.SID}`,
            "CAR_CONTENT":`${this.CAR_CONTENT}`,
          }
        )    
        .subscribe((res:any)=>{
        //console.log( res.resultData);
        this.submitMessage=res.resultData.MESSAGE; 
        this.upLoadPic(this.SID); 
        //this.showMaintainList();

      });

}
    
 
 
 

   this.doneAndHideBtn=true;

 }


 onFileChange(event: any) {
  this.uploadError="";
  this.doneAndHideBtn=false;
  this.selectedFile = <File>event.target.files[0];
  //附檔名 只能jpg
  let bottonName = this.selectedFile.name.split('.')[1];
  if(bottonName!="jpg"){
    this.uploadError="只能上傳 JPG !";
    this.doneAndHideBtn=true;
  }else{
    this.uploadError="";
    this.doneAndHideBtn=false;
  }
  console.log(this.selectedFile.name);
}

upLoadPic(__sid:any){
  //console.log("uploading");
  const formData = new FormData();
  formData.append('data', this.selectedFile);//選取檔案(不用改)   
  formData.append('sid', `${ __sid}`);  

  if(! this.selectedFile) {
    //console.log("不上傳圖片");
    this.showMaintainList();
    return;
  }

  this.PickitemService
  .postData("UploadPic",formData)    
    .subscribe((res:any)=>{
    //console.log( res.resultData);
    this.showMaintainList();
    //this.getData();
    //console.log(res);
  });
}

deletePara(){
  this.PickitemService
  .postData(
    "DeletePara", {
        "SID":`${this.SID}`
      }
    )    
    .subscribe((res:any)=>{

    this.submitMessage=res.resultData.MESSAGE; 
    this.showMaintainList();

  });

}


 showMaintainList(){
  this.TABLE_FINISH=false;
  this.title=this.paraData;

  if(this.title=="前保"){
    //
    this.displayedColumns=["NO", "MODL1","MODL2",  "SPEC","OPTION_CODE",
    "COLR","PATH","CAR_CONTENT","ACTION" ];
  }
  if(this.title=="後保"){
    //
    this.displayedColumns=["NO", "MODL1","MODL2", "SPEC","OPTION_CODE",
    "COLR","PATH","CAR_CONTENT","ACTION" ];
  }
  if(this.title=="後軸"){
    //
    this.displayedColumns=["NO", "MODL1","MODL2",  "SPEC","OPTION_CODE",
    "COLR","COLOR_CHINESE","ITEM_NO","CAR_CONTENT","ACTION" ];
  }
  this.data=this.PickitemService
  .postData(
    "AllPara", {"NAME":`${this.title}`}
    )    
  .subscribe((res:any)=>{

    this.data=res.resultData;
    if(res.resultData.MESSAGE=='查無資料 '){

      return;
    }
    else{
      this.TABLE_FINISH=true;
      //console.log( this.data);
      this.dataSource.data = this.data;
    }

  });




}
}
