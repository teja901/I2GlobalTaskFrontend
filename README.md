# My React Vite App

This is a **React application built with Vite**, designed for managing notes. It includes authentication, user profiles, and client-side routing.

---

## Features

- User authentication (Sign In / Sign Up)
- Protected routes for authenticated users
- Profile page with user details
- Notes management (add, view, delete)
- Responsive and modern UI
- Built with React, Vite, Tailwind CSS, and Zustand for state management ,and Framer Motion

---

## Frontend Routing

- All navigation between pages is handled by React Router `<Routes>` and `<Route>` components.
- Example routes:
  - `/` → Home page (list of notes)
  - `/notes/add` → Add note page
  - `/profile` → User profile page
  - `/signin` → Sign in page
  - `/signup` → Sign up page
- **Protected routes**: Certain pages (like Home, Profile, Add Note) require the user to be authenticated. Users are redirected to `/signin` if not logged in.

### Important Note for Deployment

When deploying the app (e.g., Netlify, Vercel, Render):

- The app uses **client-side routing**, so all paths must serve the `index.html` file.
- For Netlify:
  - Add a `_redirects` file in your `public/` folder with the following content:

    ```
    /*    /index.html   200
    ```

  - This ensures manual navigation (e.g., typing `/profile` in the browser) works correctly after deployment.
- For other platforms, configure routing rules similarly so that all paths return `index.html`.

---

## Environment Variables

The app uses a `.env` file for environment variables. Example:


<img width="1366" height="638" alt="Screenshot6" src="https://github.com/user-attachments/assets/9dae2ced-2057-4258-840f-6b4b5a0d5a1b" />

<img width="1366" height="633" alt="Screenshot1" src="https://github.com/user-attachments/assets/3cfd1e2b-2b63-40e0-92f8-39a7016f4641" />




