import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrontMaintainComponent } from './front-maintain/front-maintain.component';
import { BackMaintainComponent } from './back-maintain/back-maintain.component';
import { BackAxMaintainComponent } from './back-ax-maintain/back-ax-maintain.component';
import { FrontPickComponent } from './front-pick/front-pick.component';
import { BackPickComponent } from './back-pick/back-pick.component';
import { BackAxPickComponent } from './back-ax-pick/back-ax-pick.component';
import { IllustrateComponent } from './illustrate/illustrate.component';
import { SetnumComponent } from './setnum/setnum.component';
import { EqumentIndexComponent } from './equment-index/equment-index.component';
import { EqumentOnemachineComponent } from './equment-onemachine/equment-onemachine.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},//空路由 重新導向home 因應 active 標籤用
  {path:"home",component:HomeComponent},//對應不同子頁面 建立不同路由

  {path:"frontMaintain",component:FrontMaintainComponent},
  {path:"backMaintain",component:BackMaintainComponent},
  {path:"backAxMaintain",component:BackAxMaintainComponent},
  {path:"frontPick",component:FrontPickComponent},
  {path:"backPick",component:BackPickComponent},
  {path:"backAxPick",component:BackAxPickComponent},
  {path:"illustrate",component:IllustrateComponent},
  {path:"setnum",component:SetnumComponent},
  {path:"equmentindex",component:EqumentIndexComponent},
  {path:"equmentonemachine",component:EqumentOnemachineComponent},
  { path: 'equmentonemachine/:machineId:machineName', component: EqumentOnemachineComponent },
  {path:"**",component:HomeComponent}//異常路由 跳去home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


