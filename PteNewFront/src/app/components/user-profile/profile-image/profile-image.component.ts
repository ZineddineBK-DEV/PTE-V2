import { HttpClient } from '@angular/common/http';
import { Component, ViewChildren, ElementRef, Inject , QueryList} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users.service';

declare var $: any; // Import jQuery

@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent {

  ok : boolean;
  image:any;
  d ={}
  constructor(private dialogRef : MatDialogRef<ProfileImageComponent>,
              
              private userService : UserService,
              private http : HttpClient,  
                  
              @Inject(MAT_DIALOG_DATA) public data: any,
  ){}


@ViewChildren('imageInput') imageInputs: QueryList<ElementRef>;

onActive(): void {

  $("#image-input").click();

}

onselectImage(event) {
  const file = event.target.files[0];
  this.image =file
  console.log(this.image.name)
  const formData =new FormData();
  formData.append('image',this.image)
  console.log(this.data._id)

  if(file){
  this.http.post<any>('http://localhost:3001/file',formData).subscribe()
    const d ={};
    d["image"]=this.image.name

    console.log(this.data)
    this.userService.updateUser(this.data._id,d).subscribe(response=>
      {
        window.location.reload();
    })
    

    
    
    
  }
  
}

ondelete(){
  const d ={};
  d["image"]=" "

  console.log(d)
  this.userService.updateUser(this.data._id,d).subscribe(response=>
    {
    console.log(response)
  })
  this.dialogRef.close()

  //reloading the page
  location.reload()
  
}
    
onClose(){
  this.dialogRef.close();
}
}
