Instructions for Setting Up the Cat Cafe Website
Prerequisites
Install XAMPP:

Download and install XAMPP.

Make sure to install Apache and MySQL during the setup.

Install Node.js:

Download and install Node.js.

This includes npm, which is required to run the Angular frontend.

Install Angular CLI:

Open a terminal or command prompt and run:

```bash
npm install -g @angular/cli
```

Step 1: Set Up the Database
Start XAMPP and ensure Apache and MySQL are running.

Open phpMyAdmin by visiting http://localhost/phpmyadmin in your browser.

Create a new database:

Name: cat_cafe_db

Collation: utf8_general_ci

Import the database schema:

Go to the Import tab in phpMyAdmin.

Upload the database/cat_cafe_db.sql file provided in the project folder.

Click Go to import the database and tables.

Step 2: Set Up the PHP Backend
Copy the backend folder from the project files to the XAMPP htdocs directory:

On Windows: C:\xampp\htdocs

On macOS/Linux: /Applications/XAMPP/htdocs

Rename the backend folder to cat-cafe-website (if not already named).

Verify the backend is working:

Visit http://localhost/cat-cafe-website/api/cats.php in your browser.

You should see a JSON response with cat data.

Step 3: Set Up the Angular Frontend
Open a terminal or command prompt and navigate to the frontend folder in the project files:

```bash
cd path/to/frontend
```
Install dependencies:


```bash
npm install
```
Start the Angular development server:


```bash
ng serve
```
Access the application:

Open your browser and visit http://localhost:4200.

You should see the Cat Cafe Website frontend.

Step 4: Test the Application
Verify the backend:

Visit the following URLs to ensure the API is working:

http://localhost/cat-cafe-website/api/cats.php

http://localhost/cat-cafe-website/api/users.php

http://localhost/cat-cafe-website/api/bookings.php

http://localhost/cat-cafe-website/api/packages.php

Verify the frontend:

Ensure the Angular app is running at http://localhost:4200.

Check that the cat list is displayed and other features are functional.

Troubleshooting
Backend not working:

Ensure Apache and MySQL are running in XAMPP.

Check the config/db.php file for correct database credentials.

Frontend not working:

Ensure you’ve installed all dependencies with npm install.

Check the browser console for errors.

Database connection issues:

Verify the database name, username, and password in config/db.php.

Ensure the cat_cafe_db database and tables are properly imported.

Files Provided
Here’s a list of files and folders included in the project:

Frontend:

Angular project files (frontend/).

Backend:

PHP API files (backend/).

Database:

SQL file for database setup (database/cat_cafe_db.sql).
