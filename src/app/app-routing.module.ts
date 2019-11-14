import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SaleComponent } from './sale/sale/sale.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryComponent },
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'product', component: ProductComponent},
  { path: 'transaction', component: TransactionComponent},
  { path: 'sale', component: SaleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }