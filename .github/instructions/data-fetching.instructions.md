---
description: Read this file to understand how to fetch data in this project.
---
# Data Fetching Instructions
This document provides guidelines on how to fetch data in this project. Follow these instructions to ensure consistency and efficiency in your data fetching methods.

## 1. Use the Server Components for Data Fetching
In this project, ALWAYS use Server Components for data fetching. Server Components allow you to fetch data on the server side, which improves performance and reduces the amount of JavaScript sent to the client. NEVER use Client Components for data fetching, as this can lead to slower performance and increased bundle sizes.

## 2. Data Fetching Methods
ALWAYS usee the helper functions in the /data directory to fetch data. NEVER fetch data directly in your components. This separation of concerns helps maintain a clean codebase and makes it easier to manage data fetching logic.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. Drizzle ORM provides a type-safe and efficient way to interact with the database, ensuring that your data fetching logic is robust and maintainable.