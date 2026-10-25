# 🏢 Human Resource Management System (HRMS)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.15-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.6-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-17-orange.svg?logo=openjdk)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg?logo=mysql)](https://www.mysql.com/)
[![Ollama](https://img.shields.io/badge/AI%20ChatBot-Ollama%20(Llama%203)-black.svg)](https://ollama.com/)

A modern, full-stack **Human Resource Management System (HRMS)** built with **Spring Boot 3**, **React 19**, **Tailwind CSS**, and **MySQL**, featuring an integrated **AI HR Assistant** powered by local LLMs via **Ollama (Llama 3)**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Database Configuration](#1-database-configuration)
  - [2. AI Service Setup (Ollama)](#2-ai-service-setup-ollama)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
- [API Reference](#-api-reference)
- [Security & Authentication](#-security--authentication)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The **Human Resource Management System (HRMS)** is designed to streamline day-to-day HR workflows within an organization. It provides HR administrators and team managers with tools to manage employee records, track attendance in real-time, process leave applications, compute payrolls, and offer an interactive AI chatbot for HR-related queries.

---

## 🚀 Key Features

- **🔐 Secure Authentication & Authorization**
  - Stateless JWT (JSON Web Token) authentication.
  - Password hashing via BCrypt.
  - Secure request interception and role-based protection.

- **👥 Employee Management**
  - Create, view, update, and remove employee profiles.
  - Track employee codes, departments, designations, joining dates, salaries, and contact details.

- **⏱️ Attendance Tracking**
  - Daily employee Check-In and Check-Out logging.
  - Automatic working hours computation upon check-out.
  - Comprehensive attendance logs with date and timestamps.

- **📅 Leave Management**
  - Submit leave requests with custom date ranges and reasons.
  - Real-time leave approvals and rejections (`PENDING`, `APPROVED`, `REJECTED`).

- **💰 Payroll Management**
  - Automated salary generation including Basic Salary, Bonus, and Deductions.
  - Automatic computation of Net Salary (`Basic + Bonus - Deductions`).
  - Historical payroll ledger per employee.

- **🤖 AI-Powered HR ChatBot**
  - Integrated with **Ollama** running the **Llama 3** model.
  - Real-time automated assistance for HR policies, employee questions, and general guidance.

- **📊 Modern & Responsive Dashboard**
  - Real-time overview cards displaying key metrics (total workforce, attendance entries, pending leaves, and processed payrolls).
  - Clean UI designed with Tailwind CSS and React Icons.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4 & Bootstrap
- **Icons:** React Icons (`fa` / FontAwesome)
- **HTTP Client:** Axios (configured with request interceptors for JWT bearer tokens)

### Backend
- **Framework:** Spring Boot 3.5.15
- **Language:** Java 17
- **Security:** Spring Security 6 & JJWT (0.12.5)
- **Persistence:** Spring Data JPA (Hibernate)
- **Database:** MySQL
- **Validation & Utilities:** Spring Boot Starter Validation, Lombok

### AI / LLM
- **Inference Engine:** [Ollama](https://ollama.com/)
- **Model:** `llama3`
- **Integration:** Spring `RestTemplate` communicating via Ollama's local REST API (`/api/generate`)

---

## 📂 Project Structure

```plaintext
Human-Resource-Management-System/
├── BackEnd/
│   └── hrms/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/example/hrms/
│       │   │   │   ├── config/          # SecurityConfig, CorsConfig
│       │   │   │   ├── controller/      # REST API Controllers (Auth, Employee, Attendance, Leave, Payroll, Chat)
│       │   │   │   ├── dto/             # Request & Response Transfer Objects
│       │   │   │   ├── entity/          # JPA Entities (Employee, Attendance, Leave, Payroll)
│       │   │   │   ├── repository/      # Spring Data Repositories
│       │   │   │   ├── security/        # JwtUtil, JwtAuthenticationFilter, CustomUserDetailsService
│       │   │   │   ├── service/         # Core Services & LLMService
│       │   │   │   └── HrmsApplication.java
│       │   │   └── resources/
│       │   │       └── application.properties # Server & DB Configurations
│       │   └── test/
│       ├── pom.xml                      # Maven Dependencies & Build Configuration
│       ├── mvnw / mvnw.cmd              # Maven Wrappers
├── frontEnd/
│   └── hrmsfrontend/
│       ├── src/
│       │   ├── components/              # Reusable UI (Sidebar, Navbar)
│       │   ├── pages/                   # Login, Dashboard, Employees, Attendance, Leaves, Payroll, ChatBot
│       │   ├── services/                # Axios API Client (api.js)
│       │   ├── App.jsx                  # Application Routes
│       │   ├── main.jsx                 # Vite Entrypoint
│       │   └── index.css                # Global Styles & Tailwind Directives
│       ├── package.json                 # Node Dependencies & Scripts
│       ├── vite.config.js               # Vite Configuration
│       └── eslint.config.js             # ESLint Configuration
└── README.md
```

---

## 📋 Prerequisites

Ensure you have the following installed on your development machine:

- **Java Development Kit (JDK):** Version 17 or higher
- **Maven:** 3.8+ (or use the included `./mvnw` / `mvnw.cmd` wrapper)
- **Node.js:** Version 18.x or 20.x+
- **npm:** 9.x+ (comes bundled with Node.js)
- **MySQL Database Server:** 8.0+
- **Ollama:** (Optional, required for AI ChatBot) [Download Ollama](https://ollama.com/)

---

## ⚡ Getting Started

### 1. Database Configuration

1. Start your local MySQL service.
2. Create a database named `hrms`:
   ```sql
   CREATE DATABASE hrms;
   ```
3. Open `BackEnd/hrms/src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hrms
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   server.port=8080

   jwt.secret=ThisIsVeryLongSecretKeyForHrmsApplication123456
   jwt.expiration=86400000
   ```

---

### 2. AI Service Setup (Ollama)

To enable the AI ChatBot module:

1. Install [Ollama](https://ollama.com/).
2. Pull and start the `llama3` model:
   ```bash
   ollama run llama3
   ```
3. Ollama will run locally at `http://localhost:11434`.

---

### 3. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd BackEnd/hrms
   ```
2. Build and run the Spring Boot application:
   ```bash
   # On Windows
   mvnw.cmd spring-boot:run

   # On Linux / macOS
   ./mvnw spring-boot:run
   ```
3. The backend server will start on `http://localhost:8080`.

---

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontEnd/hrmsfrontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web interface at:
   ```
   http://localhost:5173
   ```

---

## 📡 API Reference

### 🔑 Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/login` | Authenticate with email & password, returns JWT token | ❌ No |

### 👥 Employees (`/employees`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/employees` | Retrieve all employees | ✅ Yes |
| `GET` | `/employees/{id}` | Get employee by ID | ✅ Yes |
| `POST` | `/employees` | Register a new employee | ✅ Yes |
| `PUT` | `/employees/{id}` | Update existing employee details | ✅ Yes |
| `DELETE` | `/employees/{id}` | Delete an employee by ID | ✅ Yes |

### ⏱️ Attendance (`/attendance`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/attendance/checkin` | Check in an employee | ✅ Yes |
| `POST` | `/attendance/checkout` | Check out an employee & compute hours | ✅ Yes |
| `GET` | `/attendance` | Retrieve all attendance logs | ✅ Yes |
| `GET` | `/attendance/{id}` | Retrieve attendance details by ID | ✅ Yes |

### 📅 Leaves (`/leaves`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/leaves` | Retrieve all leave applications | ✅ Yes |
| `GET` | `/leaves/{id}` | Get leave application by ID | ✅ Yes |
| `POST` | `/leaves` | Apply for a leave | ✅ Yes |
| `PUT` | `/leaves/approve/{id}` | Approve leave application | ✅ Yes |
| `PUT` | `/leaves/reject/{id}` | Reject leave application | ✅ Yes |

### 💰 Payroll (`/payroll`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/payroll` | Retrieve all payroll records | ✅ Yes |
| `GET` | `/payroll/{id}` | Get payroll record by ID | ✅ Yes |
| `POST` | `/payroll` | Generate payroll for an employee | ✅ Yes |

### 🤖 AI HR Assistant (`/chat`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/chat` | Submit question to LLM (Ollama) | ✅ Yes |

---

## 🔒 Security & Authentication

- The application uses **Spring Security 6** with a stateless session policy (`SessionCreationPolicy.STATELESS`).
- Upon successful login, the client receives a JWT signed with HMAC-SHA256.
- The React frontend stores the token in `localStorage` and automatically attaches it via an Axios interceptor:
  ```javascript
  Authorization: Bearer <jwt_token>
  ```
- Public routes: `/auth/**`
- All business endpoints require a valid JWT token.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
