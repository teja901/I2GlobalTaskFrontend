import React, { useEffect } from "react";
import AppRouter from "./routes/AppRoutes"; 

import { useAuthStore } from "./context/authStore";

function App() {
  
  const initAuth = useAuthStore((s) => s.initAuth);

useEffect(() => {
  initAuth();
}, []);

  return <AppRouter />;
}

export default App;
