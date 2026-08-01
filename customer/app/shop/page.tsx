'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import shop from "../../assets/shop.png"
export default function ShopComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100/60 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-slate-200/50 rounded-full blur-2xl pointer-events-none" />

      {/* Main Container Card */}
      <main className="max-w-lg w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-slate-200/60 relative z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-rose-50 rounded-full border border-rose-100 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          Online Shop
        </div>

        {/* Shop Image Container with Floating Animation */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 transition-transform duration-500 hover:scale-105">
          {/* Gentle background circle behind illustration */}
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={shop} // Place your shop image in public/shop-icon.png
              alt="Shop Coming Soon"
              width={180}
              height={180}
              priority
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Our Online Shop is Coming Soon!
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
          We are setting up the shelves and stocking new products. Sign up below to get notified as soon as we open!
        </p>

        {/* Subscription Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/20 active:scale-95"
            >
              Notify Me
            </button>
          </form>
        ) : (
          <div className="p-4 mb-8 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold animate-fade-in">
            🎉 You're on the list! We'll email you when the store goes live.
          </div>
        )}

        {/* Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <span>&larr;</span> Back to Home Page
        </Link>
      </main>
    </div>
  )
}