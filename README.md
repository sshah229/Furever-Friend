# 🐶 Dog Adoption App

Live App: https://furever-friend-navy.vercel.app/ 

Welcome to the **Furever Friend**—your one-stop shop for finding your new best friend! Whether you’re a dog-lover or just here to browse, this site makes it easy and fun to search through shelter dogs and match with your perfect canine companion.

---

## 🎯 Purpose

This app was built to help dog enthusiasts:

- **Discover** available shelter dogs by breed.  
- **Filter** and **sort** results to find the ideal pup.  
- **Favorite** dogs and generate a personalized match.  
- **Connect** with shelters (via API) to facilitate adoptions.

It’s designed to be simple, responsive, and—most importantly—adorable! 🐾

---

## 🚀 Technologies Used

- **Frontend**: React + Vite + TypeScript  
- **UI Library**: Chakra UI (for beautiful, accessible components)  
- **HTTP Client**: Axios (with automatic cookie handling)  
- **Routing**: React Router v6  
- **Deployment**: Vercel
- **Version Control**: Git + GitHub  

---

## 🔧 Key Functionalities

1. **Authentication**  
   - Users log in with just a name and email.  
   - Secure session via an HttpOnly auth cookie.

2. **Dog Searching & Browsing**  
   - **Filter by breed** with a dropdown.  
   - **Pagination**: loads 12 dogs at a time, with a “Load More” button.  
   - **Sorting**: toggle A→Z or Z→A by breed.

3. **Dog Details**  
   - Each **Dog Card** shows: image, name, breed, age, ZIP code.

4. **Favorites & Matching**  
   - Click **Favorite** to bookmark dogs you love.  
   - Open the **Favorites Drawer** to review favorites.  
   - Click **Find My Match** to get a special pick from your favorites.

5. **Logout**  
   - End your session with the click of a button.

---

## 📦 Installation & Local Run

1. **Clone the repo**  
   ```bash
   git clone https://github.com/sshah229/Furever-Friend.git
   cd dog-adoption

2. **Install dependencies**  
   ```bash
   npm install

3. **Start in development mode**  
   ```bash
   npm run dev

4. **Open your browser**  at http://localhost:5173 to start exploring!
