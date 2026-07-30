import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = '/api/user/login';

      const response = await axios.post(`${baseUrl}${endpoint}`, {
        ...data,
        role: 'restaurant',
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Logged in successfully!');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/list');
        setShowLogin(false);
      } else {
        toast.error(response.data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-8 border border-orange-100">
        
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-orange-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-xs text-slate-500 mt-1">
              Please enter your admin credentials to access the panel.
            </p>
          </div>
          {/* <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 transition"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>

        {/* Form Container */}
        <form onSubmit={onLogin} className="space-y-5 pt-6">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 p-3 pr-12 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-orange-600 hover:text-orange-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.99] shadow-lg shadow-orange-500/25 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Restricted Area. Authorized personnel only.
        </div>

      </div>
    </div>
  );
};

export default LoginPopup;