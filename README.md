# SmartWDS - Warehouse Management System (Backend)

SmartWDS is a professional Warehouse Management System (WMS) built with **Node.js, Express, and MongoDB Atlas**. It features a production-grade architecture designed to handle inventory, warehouse hierarchy, and real-time stock movements with a secure audit trail.

## 🚀 Key Features

- **Authentication & Authorization**: Secure JWT-based login with role-based access control (SuperAdmin, WarehouseManager, Operator, DispatchManager).
- **Warehouse Hierarchy**: Full structure management (Warehouse → Zone → Aisle → Rack → Bin).
- **Inventory Engine**: Manage products with unique SKU, categories, and real-time stock tracking.
- **Inbound Module**: Goods Received Note (GRN) creation with automatic stock and bin occupancy updates.
- **Outbound Module**: Sales Order management with **Atomic Transactions (Sessions)** to prevent negative stock and ensure data integrity.
- **Inventory Ledger**: Automatic audit system logging every stock movement (IN/OUT) with quantity before/after, user ID, and reference ID.
- **Security**: Implemented Helmet, CORS, Rate Limiting, and a Centralized Error Handler.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Replica Set enabled)
- **Validation**: Joi
- **Security**: Bcrypt.js, JWT, Helmet

---

## 🏗️ Project Architecture

The project follows a **Clean Architecture (MVC - Service Layer)** pattern:
- **Routes**: Defines the API endpoints.
- **Controllers**: Handles HTTP requests/responses and input validation.
- **Services**: Contains the core business logic and DB transactions.
- **Models**: Defines the database schemas.
- **Middlewares**: Handles security, authentication, and errors.