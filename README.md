# Marketplace

### Description
Marketplace is a web platform for selling products, services or personalised home-made products.
It is basically a combination of Amazon, Etsy and Fiverr.

---

### Dependencies
A database based on the Prisma framework needs to run in the background to store and retrieve user, company and product data.

I use a Postgres database in a Docker container.

---

### Installation Guide

To fully install the Marketplace, you need to install two parts.  
The 'marketplace-web' and the 'marketplace-backend', which are two folders inside the main folder (marketplace).

1. Clone the repository: `git clone https://github.com/luca-naujoks/Project-Web.git`.
   
#### marketplace-web
2. Navigate to the marketplace-web folder `cd marketplace-web
3. Install the dependencies: `npm install`.

#### marketplace-backend
2. Navigate to the marketplace-backend folder `cd marketplace-backend
3. Install the dependencies: `npm install`.
   
---

### Marketplace-web

marketplace-web is the web application and the main layer used by users.

To start the web platform, navigate to the marketplace-web folder and run  
`npm run dev`

### Marketplace-backend

marketplace-backend is the server that runs the Marketplace API to interact with the Postgres database.  

To start the backend, navigate to the marketplace-backend folder and run  
`npm run start:dev`

---
