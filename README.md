# Project Setup Guide

This repository contains both frontend and backend code with MySQL database support. Follow these instructions to set up the full application locally.

## Prerequisites

- Node.js (v16 required for backend)
- npm (comes with Node.js)
- nvm (Node Version Manager - recommended)
- MySQL Server installed locally
- Two terminal windows (one for backend, one for frontend)

## Quick Start

**Database Setup**:

1. Ensure MySQL is running on your local machine
2. Create database and tables (run in MySQL shell or use MySQL Workbench):

```sql
CREATE DATABASE payroll;
USE payroll;

-- Employee table
CREATE TABLE `employee` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_hired` date NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Groups table
CREATE TABLE `group` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_group_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Option table
CREATE TABLE `option` (
  `id` varchar(36) NOT NULL,
  `code_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `group_id` varchar(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_option_code_group` (`code_id`,`group_id`),
  KEY `fk_option_group_idx` (`group_id`),
  CONSTRAINT `fk_option_group` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

**Backend Setup**:

1. Navigate to backend folder

```bash
cd ./backend
```

2. Set Node.js version to 16 (required):

```bash
nvm use 16
```

If you don't have Node 16 installed:

```bash
nvm install 16
nvm use 16
```

3. Install dependencies:

```bash
npm install
```

4. Create .env at the root of backend folder

```bash
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<your-password>
DB_NAME=payroll
```

5. Start the server:

```bash
nodemon bin/www
```

Runs on: http://localhost:3000

**Frontend Setup**:
1.In a new terminal, navigate to frontend folder:

```bash
cd ./frontend
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
```

3. Start development server:

```bash
npm run dev
```

Runs on: http://localhost:3001
