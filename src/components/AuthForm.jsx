import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const { signup, login, loginWithGoogle } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (isRegistering) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    setError("");

    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>

      <p>
        {isRegistering
          ? "Sign up to get started"
          : "Log in to continue"}
      </p>

      {error && <p>{error}</p>}

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={submitting}
      >
        Sign in with Google
      </button>

      <p>or continue with email</p>

      <form onSubmit={handleSubmit}>
        <label>Email Address</label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@example.com"
        />

        <label>Password</label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Processing..."
            : isRegistering
            ? "Sign Up"
            : "Log In"}
        </button>
      </form>

      <p>
        {isRegistering
          ? "Already have an account?"
          : "Don't have an account?"}
      </p>

      <button
        type="button"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError("");
        }}
      >
        {isRegistering ? "Log In" : "Sign Up"}
      </button>
    </div>
  );
}
