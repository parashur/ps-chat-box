import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.css']
})
export class ImgPreviewComponent implements OnInit {
  itemsRefIMG;
  itemsImageLists = [];
  height = [];
  width = [];
  constructor(private afd: AngularFireDatabase) {
    this.itemsRefIMG = afd.list('psimagtest');
    this.itemsImageLists = this.itemsRefIMG.snapshotChanges().map(changes => {
      console.log("d", changes);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsImageLists = this.itemsRefIMG.valueChanges()
      .subscribe(courses => {
        console.log("courses", courses); // Check the returned values;
        this.itemsImageLists = courses;
        if (this.itemsImageLists) {
          for (let i = 0; i < this.itemsImageLists.length; i++) {
            this.height[i] = 250;
            this.width[i] = 250;
          }
        }
      })
    console.log(" ds", this.itemsImageLists);
    this.getPeople();
  }

  ngOnInit() {

  }

  getPeople() {
    return new Promise<any>((resolve, reject) => {
      this.afd.list('/psimagtest').snapshotChanges()
        .subscribe(changes => {
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          console.log(" changes", changes);
          resolve(changes)
        })
    })
  }

  zoomIn(i) {
    this.width[i] = this.width[i] + 3;
    this.height[i] = this.height[i] + 3;
  }

  zoomOut(i) {
     this.width[i] = this.width[i] - 3;
    this.height[i] = this.height[i] - 3;
  }

}