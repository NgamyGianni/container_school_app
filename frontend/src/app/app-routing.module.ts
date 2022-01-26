import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsProduitComponent } from './pages/details-produit/details-produit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ManageStocksComponent } from './pages/manage-stocks/manage-stocks.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'details', component: DetailsProduitComponent },
	{ path: 'manageStocks', component: ManageStocksComponent },
	/*{ path: '', component: AppComponent }*/
	{ path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
