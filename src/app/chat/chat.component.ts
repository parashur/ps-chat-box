import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'ngx-store';
import { postsData } from '../data';
export interface ViewMemoriesItem {
  name: string;
  id: number;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  displayedColumns = ['date', 'text'];
  subscription: Subscription;
  memory: any = {};
  name = 'chat now';
  position = 'float-left';
  positionFromUser;
  messages = [];
  // items: FirebaseListObservable<any>;
  msgVal: string = '';
  itemsRef;
  items = [];
  username;
  constructor(private afd: AngularFireDatabase, private ls: LocalStorageService) {
    this.itemsRef = afd.list('posts');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
    const data = this.afd.object('/posts').valueChanges().subscribe(val => {
      console.log(val);
    });
    console.log(new Date())
    this.username = this.ls.get('username');
  }

  addItem(newName: string) {
    const data = (<HTMLInputElement>document.getElementById('val')).value;
    if (data) {
      this.itemsRef.push({
        title: data,
        username: this.username
      });
      (<HTMLInputElement>document.getElementById('val')).value = "";
    }
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
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



  getDataByKey() {
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
    console.log("position in fun", this.positionFromUser)
  }

  right() {
    this.positionFromUser = (<HTMLInputElement>document.getElementById('r2')).value;
    console.log("position in fun", this.positionFromUser)
  }

  push() {
    const message = (<HTMLInputElement>document.getElementById('message')).value;
    (<HTMLInputElement>document.getElementById('message')).value = "";
    if (message) {
      if (this.positionFromUser == 'left') {
        this.position = 'float-left'
      } else {
        this.position = 'float-right'
      }

      const time = new Date();
      const text = {
        data: message,
        position: this.position,
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