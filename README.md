# ServeRest Cypress Tests

This repository contains automated end-to-end and API tests for the [ServeRest](https://serverest.dev/) application using [Cypress](https://www.cypress.io/).  

## 📋 Project Structure

serveRest/
  cypress/
    e2e/
      api/
        frontend/
    fixtures/
    support/
    consts/
  cypress.config.js
  package.json
  README.md


## Getting Started

### 1. Clone the repository

git clone https://github.com/mariaaliceas/serveRest.git

cd serveRest

### 2. Install dependencies

npm install

### 3. Run tests

npx cypress open

## Test Scenarios
The test suite includes validations such as:

- Admin and regular user login
- Registration and validation of user creation
- API testing for product CRUD
- Validation of error messages and edge cases
- Fixture-based testing for valid/invalid credentials
