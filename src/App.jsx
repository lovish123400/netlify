
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import Dashboard from "./context/Dashboard";

function MainContext() {
  const { currentUser } = useAuth();

  return (
    <main>
      {currentUser ? <Dashboard /> : <AuthForm />}
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainContext />
    </AuthProvider>
  );
}

export default App;
