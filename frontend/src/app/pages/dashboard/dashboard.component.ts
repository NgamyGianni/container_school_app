import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/Interfaces/product';
import { Purchase } from '../../core/Interfaces/purchase';
import { Sale } from '../../core/Interfaces/sale';
import { ProductsService} from '../../core/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	currentStyles: Record<string, string> = {};

	listePurchases: Purchase[] = [];
	listeSales: Sale[] = [];
	revenue: number = 0;
	depense: number = 0;
	netIncome: number = 0;
	categories: number[] = [];
	revenueCategories: any = {};
	year: string = "2022";
	montantImpot: number = 0;
	category: number = 0;

	constructor(public productsService : ProductsService) { }

	getData(){
		this.productsService.getSalesFromJson().subscribe({
			next:(res: Sale[]) => {
				this.listeSales = res;
			},
			error:(err) => {
				alert('failed loading api data');
			}
		});

		this.productsService.getPurchasesFromJson().subscribe({
			next:(res: Purchase[]) => {
				this.listePurchases = res;
			},
			error:(err) => {
				alert('failed loading api data');
			}
		});
	}

	calculateRevenueByYear(){
		this.revenue = 0;
		this.listeSales.forEach(sale => {
			if(sale.price != undefined && sale.date != undefined && this.year == sale.date.toString().substring(0, 4))	this.revenue += sale.price;
		});
	}

	calculateRevenueCategories(){
		this.listeSales.forEach(sale => {
			if(sale.category!= undefined && !this.categories.includes(sale.category))	this.categories.push(sale.category);
			if(sale.category!= undefined && !this.revenueCategories[sale.category] != undefined)	this.revenueCategories[sale.category] = sale.price;
			if(sale.price != undefined && sale.category != undefined && this.revenueCategories[sale.category] != undefined)	this.revenueCategories[sale.category] += sale.price;
		});
	}

	calculateNetIncome(){
		this.montantImpot = 0;
		this.depense = 0;
		this.listePurchases.forEach(purchase => {
			if(purchase.price != undefined && purchase.date != undefined && this.year == purchase.date.toString().substring(0, 4))	this.depense += purchase.price;
		});

		this.netIncome = this.revenue - this.depense;
		if(this.netIncome > 0){
			this.montantImpot = parseFloat((0.3 * this.netIncome).toFixed(3)); 
			this.netIncome -= this.montantImpot;
			this.netIncome = parseFloat(this.netIncome.toFixed(3))
		}

		this.currentStyles = {
		    'border-color':  this.netIncome  >= 0  ? 'green' : 'red',
		    'color':  this.netIncome  >= 0  ? 'green' : 'red'
		};
	}

	ngOnInit(): void {
		this.getData();
	}

}
