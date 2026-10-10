# Campus Finds – Lost & Found Portal

## About the Project
Campus Finds is a web-based Lost and Found portal designed to help students report, search for, and recover lost belongings within their campus.

## Features
- Student registration and login
- Report lost items
- Report found items
- Search for reported items
- Submit claims for items
- Admin approval and rejection of claims
- Admin management of users and items
- Similarity-based matching of lost and found items

## Technologies Used
- **Frontend:** React.js, Vite, CSS
- **Backend:** Java, Spring Boot, REST API
- **Database:** MySQL
- **Version Control:** Git and GitHub

## Project Structure
- `frontend/` – React user interface
- `backend/` – Spring Boot backend application

## How to Run the Project

### Backend
1. Install Java 21 and MySQL.
2. Create a MySQL database named `lostfound`.
3. Configure the database username and password in the backend environment.
4. Open a terminal in the Spring Boot project folder.
5. Set the database password environment variable in PowerShell:

   ```powershell
   $env:DB_PASSWORD = "your_mysql_password"
   ```

6. Run the backend:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

### Frontend
1. Install Node.js.
2. Open a terminal in the `frontend` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Matching Feature
The application uses text-similarity techniques to identify potential matches between lost and found item reports.

## Future Enhancements
- Deploy the application online
- Improve item matching
- Add notifications for potential matches

## Author
Student Project – Campus Finds: Lost & Found Portal
