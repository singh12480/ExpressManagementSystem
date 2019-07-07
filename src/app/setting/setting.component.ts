import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { Category } from './category.model';
import { Budget } from './budget.model';
import { ExpenseService } from '../expense/expense.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, OnDestroy {

  budgetForm: FormGroup;
  categoryForm: FormGroup;
  private categorySubscription: Subscription;
  category: Category[] = [];
  DeleteExpenseId:string;

  private budgetSubscription: Subscription;
  budget: Budget[] = [];
  
  length:number = 0;
  constructor(private fb:FormBuilder,
              private dataService: DataService,
              private expenseService: ExpenseService) {
    this.bForm();
    this.cForm();    
   }

  ngOnInit() {

    this.dataService.getBudget();
    this.budgetSubscription = this.dataService.getBudgetUpdatedListener()
        .subscribe(data=>{
          this.budget = data.budget;
          this.length = this.budget.length;
          console.log(this.budget);

        });
        
    this.dataService.getCategory();

    this.categorySubscription = this.dataService.getCategoryUpdatedListener()
                                .subscribe(data=>{
                                  // console.log(data.category);
                                  this.category = data.category;
                                  console.log(this.category);
                                });
          // console.log(this.category);
  }

  bForm(){
    this.budgetForm = this.fb.group({
      'budget':['']
    });
  }

  cForm(){
    this.categoryForm = this.fb.group({
      'category':['']
    })
  }

  saveBudget(){
    console.log(this.budgetForm.value.budget);
    this.dataService.addBudget(this.budgetForm.value.budget);
  }

  saveCategory(){
    console.log(this.categoryForm.value.category);
    this.dataService.addCategory(this.categoryForm.value.category);
  }

  deleteExpense(id:string){
    // console.log("total amount => "+this.totalAmount);
    console.log(id);
    this.DeleteExpenseId = id;
    console.log('delete expense !!');
  }

  Confirmdelete(){
    console.log(this.DeleteExpenseId)
    this.dataService.deleteCategory(this.DeleteExpenseId);
    location.reload();
  }

  ngOnDestroy(){
    this.categorySubscription.unsubscribe();
    this.budgetSubscription.unsubscribe();
  }

}
