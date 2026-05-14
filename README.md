# OpenCart Playwright Automation Framework

A scalable End-to-End Test Automation Framework built using Playwright with TypeScript for testing the OpenCart E-Commerce application.

This project demonstrates real-world automation testing practices including:

* Page Object Model (POM)
* Reusable Utilities
* Data-Driven Testing
* API Testing
* Organized Test Architecture

---

# Tech Stack

* Playwright
* TypeScript
* Node.js
* Git & GitHub

---

# Application Under Test

The framework automates the OpenCart E-Commerce application running locally.

⚠️ Before executing the tests, make sure OpenCart is installed and running on your local machine.

### Example Local URL

```bash
http://localhost/opencart/upload/
```

---

# Framework Architecture

The framework follows:

* Page Object Model (POM)
* Reusable Components
* Utility-Based Design
* Modular Test Structure
* End-to-End Business Flow Testing

---

# Project Features

* End-to-End UI Testing
* API Testing
* Page Object Model (POM)
* Custom Utility Methods
* Data-Driven Testing using CSV & JSON
* Random Test Data Generation
* Assertions & Validations
* Organized Page Classes
* Reusable Actions & Business Flows
* HTML Reporting
* Screenshot Capture on Failure
* Video Recording for Test Execution
* Trace Collection for Debugging
* Cross Browser Testing Support
* TypeScript-Based Framework Structure

---

# Test Scenarios Covered

* User Registration
* Login & Logout
* Search Product
* Add Product To Cart
* Shopping Cart Validation
* Checkout Flow
* End-to-End Purchase Scenario
* Invalid Login Validation
* Data-Driven Login Testing

---

# Project Structure

```bash
project-root/
│
├── pages/                # Page Object classes
├── tests/                # Test files
├── testdata/             # Test data files
├── utils/                # Helper & utility methods
├── test-results/         # Test execution results
├── playwright-report/    # HTML reports
├── package.json
└── playwright.config.ts
```

---

# Installation

## Prerequisites

Before running this project, make sure you have the following installed:

* Node.js (LTS recommended)
* npm (comes with Node.js)
* Git

---

## Clone Repository

```bash
git clone https://github.com/AbdulrhmanTalaat/OpenCart-Automation-Framework.git
```

---

## Navigate to Project Directory

```bash
cd OpenCart-Automation-Framework
```

---

## Install Dependencies

This project runs locally and depends on Node modules.

```bash
npm install
```

---

# Run Tests

## Run All Tests

```bash
npx playwright test
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Run Specific Test File

```bash
npx playwright test tests/Login.spec.ts
```

---

## Run Tests on Chromium Browser

```bash
npx playwright test --project=chromium
```

---

# View HTML Report

```bash
npx playwright show-report
```

---

# Concepts Applied

## Page Object Model (POM)

The framework follows the Page Object Model design pattern to improve:

* Code Reusability
* Maintainability
* Readability
* Separation of Concerns

---

## Data-Driven Testing

The framework supports data-driven testing using:

* CSV Files
* JSON Files

---

## Reusable Utilities

Utility classes are used for:

* Random Test Data Generation
* Helper Methods
* DataProvider

---

## Reporting & Debugging

The framework supports:

* HTML Reports
* allure-playwright
* Screenshots on Failure
* Video Recording
* Trace Collection

---

# Sample Test Execution

```bash
Running 12 tests using 1 worker

✓ Login Test
✓ Registration Test
✓ Add To Cart Test
✓ Checkout Test
✓ End-to-End Scenario
```

---

# GitHub Repository

[OpenCart Playwright Automation Framework Repository](https://github.com/AbdulrhmanTalaat/OpenCart-Automation-Framework.git)

---

# Author

## Abdulrhman Talaat

### LinkedIn

[LinkedIn Profile](www.linkedin.com/in/abdulrhman-talaat-68b910238)

---
