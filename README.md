Paws of Beirut 🐾
Paws of Beirut is a single-page web application (SPA) built with React. It serves as a fictional platform for a pet adoption agency, allowing users to browse available pets, filter them by specific criteria, and submit adoption applications.

Project Overview
This application provides a complete front-end experience for a pet adoption service. It features user authentication (simulated with browser storage), a dynamic pet browsing and filtering system, and protected routes for actions like applying for adoption.

✨ Features
User Authentication: Users can create an account and log in. The system uses localStorage to store user accounts and sessionStorage to manage active login sessions.

Pet Browsing & Filtering: A comprehensive gallery page where users can view all available pets.

Search & Filter: Users can search for pets by name and apply filters for species (Dog, Cat) and size (Small, Medium, Large).

Detailed Pet View: Clicking a pet reveals a detailed page with its name, species, description, age, gender, adoption fee, and personality traits.

Protected Adoption Form: Only logged-in users can access the adoption application form, which is pre-filled with their information.

Static Pages: Includes an "About Us" page detailing the organization's mission and a "Contact" form.

📸 Screenshots
1. Home Page
 ![image alt](https://github.com/elghazzirania-cloud/pet-adoption-frontend-or-csci426-pawfinder/blob/f4d9cb732dc01c0c612a213de03da2407dcded6d/home%20page.png)

2. Browse Pets Page (with Filters)
  ![image alt](https://github.com/elghazzirania-cloud/pet-adoption-frontend-or-csci426-pawfinder/blob/fcc522990f4488934a62c8a705bf07176a61b816/BrowsePets%20page.png)

3. Pet Details Page
    ![image alt](https://github.com/elghazzirania-cloud/pet-adoption-frontend-or-csci426-pawfinder/blob/f20625db13ca4bcd83bd5fa002b08362406666be/PetDetail%20page.png)

7. Login & Signup Pages
 ![image alt](https://github.com/elghazzirania-cloud/pet-adoption-frontend-or-csci426-pawfinder/blob/d96a77f0458ed990ad5320d1143c736064947b34/Login%20page.png)
    
   ![image alt]()
11. Adoption Form (Protected)
12.  ![image alt]()
13. About Us Page
14.  ![image alt]()
    ![image alt]()
13.Contact Page
 ![image alt]()
14.Footer
 ![image alt](https://github.com/elghazzirania-cloud/pet-adoption-frontend-or-csci426-pawfinder/blob/c6366a14377992feccb05e1522a3fcd951c72530/Footer.png)


🛠️ Technologies Used
React: The core JavaScript library used for building the user interface.

React Router (react-router-dom): Used for client-side routing and navigation.

React Hooks: (useState, useEffect) for state management and side effects.

Lucide React: A library providing lightweight SVG icons.

Custom CSS: All styling is handled with custom CSS files using Flexbox and Grid.

Browser Storage: localStorage and sessionStorage to simulate auth and session.

🚀 Deployment
This application is deployed live on Vercel / Netlify.

Live Link: [Your Deployment URL Here]

🏁 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
You must have Node.js (which includes npm) installed on your computer.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/paws-of-beirut.git
Navigate to the project directory:

Bash

cd paws-of-beirut
Install dependencies:

Bash

npm install
Run the application:

Bash

npm start
This will run the app in development mode. Open http://localhost:3000 to view it in your browser.

