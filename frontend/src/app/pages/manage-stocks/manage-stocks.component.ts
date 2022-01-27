import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/Interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})
export class ManageStocksComponent implements OnInit {
	title = 'Modification simultanée de produits';
	listeProduits: Product[] = [];
	toUpdateProductList: Product[] = [];
	categoryProd: any = [];
	htmlVar:Product[] = []
	quantityModifyValue: number = 0;


  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
	this.getProducts();
}

	getProducts(){
		this.productsService.getProductsFromJson().subscribe({
			next:(res: Product[]) => {
				this.listeProduits = res;
				this.getProductByCategory();
			},
			error:(err) => {
				alert('failed loading json data');
			}
		});
	}


getCategoryName(n:number){
	let correspondance = this.productsService.productCategory;
}


addToUpdateQuantitylist(e:any,produit:Product){
	console.log(this.quantityModifyValue)
	let newQuantity:number  = parseInt(e.target.value)
	console.log(newQuantity)
	let index:number = this.toUpdateProductList.indexOf(produit)
	if(newQuantity==null){
		if(index > -1){
			this.toUpdateProductList.splice(index,1)
		}
	}
	else{
		if(index > -1){
			produit = this.toUpdateProductList[index]
			if(produit.quantity_stock!=undefined){
				produit.quantity_stock = produit.quantity_stock+newQuantity
				if(produit.quantity_stock<0){
					produit.quantity_stock = 0
				}
			}
			this.toUpdateProductList[index] = produit
		}
		else if (index < 0 && newQuantity!=null){
			if(produit.quantity_stock!=undefined){
				produit.quantity_stock += newQuantity
				if(produit.quantity_stock<0){
					produit.quantity_stock = 0
				}
			}
			this.toUpdateProductList.push(produit)
		}
	}
}


updateProductsQuantityDiscount(){
console.log(this.toUpdateProductList)
this.toUpdateProductList.forEach(product => {
	if(product.id!=undefined)
	this.productsService
	.putProductFromJson(product, product.id)
	.subscribe(product => console.log(product))
});
}

addToUpdateDiscountlist(e:any,produit:Product){
	let newDiscount:number = parseInt(e.target.value)
	let index = this.toUpdateProductList.indexOf(produit)

		if(newDiscount==null){
			if(index > -1){
				this.toUpdateProductList.splice(index,1)
			}
		}
		else if (newDiscount >= 0 &&newDiscount<=100){
			if(index > -1){
				if(produit.discount!=undefined)
				if(produit.discount >= 0 && produit.discount <= 100){
					if(produit.price!=undefined){
						produit.price_on_sale = produit.price - ((produit.price*newDiscount)/100)
					}
					produit = this.toUpdateProductList[index]
				}
				produit.discount = newDiscount
				this.toUpdateProductList[index] = produit
			}
			else if (index < 0 && newDiscount<=100){
				produit.discount = newDiscount
				if(produit.discount >= 0 && produit.discount <= 100){
					if(produit.price!=undefined){
						produit.price_on_sale = produit.price - ((produit.price*newDiscount)/100)
					}
					this.toUpdateProductList.push(produit)
				}
			}
		}
}

getCategoryNameById(produitList:string){
	let correspondance = this.productsService.productCategory;
	let key = this.categoryProd.indexOf(produitList)
	return correspondance[key]
}
	getProductByCategory(){
		let categoryProdu: (string|Product)[][] = [];

		let correspondance = this.productsService.productCategory;
		for (let key in correspondance) {
			this.categoryProd[key] = []
		 	this.listeProduits.forEach(product => {
			if(product.category == parseInt(key)){
				if(product.id!=undefined){	this.categoryProd[key].push(product);	}
			}
		  });
		}
	  }

}
