# Full-Stack Authentication Project

This is a complete Full-Stack web application that provides a secure login and registration system. It has a beautiful, modern frontend and a strong, secure backend database.

---

## 🛠️ Tech Stack Explained (What did we use?)

Here is a simple breakdown of all the technologies used and why we chose them:

### Frontend (What the user sees)
* **React.js & Vite:** We used React to build the user interface because it's fast and easy to make components. Vite is used to run and build the React app incredibly fast.
* **React Router DOM:** This allows the user to switch between different pages (like from `/login` to `/register` or `/dashboard`) without refreshing the web browser.
* **Custom CSS:** We used custom CSS with a "Premium Dark Theme" (Glassmorphism) to make the UI look like a modern, professional masterpiece.
* **Axios:** This is a tool we used to make HTTP requests (sending data) from the frontend to the backend easily.

### Backend (The server and brain)
* **ASP.NET Core Web API (C#):** We used .NET to build the backend server. It handles incoming requests, checks passwords, and talks to the database.
* **Entity Framework (EF) Core:** This is our ORM (Object-Relational Mapper). Instead of writing raw SQL queries, EF Core allows us to write C# code to save, read, and create tables in our database automatically.
* **MySQL:** This is our Database. It stores all the user information like Names, Emails, and Password Hashes.
* **BCrypt:** We used this for Security. We *never* save plain-text passwords in the database. BCrypt hashes the password into a totally unreadable format so hackers can't steal it.
* **JWT (JSON Web Tokens):** We used JWT for Authentication. When a user logs in successfully, the backend creates a secret "Token" (like a digital VIP pass) and gives it to the frontend. The frontend sends this token back every time it wants to access a protected page (like the Dashboard).

---

## 🚀 Setup Steps (How to run it)

Follow these simple steps to run the application on your own computer.

### 1. Database Setup
1. Make sure you have **MySQL** installed and running on your computer.
2. In the `backend/appsettings.json` file, make sure the `ConnectionStrings` matches your MySQL username and password (currently set to `root` and `Satish@123`).
3. You don't need to manually create the database! When you start the backend, it will automatically create the `assignment` database and the `Users` table for you.

### 2. Run the Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Build and run the .NET server:
   ```bash
   dotnet run
   ```
3. The backend will start running on `http://localhost:5000`.

### 3. Run the Frontend
1. Open a **new** terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the necessary packages (if you haven't already):
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`. You will see the Login page!

---

## 🔌 API Endpoints

The backend exposes these URLs for the frontend to communicate with:

### Authentication (`/api/auth`)
* **POST `/api/auth/register`**
  * **What it does:** Takes the user's Name, Email, and Password, hashes the password using BCrypt, and saves the new user into the MySQL database.
* **POST `/api/auth/login`**
  * **What it does:** Checks if the email exists and if the password matches the hash. If correct, it generates and returns a **JWT Token** and user details.

### User Protected Routes (`/api/user`)
* **GET `/api/user/profile`**
  * **What it does:** This is a *protected* route. It requires the frontend to send the exact JWT Token in the request headers. If the token is valid, it returns the logged-in user's profile data for the Dashboard.

---

**Summary of the Flow:**
User enters details -> Frontend sends POST request -> Backend checks DB and Hashes -> If good, Backend sends JWT Token -> Frontend saves Token -> Frontend uses Token to get Profile data -> User sees Dashboard!
Here is my Pages
<img width="1152" height="1083" alt="image" src="https://github.com/user-attachments/assets/da9db563-898c-4f62-b00f-7ed49e2679e0" />
<img width="1114" height="968" alt="image" src="https://github.com/user-attachments/assets/15873144-5b2e-48eb-90b4-d7077614cb5b" />
<img width="963" height="1035" alt="image" src="https://github.com/user-attachments/assets/d9ab9bdd-486e-4baf-be21-edb50428a562" />

