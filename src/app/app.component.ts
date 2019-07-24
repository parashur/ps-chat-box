import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {postsData} from './data';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
export interface ViewMemoriesItem {
  name: string;
  id: number;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  displayedColumns = ['date', 'text'];
  subscription: Subscription;
  memory: any = {};
  name = 'chat now';
  position = 'float-left';
  positionFromUser;
  messages= [];
  // items: FirebaseListObservable<any>;
  msgVal: string = '';
  itemsRef;
  itemsRefBackup;
  items = [];
  itemsBackup = [];
  username;
  files;
  constructor(private afd: AngularFireDatabase, private ls: LocalStorageService, private router: Router) {
    this.itemsRef = afd.list('pschats-4');
    this.itemsRefBackup = afd.list('pschatsbackup-4');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })      );
    });
    this.itemsBackup = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })      );
    });
  }

  ngOnInit() {
     const data = this.afd.object('/pschats-1').valueChanges().subscribe(val => {
      console.log(val);
    });
    //  this.afd.object('/pschatsbackup').valueChanges().subscribe(val => {
    //   console.log(val);
    // });
    // console.log(new Date())
    if(this.ls.get('username')) {
      this.username  = this.ls.get('username');
    } else {
      this.router.navigate(['/login'])
    }
  }

  addItem(newName: string) {
    const data = (<HTMLInputElement>document.getElementById('val')).value;
    if(data){
    this.itemsRef.push({
      title:data,
      username: this.username
    });
    // this.itemsRefBackup.push({
    //   title:data,
    //   username: this.username
    // });
    (<HTMLInputElement>document.getElementById('val')).value = "";
    }
  }

   deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }

  deleteEverything() {
    this.itemsRef.remove();
  }

 readFile() {
  
  if (this.files && this.files[0]) {
    
    var FR= new FileReader();
    
    FR.addEventListener("load", function(e) {
     console.log(e.target);
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
  
}

handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
      //Converting Binary Data to base 64
      var base64String = window.btoa(binaryData);
      //showing file converted to base64
        (<HTMLInputElement>document.getElementById('base64')).value = base64String;
      alert('File converted to base64 successfuly!\nCheck in Textarea');
    };
  })(f);
  // Read in the image file as a data URL.
  reader.readAsBinaryString(f);
}
  
  // getComments() {
  //  this.commentList = this.afd.list('/comments');
  //  return this.commentList;
  // }

  // getPost() {
  //   this.postList = this.afd.list('/posts')
  //   return this.postList;
  // }

  // insertPost(){
  //   this.postList.push({
  //     title:'This is first post',
  //   })
  // }



   getDataByKey(){
    const data = this.afd.object('/posts/').valueChanges().subscribe(val => {
      console.log(val);
    });
    
  }

  onSubmit() {
    // this.memory.date = new Date(this.memory.date).valueOf();   
    const data = {
      'data': (<HTMLInputElement>document.getElementById('val')).value
    } 
    this.db.list('memories').push(this.memory)
      .then(_ => console.log('success'))      
  }

  left() {
    this.positionFromUser = (<HTMLInputElement>document.getElementById('val')).value;
       console.log("position in fun" ,this.positionFromUser )
 }

 right() {
    this.positionFromUser = (<HTMLInputElement>document.getElementById('r2')).value;
       console.log("position in fun" , this.positionFromUser )
 }
 
  push() {
    const message = (<HTMLInputElement>document.getElementById('message')).value;
    (<HTMLInputElement>document.getElementById('message')).value = "";
    if(message) {
    if(this.positionFromUser == 'left') {
      this.position = 'float-left'
    } else {
      this.position = 'float-right'
    }
    
    const time = new Date();
    const text = {
      data : message,
      position : this.position,
      time: new Date().valueOf()
    }
      this.db.list('memories').push(text)
      .then(_ => 
      console.log('success')
      ) 
    }
     
    // this.messages.push(text);
  }
}


export class CommentModel {
  $key : string;
  title : string;
  description : string;
  addedAt : Date;
  updateAt : Date;
}
