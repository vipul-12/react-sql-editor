# About SQL-EDITOR
This project follows a client-server model, utilizing ReactJS for the frontend and NodeJS for the backend. SQLite3 serves as the database due to its portability and ease of use, making it ideal for simple projects like this.

## Installation Instructions
1) Open terminal/command promts in both the "client" and "server" directories.
2) Run `npm install` respectively.

## Running the project locally

1) To run the react application, open up a terminal/command prompt inside the client folder and run the command `npm run start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2) To start the backend server (NodeJS Express APP), open up a terminal/command prompt inside the server folder and run the command `nodemon`. This will keep the server running continuosly.

## Future Scope/ Scaling Options

1) One potential enhancement is to introduce the ability to use multiple databases simultaneously, a feature not currently available. This complexity arises particularly when using SQLite3. To address this, we are considering implementing a dedicated MySQL server and creating an API route within the Express app. This route would enable users to interact with and select from different databases, enhancing the application's flexibility and scalability.

2) To enhance the scalability of the application, hosting it on a cloud service provider is a practical solution. This approach eliminates the need to manage dedicated machines for hosting and maintenance, streamlining the operational aspects of the application.

### Interacting with the Database

* The database is already populated with two tables - employee and department.
* The employee table has ten records while the department table has two.
* The table descriptions are available on the left sidebar.
* For all the DQL statements that are entered, you will either get a result table or an error.
* All the DML/DDL statements will output the appropriate success/ failure messages.