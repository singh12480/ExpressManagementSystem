import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Budget } from './budget.model';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()

export class DataService{

    private category: Category[] = [];
    private categoryUpdated = new Subject<{category:Category[]}>();

    private budget: Budget[] = [];
    private budgetUpdated = new Subject<{budget:Budget[]}>();


    constructor(private http: HttpClient){}

    getCategory(){
        this.http.get<{message:string,category:Category[]}>('http://localhost:4000/api/category')
            .subscribe(data=>{
                this.category = data.category;
                this.categoryUpdated.next({
                    category: [...this.category]
                })
                console.log(this.category);
                console.log(data.message);
            });
    }

    getCategoryUpdatedListener(){
        return this.categoryUpdated.asObservable();
    }

    addCategory(data:any){
       
        const category: Category = {id:null,name:data};
        console.log("in service...");
        console.log(category);
        this.http.post<{message:string}>('http://localhost:4000/api/category',category)
            .subscribe(data=>{
                console.log("inside add category post...")
                console.log(data.message);
                
            })
            
            this.category.push(...data);
            this.categoryUpdated.next();
    }


    getBudgetUpdatedListener(){
        return this.budgetUpdated.asObservable();
    }


    getBudget(){
        this.http.get<{message:string,budget:Budget[]}>('http://localhost:4000/api/budget')
            .subscribe(data=>{
                this.budget = data.budget;
                this.budgetUpdated.next({
                    budget: [...this.budget]
                })
                console.log(this.budget);
                console.log(data.message);
            });
    }

    addBudget(data:any){
        
        const budget: Budget = {id:null,value:data};
        console.log("in addBudget service...");
        console.log(budget);
        this.http.post<{message:string}>('http://localhost:4000/api/budget',budget)
            .subscribe(data=>{
                console.log("inside add budget post...")
                console.log(data.message);
            });
            this.budget.push(...data);
            this.budgetUpdated.next();
            
    }

    deleteCategory(id:string){
        this.http.delete<{message:string}>("http://localhost:4000/api/category/"+id)
            .subscribe(data=>{
                console.log("inside category delete service...");
                console.log(data.message);
            })
    }
}