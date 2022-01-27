import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/Interfaces/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  onDisplayList!:boolean;
  productsList!:Product[];
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
  }
  onGetDetailsProduct(displayList:boolean){
    console.log(displayList, "show the result")
    this.onDisplayList=displayList
    console.log("Received an event from the component btn-details", displayList)
    this.productsService.getProductsFromJson()
          .subscribe({
            next:(res:Product[])=>{
              this.productsList=[...res];
              console.log(this.productsList);},
            // error:(err)=>console.log("I got an error "+err),
            // complete:()=>{this.onDisplayList=!this.onDisplayList}
          })
    //if(this.onDisplayList)
      
  }
  

}
