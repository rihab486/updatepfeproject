import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Galery } from 'src/app/models/model';
import { GaleryService } from 'src/app/Services/galery.service';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-add-galery',
  templateUrl: './add-galery.component.html',
  styleUrls: ['./add-galery.component.css']
})
export class AddGaleryComponent implements OnInit {
  image!: Galery;
  progressBar = false;
  myForm !: FormGroup;
downloadURL!: Observable<string>;

selectedFile!: File;
fb = "";
basePath = '/images/';
  constructor( private storage: AngularFireStorage,private galeryservice :GaleryService ,
    public afs: AngularFirestore,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   this.image = new Galery();
}
add(){
  this.progressBar= true
  this.image.name=this.fb;
  let pr = Object.assign({},this.image); 
  {
    this.galeryservice.addGaleriesToImageColor(pr,this.data.idimagec).subscribe(prod  =>{
      this.image= prod 
      console.log("color image",this.image)
     window.location.reload()


    })

  }

}
onFileSelected(event:any){
  var n = Date.now();
  const file = event.target.files[0];
  const filePath = `${this.basePath}/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  task
  .snapshotChanges()
  .pipe(
    finalize(()=>{
      this.downloadURL = fileRef.getDownloadURL();
      this.downloadURL.subscribe((url)=>
      {
        if (url) {
          this.fb = url;
        }
        console.log(this.fb);
      });
    })
  )
  .subscribe((url)=>{
    if (url) {
      console.log(url);
    }
  });
}


}
