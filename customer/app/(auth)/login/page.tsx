"use client";

import Link from "next/link";
import { useState,useContext } from "react";
import {StoreContext} from "../../../context/authContext"
import {toast} from "sonner"
import {useRouter} from "next/navigation";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const {url,setToken,setUser}=useContext(StoreContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const apiUrl = url;

    if (!apiUrl) {
      throw new Error(
        "Sign-in is not configured yet. Please contact the administrator."
      );
    }

    const response = await fetch(`${apiUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      // credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    toast.success(data.message);
    setUser(data.data)
    setToken(data.token);

    localStorage.setItem("token", data.token);

    router.push("/shop");
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="bg-slate-50 py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto w-full max-w-sm">

          {/* Heading */}

          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue shopping.
            </p>

          </div>

          {/* Login Form */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition-all focus:border-[#0A5EB0] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition-all focus:border-[#0A5EB0] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-11 w-full rounded-lg bg-[#0A5EB0] text-sm font-semibold text-white transition-all hover:bg-[#084B92] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#0A5EB0] hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
