# Full-Stack Authentication Project

This is a complete Full-Stack web application that provides a very secure login and registration system. It has a beautiful, modern frontend and a strong, secure backend database.

---

## 🌟 Bonus Features Added Today

We have successfully added advanced bonus features to make this project production-ready!

### 1. Role-Based Login (Admin/User)
* **What it is:** When a new user registers, they can click a checkbox to register as an **Admin** or a regular **User**.
* **How it works:** The backend securely saves this role in the MySQL database. When you log in, the Dashboard detects your role and explicitly shows "Admin Dashboard" or "User Dashboard".

### 2. Email Verification (Using Local Server OTP)
* **What it is:** Instead of letting anyone log in immediately, the app requires users to verify their email first with a 6-digit OTP (One Time Password).
* **How it works:** Because we don't have a real SMTP email server for this college assignment, we simulate the email. When you register, the backend prints the OTP in your `dotnet run` console securely, and the frontend popup also shows it! You MUST enter this OTP to verify your account before you can log in.

### 3. Forgot Password & Reset Password
* **What it is:** If a user forgets their password, they can reset it securely.
* **How it works:** You click "Forgot password?" on the login page and enter your registered email. The backend generates a new 6-digit OTP. Then, you enter that OTP and your "New Password" on the Reset Password page. The backend checks everything and updates your password securely using BCrypt hashing!

---

## 🛠️ Tech Stack Explained (What did we use?)

Here is a simple breakdown of all the technologies used and why we chose them:

### Frontend (What the user sees)
* **React.js & Vite:** We used React to build the user interface because it's fast and easy. Vite is used to build the React app incredibly fast.
* **React Router DOM:** This allows the user to switch between different pages (like `/login`, `/register`, or `/forgot-password`) without refreshing the web browser.
* **Custom CSS:** We used a "Premium Dark Theme" to make the UI look like a modern, professional masterpiece.
* **Axios:** This is a tool we used to make HTTP requests (sending data) from the frontend to the backend easily.

### Backend (The server and brain)
* **ASP.NET Core Web API (C#):** We used .NET to build the backend server. It handles incoming requests, checks passwords, and talks to the database.
* **Entity Framework (EF) Core:** This is our ORM. Instead of writing raw SQL queries, EF Core allows us to write C# code to save and read our tables in the database automatically.
* **MySQL:** This is our Database. It stores all the user information like Names, Emails, OTPs, Roles, and Password Hashes.
* **BCrypt:** We used this for Security. We *never* save plain passwords in the database. BCrypt hashes the password into a totally unreadable format so hackers can't steal it.
* **JWT (JSON Web Tokens):** We used JWT for Authentication. When a user logs in successfully, the backend creates a secret "Token" (like a digital VIP pass) containing their Role. The frontend uses this token to access protected pages like the Dashboard.

---

## 🚀 Setup Steps (How to run it)

Follow these simple steps to run the application on your own computer.

### 1. Database Setup
1. Make sure you have **MySQL** installed and running on your computer.
2. In the `backend/appsettings.json` file, make sure the `ConnectionStrings` matches your MySQL username and password (currently set to `root` and `Satish@123`).
3. You don't need to manually create the database! When you start the backend, it will automatically create the `assignment` database and the `Users` table inside it with all the correct Role and OTP columns.

> 💡 **Troubleshooting Tip:** If you fail to register a new user or get a connection error, please check your MySQL! Make sure your MySQL server is turned on, and verify that the Port, Password, Username, and Database Name in your `appsettings.json` exactly matches your local setup.

### 2. Run the Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Build and run the .NET server:
   ```bash
   dotnet run
   ```
3. The backend will start running on `http://localhost:5000`. Keep this running!

### 3. Run the Frontend
1. Open a **new** terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the necessary Node packages (if you haven't already):
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`. You will see the beautiful Login page!

---

## 🔌 API Endpoints

The backend exposes these URLs for the frontend to communicate with:

### Authentication (`/api/auth`)
* **POST `/api/auth/register`**: Takes Name, Email, Password, and Role. Hashes password, saves it, and generates a Verification OTP.
* **POST `/api/auth/verify-email`**: Verifies the 6-digit OTP so the user can finally log in safely.
* **POST `/api/auth/login`**: Checks email and password. Generates and returns a **JWT Token**.
* **POST `/api/auth/forgot-password`**: Generates a Reset Password OTP for your email.
* **POST `/api/auth/reset-password`**: Validates the OTP and permanently saves the new hashed password.

### User Protected Routes (`/api/user`)
* **GET `/api/user/profile`**: Requires the exact JWT Token in the request headers. If valid, it returns the logged-in user's profile and Role data for the Dashboard.
