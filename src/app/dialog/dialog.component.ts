import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
   
 freshnessList = ["Brand New", "Second Hand", "Refurbished"];
 productForm !: FormGroup;
  //here injected api service or imported api services 
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm  = this.formBuilder.group({
    productName: ['', Validators.required],
    category: ['', Validators.required],
    freshness: ['', Validators.required],
    price: ['', Validators.required],
    comment: ['', Validators.required],
    date: ['', Validators.required]
    })
  //  console.log(this.editData);
  // edit data
  // if editData is true or available then 
  if(this.editData) {
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
    this.productForm.controls['date'].setValue(this.editData.date);
  }

}

addProduct(){
  // console.log(this.productForm.value);
  // here this code is for posting our data to api service
  // this is aobserver type
  if(this.productForm.valid) {
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product added successfully");
        this.productForm.reset();
      },
      error:()=>{
        alert("Error while adding product")
      }
    })
  }
}

}