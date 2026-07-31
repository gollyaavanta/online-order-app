'use client';

import React, { useContext } from 'react';
import { StoreContext } from '@/context/authContext';
import { 
  User, 
  Mail, 
  LogOut, 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Calendar,
  Settings 
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useContext(StoreContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <User className="w-6 h-6" />
          </div>
          <p className="text-slate-600 font-medium">No user details found.</p>
          <Link
            href="/login"
            className="inline-block px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Generate fallback avatar initial
  const displayName = user?.name || user?.username || 'User';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-[85vh] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Account Profile</h1>
          <p className="text-sm text-slate-500">Manage your personal information and account settings.</p>
        </div>

        {/* Main User Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {/* Top Banner Accent */}
          <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Profile Details Container */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-14 mb-6 gap-4">
              
              {/* Avatar & Display Name */}
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 rounded-2xl bg-indigo-600 text-white text-3xl font-semibold flex items-center justify-center border-4 border-white shadow-md ring-1 ring-slate-100">
                  {avatarInitial}
                </div>
                <div className="mb-1">
                  <h2 className="text-xl font-semibold text-slate-900">{displayName}</h2>
                  <p className="text-xs font-mono text-slate-500">
                    @{user?.username || user?.name?.toLowerCase().replace(/\s+/g, '') || 'username'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Account Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              
              {/* Email Card */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 bg-white rounded-lg text-slate-500 shadow-sm border border-slate-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">{user?.email || 'N/A'}</p>
                </div>
              </div>

              {/* Username Card */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 bg-white rounded-lg text-slate-500 shadow-sm border border-slate-100">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Username</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">{user?.username || displayName}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <Link
            href="/my-orders"
            className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">My Orders</h3>
                <p className="text-xs text-slate-500">Track and view order history</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>

          <Link
            href="/cart"
            className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">My Cart</h3>
                <p className="text-xs text-slate-500">View items saved for checkout</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>

        </div>

      </div>
    </div>
  );
}