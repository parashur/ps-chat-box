import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.css']
})
export class ImgPreviewComponent implements OnInit {
  itemsRefIMG;
  itemsImageList = [];
  constructor(private afd: AngularFireDatabase) {
       this.itemsRefIMG = afd.list('psimagtest');
     this.itemsImageList = this.itemsRefIMG.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })      );
    });
    console.log(this.itemsImageList);
   }

  ngOnInit() {
     
  }

}