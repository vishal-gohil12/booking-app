# Tour Package Management System

## Project Description

The Tour Package Management System is a web application built with Next.js that allows administrators to create and manage tour packages. Users can browse available packages, filter by price and destination, and book tours through the user interface.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repository-url.git
   cd tour-package-management-system

   ```

2. **Install Dependencies:**
  ```bash
    yarn
   ```

3. **Configure Environment Variables: Create a .env.local file in the root folder with the following:**
  ```bash
    DATABASE_URL=""
    API_KEY=""
    API_SECRET=""
    CLOUD_NAME=""
  ```

4. **Run the Application:**
   ```bash
    yarn dev
   ```

## Implemented Features
- Admin Panel:
   Create Tour Packages with details like title, description, price, available dates, and image upload.
   Form validation and error handling.

## User Interface: 
- Browse available tour packages.
- Filter packages by price and destination.
- View detailed package information.
- Book packages through a seamless form.
