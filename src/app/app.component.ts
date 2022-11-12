import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud_angular';
  // copy from angular material website
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'comment', 'date', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // instance of matdialog
  // constructor for injecting api
  constructor(public dialog: MatDialog, private api : ApiService) {

  }
  ngOnInit() {
    this.getAllProducts();
  }
  // on clicking add product opendialog will call dialog component 
  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    });
  }

  getAllProducts() { 
    this.api.getProducts()
    .subscribe({
      next:(res)=> {
        // console.log(res);
        // this table, paginator and sort are coming from top aswe declared there and imported
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=> {
        alert("Error while fetching the product list")
      }
    })
  }


editProduct(row: any) {
  this.dialog.open(DialogComponent, {
    width: '40%',
    data: row
  })
}

// filter method
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}
