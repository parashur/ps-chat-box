import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { WebStorageModule } from 'ngx-store';

export const firebase = {
  apiKey: "AIzaSyAAbOpC7XLZjmu9MJ0HtiiuQXxAhM0GOYE",
  authDomain: "chat-peace-s.firebaseapp.com",
  databaseURL: "https://chat-peace-s.firebaseio.com",
  projectId: "chat-peace-s",
  storageBucket: "chat-peace-s.appspot.com",
  messagingSenderId: "833228858212",
  appId: "1:833228858212:web:bb49a1bc88239926"
};

@NgModule({
  imports: [BrowserModule, 
    FormsModule,
    AngularFireModule.initializeApp(firebase),
    WebStorageModule,
    AppRoutingModule,
    AngularFireDatabaseModule],
  declarations: [
  AppComponent, 
  HelloComponent, 
  ChatComponent, 
  LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
