import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ImgPreviewComponent } from './img-preview/img-preview.component';
const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    path:'chat',
    component:ChatComponent
  },{
    path:'psImage',
    component: ImgPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
