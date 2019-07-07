import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { intercepting } from './service/auth.interceptor';
import { SettingComponent } from './setting/setting.component';
import { ExpenseComponent } from './expense/expense.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './setting/data.service';
import { ExpenseService } from './expense/expense.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authenticateService } from './auth.service';
import { RouteGuard } from './service/guard.route';


@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    ExpenseComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [DataService,ExpenseService,authenticateService,RouteGuard,
    {provide:HTTP_INTERCEPTORS, useClass:intercepting, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
