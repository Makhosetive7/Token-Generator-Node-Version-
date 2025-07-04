# Token Generating System(Node Version)

## Author: Makhosetive Sibanda

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Functionality Details](#functionality-details)
- [How to Use With Postman](#how-to-use-with-postman)

---

## Overview

This Node.js (Express & MongoDB) backend system enables the secure generation of energy tokens linked to users' accounts. Tokens can be used for:

- Electricity usage
- Donations
- Local store purchases
- Transfers between users

The app supports advanced logic like scheduled donations, request approvals, and goal savings.

---

## 🌟 Features

- **User Registration and Account Handling**
- **Token Generation**
- **Token Validation and History**
- **Token Transfer Between Users**
- **Token Donation (Education, Health, Food)**
- **Vendor Purchase (e.g., Pick and pay, Edgars and supermed phamarch)**
- \*\*Scheduled Donations with \*\*\`\`
- **Token Request Feature (Approve/Reject)**
- **Goal-Based Savings Wallet**

---

## 🎯 Functionality Details

### Token Generation

- Generates a unique, time-limited token per account.
- Converts paid amount to kilowatts.

### Token Transfer

- Allows user-to-user transfer.
- Deducts from sender, adds to receiver.

### Token Donation

- Converts token value to monetary equivalent.
- Donations go to preset accounts by cause.

### Vendor Purchase

- Similar to donations but targeted at vendors.

### Token Request

- Users request tokens from donors and other users.
- Donors can approve or reject.

### 🔹 Scheduled Donations

- Use cron jobs for recurring donations.

---

## How to Use With Postman

### 📅 Register User

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/auth/register`
- **Body (JSON)**:

```json
{
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com",
    "password": "John@12345",
    "confirmPassword": "John@12345",
    "phoneNumber": "0011558833",
    "homeAddress": "1797 jOHN dOE",
    "role": "tokenBuyer"
}

}
```

### login user

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/auth/login`
- **Body (JSON)**:

```json
{
  {
    "email": "john@gmail.com",
    "password": "John@12345",
}

}
```

### Get user by Id

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/users/userById/:userId`

### Get user by account number

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/users/userByAccountNumber/:accountNumber`

### Generate Token

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/tokens/generateToken`
- **Body (JSON)**:

```json
{
  "accountNumber": "JOH20250703145",
  "amountPaid": 2000
}
```

### Get token by Id

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/tokens/getTokenById/:tokenId`

### Get token by account Number

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/tokens/getTokenByAccountNumber/:accountNumber`

### Get token by date range

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/tokens/getTokenByDateRange/:startDate/endDate`

### Token Transfer

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/tokens/transferToken`

```json
{
  "senderAccountNumber": "JOH20250703145",
  "receiverAccountNumber": "JAS20250701876",
  "amountInKw": 1000.5,
  "note": "early present chief"
}
```

### Make a Donation

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/donations/createDonation`

```json
{
  "sender": "JOH20250703145",
  "donationType": "HEALTH_PROGRAM",
  "amountInKw": 1.5
}
```

### Get donations by Donation Id

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/donations/donationById/:donationId`

### Get donations by account number

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/donations/donationsByAccountNumber/:accountNumber`

### Get donation by donation Type

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/donations/donationType/:donationType`

### Vendor Purchase

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/purchase/vendorPurchase`

```json
{
  "sender": "JOH20250703145",
  "amountInKw": 100.55,
  "vendorType": "PICK_AND_PAY"
}
```

### Get vendor purchase by Id

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/purchase/purchaseById/:purchaseId`

### Get vendor purchase Date range

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/purchase/purchaseByDate/:startDate/:endDate`

### Get vendor by vendor Type

- **Method**: GET
- **Endpoint**: `http://localhost:5000/api/purchase/vendorType/:vendorType`

### Request Tokens

- **Method**: POST
- **Endpoint**: `http://localhost:5000/api/tokens/tokenRequest`

```json
{
  "from": "JOH20250703145", // donor
  "to": "JAS20250701876", // requester
  "amountInKw": 75,
  "purpose": "school fees"
}
```

### Approve Token Request

- **Method**: PATCH
- **Endpoint**: `http://localhost:5000/api/tokens/tokenRequest/:requestId`

---
