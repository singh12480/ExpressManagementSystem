Express Management System

Run : 
1. a. connect to the MongoDB database server from backend/aap.js using mongoose library [ "mongodb://localhost:27017/EMS" ]
   b. start the MongoDB server : use command ->mongod
2. start the node serve : 'nodemon server' or 'npm start server' [ nodemon library for live server ]
3. start the angular : 'ng serve'
4. open 'localhost:4200'
	
--------------------

1. firt register and then login. you cannot set the budget and manage the expenses[ the pages are protected by route-gourds ]
  a. after succeeful login , the two pages 'setting' and 'expense' appended in navigation

2. setting Page
 a. Set the budget and later you can update new budget.
 b. set the categories and you can manage categories.

3. Expense Page
   a. here you can manage your expenses by :
      i. add new expense
      ii. edit your expenses or delete [ the category will get deleted from the table but remained in the category-option. ]
      iii. on clicking the Budget chart, will display the Budget and Expense in the chart.
      iv. on clicking the Expense chart, will display category wise expense in the chart. [ if total five categories then display pie chart else bar chart ]

--------------------------------
1. mongoose library used for the connection to the MongoDB server
2. bcrypt and jwt libraries used for authentication
3. chart.js library used for charts