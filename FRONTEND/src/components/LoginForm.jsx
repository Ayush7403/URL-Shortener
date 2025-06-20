import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice";
import { loginUser } from "../api/user.api";
import { useNavigate } from "@tanstack/react-router";
import Input from "./ui/Input";
import Button from "./ui/Button";
import ErrorBox from "./ui/ErrorBox";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        Sign In
      </h2>

      {error && <ErrorBox message={error} />}

      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <span
          onClick={() => state(false)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
