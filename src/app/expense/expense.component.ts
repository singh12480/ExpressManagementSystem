import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../setting/data.service';
import { Subscription } from 'rxjs';
import { Category } from '../setting/category.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.model';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit, OnDestroy{

  private categorySubscription: Subscription;
  category: any = [];

  expense:Expense[] = [];
  storeExpense:any = [];

 

  private ExpenseSubscription:Subscription;
  private budgetSubscription:Subscription;

  DeleteExpenseId:string;
  EditExpenseId: string;
  // EditExpenseData:any;

  addExpenseForm: FormGroup;
  editForm: FormGroup;

  totalAmount:number = 0;
  a:[] = [];
  totalBudget:number = 0;
  PieChart=[];
  BarChart=[];
  result: any = [];

  constructor(private dataService: DataService,
              private expenseService: ExpenseService,
              private fb: FormBuilder,
              private router: Router) {

                  this.eForm();
                  this.edit();

                 }

 

  ngOnInit() {   
    
    console.log("inside expense component")   
    this.expenseService.getExpense();
    this.ExpenseSubscription = this.expenseService.getExpenseUpdatedListener()
        .subscribe(data=>{
          this.expense = data.expense;
          this.storeExpense.push(data.expense);
          console.log('ngOnInit expense component');
          console.log(this.expense);
          console.log("length => "+this.expense.length);

          for(let i = 0; i< this.expense.length; i++){
            console.log(this.expense[i].amount);
            console.log(this.expense[i].category)
            let b =0;
            b = b + this.expense[i].amount;
            this.totalAmount = this.totalAmount + this.expense[i].amount;              
        } 
      });       

        console.log("total amount => "+this.totalAmount);
        this.dataService.getCategory();

        this.dataService.getCategoryUpdatedListener()
                                .subscribe(data=>{
                                  
                                  this.category.push(data.category);
                                 
                                //  this.CategoryWiseTotal
                                       let temp = {};
                                      let obj = null;
                                      for(let i=0; i < this.storeExpense[0].length; i++) {
                                        obj=this.storeExpense[0][i];
                                      
                                        if(!temp[obj.category]) {
                                            temp[obj.category] = obj;
                                        } else {
                                            temp[obj.category].amount += obj.amount;
                                        }
                                      }
                                      // var result = [];
                                      for (let prop in temp)
                                          this.result.push(temp[prop]);

                                      console.log(this.result);
                                      console.log(this.result.length);
                                      for(let p=0; p<this.result.length; p++){
                                        console.log(this.result[p].category);
                                        console.log(this.result[p].amount);
                                      }

                                });
      console.log(this.category);   

    // retrieving the total budget value
    this.dataService.getBudget();
    this.budgetSubscription = this.dataService.getBudgetUpdatedListener()
    .subscribe(res=>{
     console.log('inside expense componenet budget')
      console.log(res.budget[0].value);
      this.totalBudget = res.budget[0].value;
      console.log("this.totalBudget=>"+this.totalBudget)
    });
    console.log("this.totalBudget=>"+this.totalBudget)   

  }

  CategoryWiseTotal(){
   
    var temp = {};
    var obj = null;
    for(var i=0; i < this.storeExpense[0].length; i++) {
       obj=this.storeExpense[0][i];
    
       if(!temp[obj.category]) {
           temp[obj.category] = obj;
       } else {
           temp[obj.category].amount += obj.amount;
       }
    }
    var result = [];
    for (var prop in temp)
        result.push(temp[prop]);

    console.log(result);

  }

  edit(){
    this.editForm = this.fb.group({
      'category':[''],
      'item':[''],
      'amount':[''],
      'date':['']
    })
  }

  eForm(){
    this.addExpenseForm = this.fb.group({
      'category':[''],
      'item':[''],
      'amount':[''],
      'expenseDate':['']
    });
  }

  saveExpenseForm(){
    console.log('add expense form');
    console.log(this.addExpenseForm.value);
    this.expenseService.addExpense(this.addExpenseForm.value.category,
      this.addExpenseForm.value.item,
      this.addExpenseForm.value.amount,
      this.addExpenseForm.value.expenseDate);
      location.reload();
  }

  deleteExpense(id:string){
    console.log("total amount => "+this.totalAmount);
    console.log(id);
    this.DeleteExpenseId = id;
    console.log('delete expense !!');
  }

  Confirmdelete(){
    console.log(this.DeleteExpenseId)
    this.expenseService.deleteExpense(this.DeleteExpenseId);
    location.reload();
  }

  edit1(id:string){
    console.log(id);
    this.EditExpenseId = id;
    console.log(this.EditExpenseId);
    this.expenseService.getExpenseById(this.EditExpenseId)
    .subscribe(data=>{
      console.log("inside get expense component by id...");
      console.log(data.message);
      console.log(data.expense);
      let EditExpenseData:any = data.expense;
      console.log(EditExpenseData.category);
      this.editForm.setValue({
        'category': EditExpenseData.category,
        'item': EditExpenseData.item,
        'amount': EditExpenseData.amount,
        'date': EditExpenseData.date
      });
      });
     
  }

  confirmEdit(){
    console.log('confirm edit !!');
    console.log(this.EditExpenseId);
    console.log(this.editForm.value.category);
    this.expenseService.updateExpense(this.EditExpenseId,this.editForm.value.category,this.editForm.value.item,this.editForm.value.amount,this.editForm.value.date);
    
    location.reload();
  }

   BudgetChart(){
    
     console.log('pie function')
     console.log(this.totalAmount);
     console.log(this.totalBudget);
        // pie chart:
this.PieChart = new Chart('BudgetPieChart', {
  type: 'pie',
data: {
 labels: ["Total Budget", "Total Expense"],
 datasets: [{
     label: 'Budget figure',
     data: [this.totalBudget, this.totalAmount],
     backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         
     ],
     borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
       
     ],
     borderWidth: 1
 }]
}, 
options: {
 title:{
     text:"Budget Chart",
     display:true
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});
  }

  c1:any=[];
  a1:any=[];

  expenseChart(){
   
    console.log('pie function')
     console.log(this.result);

     for(let i=0; i<this.result.length; i++){
      console.log(this.result[i].category);
      this.c1.push(this.result[i].category);
      this.a1.push(this.result[i].amount);
     }

     console.log(this.c1); console.log(this.c1.length);
     console.log(this.a1); console.log(this.a1.length);

     // pie chart when number of categories = 5
     if(this.c1.length<5){
      // pie chart:
this.PieChart = new Chart('ExpensepieChart', {
 type: 'pie',
data: {
labels: this.c1,
datasets: [{
    label: 'Total Expense',
    data: this.a1,
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
       //  'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
       //  'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
}]
}, 
options: {
title:{
    text:"Bar Chart",
    display:true
},
scales: {
    yAxes: [{
        ticks: {
            beginAtZero:true
        }
    }]
}
}
});
    } else



    // table chart when number of categories > 5
    {
      console.log("categories more than 5");
      // Bar chart:
this.BarChart = new Chart('ExpenseBarChart', {
 type: 'bar',
data: {
labels: this.c1,
datasets: [{
    label: '',
    data: this.a1,
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
}]
}, 
options: {
title:{
    text:"Expense Chart",
    display:true
},
scales: {
    yAxes: [{
        ticks: {
            beginAtZero:true
        }
    }]
}
}
});
    }
  }  

  ngOnDestroy(){
    this.ExpenseSubscription.unsubscribe();
    this.budgetSubscription.unsubscribe();
  }

}
