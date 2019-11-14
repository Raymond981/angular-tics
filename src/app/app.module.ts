import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InventoryComponent } from './inventory/inventory.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MessagingService } from './servicios/messaging.service';
import { InventoryPipe } from './inventory/inventory.pipe';
import { ProductPipe } from './product/product.pipe';
import { TransactionPipe } from './transaction/transaction.pipe';
import { SaleComponent } from './sale/sale/sale.component';
import { SalePipe } from './sale/sale.pipe';


@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    TransactionComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductComponent,
    InventoryPipe,
    ProductPipe,
    TransactionPipe,
    SaleComponent,
    SalePipe,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
