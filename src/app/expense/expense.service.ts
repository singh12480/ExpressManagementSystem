import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense.model';
import { Subject } from 'rxjs';

@Injectable()
export class ExpenseService{
    constructor(private http: HttpClient){}

    private expense: Expense[] = [];
    private ExpenseUpdated = new Subject<{expense:Expense[]}>();

    totalAmount = new Subject<number>();

    getExpense(){
        this.http.get<{message:string,expense:Expense[]}>('http://localhost:4000/api/expense')
            .subscribe(data=>{
                this.expense = data.expense;

                this.ExpenseUpdated.next({
                    expense: [...this.expense]
                });

                console.log(this.expense);
                console.log(this.expense.length);
                for(let i = 0; i< this.expense.length; i++){
                    console.log(this.expense[i].amount);
                    // this.totalAmount = this.totalAmount + this.expense[i].amount; 
                    
                }
                console.log("total amount => "+this.totalAmount);
                console.log(data.message);
            });
    }

    getAmount(){

    }

    getExpenseUpdatedListener(){
        return this.ExpenseUpdated.asObservable();
    }

    addExpense(category:string,item:string,amount:number,date:Date){
        const expense: Expense = {id:null,category:category,item:item,amount:amount,date:date};
        console.log('in expense service [add]');
        console.log(expense);

        this.http.post<{message:string}>('http://localhost:4000/api/expense',expense)
        .subscribe(data=>{
            console.log("inside add expense post...")
            console.log(data.message);            
        })
    }

    deleteExpense(id:string){
        this.http.delete<{message:string}>("http://localhost:4000/api/expense/"+id)
            .subscribe(data=>{
                console.log("inside delete service...");
                console.log(data.message);
            })
    }

    getExpenseById(id:string){
       return this.http.get<{message:string,expense:Expense[]}>("http://localhost:4000/api/expense/"+id);
           
    }

    updateExpense(id:string,category:string,item:string,amount:number,date:Date){
        console.log('service update '+id);
        let ExpenseData = {
            _id: id,
            category: category,
            item: item,
            amount: amount,
            date: date
        }

        this.http.put<{message:string}>("http://localhost:4000/api/expense/"+id, ExpenseData)
            .subscribe(data=>{
                console.log("inside update service...");
                console.log(data.message);

            })
    }
}