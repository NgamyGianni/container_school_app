import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/Interfaces/product';
import { Purchase } from '../../core/Interfaces/purchase';
import { Sale } from '../../core/Interfaces/sale';
import { ProductsService} from '../../core/services/products.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})

export class DetailsProduitComponent implements OnInit {

	title = 'details produits';
	listeProduits: Product[] = [];
	selectedProductID: number= 1;
	product: Product = {};
	addStockProductNumber: number = 1;
	addDiscountNumber: number = 0;

	constructor(public productsService : ProductsService) { }

	getProducts(){
		this.productsService.getProductsFromJson().subscribe({
			next:(res: Product[]) => {
				this.listeProduits = res;
				this.product = this.getProduct(this.selectedProductID);
			},
			error:(err) => {
				alert('failed loading api data');
			}
		});
	}

	getProduct(id : number){
		let toReturnProduit:Product = {}
		this.listeProduits.forEach(produit => {
			if (produit.id == id){
				 toReturnProduit = produit;
			}
		});
		return toReturnProduit
	}

	putAddRemoveStockProduct(){
		if(this.product.quantity_stock!=undefined){
			if(this.addStockProductNumber == 0){
				this.product.quantity_stock = 0
			}
			else{
				if(this.addStockProductNumber > 0){
					let purchase: Purchase = {};
					purchase["category"] = this.product.category;
					if(this.product.price != undefined)	purchase["price"] = (this.product.price/2) * this.addStockProductNumber;
					purchase["owner"] = "tig";
					purchase["name"] = this.product.name;
					purchase["quantity_sold"] = this.addStockProductNumber;

					this.productsService.postPurchaseFromJson(purchase).subscribe(product => console.log(product));
				}else{
					let sale: Sale={};
					sale["category"] = this.product.category;
					if(this.product.price != undefined)	sale["price"] = this.product.price * Math.abs(this.addStockProductNumber);
					sale["owner"] = "tig";
					sale["name"] = this.product.name;
					sale["quantity_sold"] = Math.abs(this.addStockProductNumber);

					if(Math.abs(this.addStockProductNumber) > this.product.quantity_stock && this.product.price != undefined)	sale["price"] = this.product.price * this.product.quantity_stock;
					this.productsService.postSaleFromJson(sale).subscribe(product => console.log(product));
				}

				this.product.quantity_stock += this.addStockProductNumber
				if(this.product.quantity_stock<0){
					this.product.quantity_stock = 0
				}
			}
		}

		this.productsService
			.putProductFromJson(this.product, this.selectedProductID)
			.subscribe(product => console.log(product))
	}

	putUpdatePromotionProduct(){
		this.product["discount"] = this.addDiscountNumber
		if(this.product["discount"] >= 0 && this.product["discount"] <= 100){
			if(this.product.price!=undefined){
				this.product.price_on_sale = this.product.price - ((this.product.price*this.addDiscountNumber)/100)
			}
			this.productsService
				.putProductFromJson(this.product, this.selectedProductID)
				.subscribe(product => console.log(product))
		}
		else{
			alert('0 <= Promotion <= 100');
		}
	}

	changeProduct(){
		this.product = this.getProduct(this.selectedProductID)
	}

	ngOnInit(): void {
		this.getProducts();
	}

}