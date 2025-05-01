import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Handle login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  // Handle logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Show either the auth page or products page based on login status
  return isLoggedIn ? (
    <ProductsPage onLogout={handleLogout} />
  ) : (
    <AuthPage onLogin={handleLogin} />
  );
}

export default App;