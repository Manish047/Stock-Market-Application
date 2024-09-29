# Project Guide

## Description
A portfolio tracking API that allows users to manage their trades by adding, deleting, and updating them, while performing basic return calculations.

The portfolio serves as a collection of stocks, each associated with multiple trades (buy/sell). Each trade is linked to one stock and includes details such as quantity and date.

**Technical Features**
* JSON Web Tokens
* Role Based Access Control (RBAC)
* API Validations
* Security (Encrypted Passwords)

##  Steps to Run the Project
Install Dependencies
Run the following command to install the necessary packages:
`npm install`

## Create Environment File
Ensure that a .env file exists in the root directory. This file should contain all the required environment variables for your application. Simply rename `sample.env` to `.env`.

## Setup Database
Initialize the database for the first time by running:
`npm run setup`
This command will create user roles and two users:

### Broker:
    Email: broker@app.com
    Password: broker@123
### Investor:
    Email: investor@app.com
    Password: investor@123

## Configure User Roles
Open MongoDB Compass and navigate to the `userroles` collection. Copy the `_id` of the roles you just created and paste it into the `app/constants/user-roles.ts` file. These roles are use throughout the application for **Role Based Access Control (RBAC)** mechanism.

## Start the Application
Finally, run the following command to start the application:
`npm start`