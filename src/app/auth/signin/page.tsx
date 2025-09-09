'use client'

import { useState } from "react";
import Link from "next/link";
import { Routes, Pages } from "@/constants/enums";
import { signIn } from "next-auth/react";
import { Eye, EyeClosed } from "lucide-react";

export default function SignInPage() {

  const [state, setState] = useState({ showPassword: false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showPassword } = state;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleClickShowPassword = () =>
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        // Handle different types of NextAuth errors
        let errorMessage = "Sign in failed";
        if (result.error === "CredentialsSignin") {
          errorMessage = "Invalid email or password";
        } else if (result.error.includes("Invalid email or password")) {
          errorMessage = "Invalid email or password";
        } else {
          errorMessage = result.error;
        }
        setError(errorMessage);
        console.log("Sign-in error:", result.error);
      } else if (result?.ok) {
        // Redirect to home page after successful login
        window.location.href = "/";
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Signin error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="p-8 element-center">
      <div className="container mx-auto max-w-xl">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="relative flex  items-center">
              <label htmlFor="password" className="text-sm font-medium absolute left-0 -top-5">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your password"
                required
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className={`absolute right-3 cursor-pointer ${formData.password ? '' : 'hidden'}`}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4" />
                )}
              </button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                href={`/${Routes.AUTH}/${Pages.Register}`}
                className="text-primary hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
