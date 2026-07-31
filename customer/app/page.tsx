'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ShoppingCart,
  MapPin,
  Phone,
  Mail,
  FileText,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Coffee,
  Sprout,
  FlaskConical,
  Star,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Award,
  Layers,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';

// ============================================================================
// DYNAMIC PRODUCTS ARRAY
// Replace or append your product images and details here.
// ============================================================================
interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badge: string;
  badgeColor: 'blue' | 'emerald' | 'cyan';
  typeLabel: string;
}

const productsData: Product[] = [
  {
    id: 'p1',
    title: 'VELOURA® Premium Coffee',
    description:
      'Crafted from carefully selected coffee beans, VELOURA® delivers a rich aroma, smooth taste, and premium-quality experience for cafés, retail stores, and hospitality businesses.',
    imageUrl: '/images/products/box-coffee.png',
    badge: 'Signature Blend',
    badgeColor: 'blue',
    typeLabel: 'Bulk & Retail',
  },
  {
    id: 'p2',
    title: 'VELOURA® Instant Coffee',
    description:
      'Premium instant coffee made for convenience without compromising flavor. Ideal for homes, offices, hotels, and commercial food service operations.',
    imageUrl: '/images/products/coffe-jar.png',
    badge: 'Premium Coffee',
    badgeColor: 'blue',
    typeLabel: 'Retail Pack',
  },
  {
    id: 'p3',
    title: 'VELOURA® Coffee Powder',
    description:
      'Finely ground premium coffee with a bold aroma and balanced flavor profile. Perfect for cafés, restaurants, hotels, and wholesale distribution.',
    imageUrl: '/images/products/small-cofee.png',
    badge: 'Coffee Collection',
    badgeColor: 'cyan',
    typeLabel: 'Bulk Supply',
  },
  {
  id: 'p4',
  title: 'Masala Matka Lime Pickle',
  description:
    'Masala Matka Lime Pickle is prepared using handpicked fresh limes, premium-quality spices, and a traditional recipe to deliver a rich, tangy, and authentic homemade taste. Perfect as a flavorful accompaniment to everyday meals.',
  imageUrl: '/images/products/masala-matka.png',
  badge: 'Traditional Pickles',
  badgeColor: 'emerald',
  typeLabel: 'Retail & Wholesale',
},
];

export default function HomePage() {
  // ================= FORM STATE =================
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: 'Food Product Consultancy (NPD)',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<{
    submitting: boolean;
    success: boolean;
    error: string | null;
  }>({
    submitting: false,
    success: false,
    error: null,
  });

  // ================= UI STATES =================
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
      });
    });
  }, []);

  const testimonials = [
    {
      name: 'Vikram Malhotra',
      role: 'Founder, Natural Brews Co.',
      content:
        'Gollya Avanta transformed our beverage line formulation from paper to market shelf in under 4 months. Their NPD team is unmatched.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Procurement Lead, Urban Retail',
      content:
        'VELOURA® Coffee blend has become our top-selling artisan roast. Exceptional aroma stability and premium packaging quality.',
      rating: 5,
    },
    {
      name: 'Rajesh Kulkarni',
      role: 'Agri-Tech Investor',
      content:
        'Their direct farmer ecosystem integration ensures true supply chain transparency and consistent raw material quality.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'What is the turnaround time for a custom New Product Development (NPD)?',
      a: 'Standard formulation development, lab sampling, and sensory testing typically take 4 to 8 weeks depending on compliance requirements.',
    },
    {
      q: 'Are VELOURA® Coffee products available for white-labeling?',
      a: 'Yes, we offer white-labeling, bulk roasting, and customized packaging solutions for hospitality and retail brands.',
    },
    {
      q: 'How do you guarantee regulatory compliance for food products?',
      a: 'Every formulation developed by Gollya Avanta LLP strictly adheres to FSSAI standards, complete with nutritional profiling and shelf-life certification.',
    },
  ];

  // ================= FORM HANDLERS =================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      setFormStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setFormStatus({ submitting: true, success: false, error: null });

    try {
      // API call endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry. Please try again.');
      }

      // Successful submission
      setFormStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '',
        contact: '',
        service: 'Food Product Consultancy (NPD)',
        message: '',
      });
    } catch (err: any) {
      setFormStatus({
        submitting: false,
        success: false,
        error: err.message || 'An error occurred while submitting.',
      });
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <Head>
        <title>Gollya Avanta LLP | Food Product Consultancy & Agri-Tech Innovation</title>
        <meta
          name="description"
          content="Gollya Avanta LLP delivers end-to-end food product consultancy, new product development (NPD), VELOURA® Coffee solutions, and sustainable Agri-Tech ecosystems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </Head>

      <main className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-600 selection:text-white">
        
      
 

        {/* ================= HERO SECTION ================= */}
   <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-28">
      {/* Background Decorative Gradient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-blue-100/60 blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm shadow-sm">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span>Next-Gen Food Science & AgTech</span>
        </div>

        {/* Main Heading */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.15]">
          Engineering The Future Of <br />
          <span className="text-primary">Food & Agriculture</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 mx-auto max-w-2xl text-base text-slate-600 sm:text-xl leading-relaxed">
          Transform raw concepts into high-performing commercial food products. From formulation science & sensory design to direct farm-to-table supply ecosystems.
        </p>

        {/* Call To Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#products"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 sm:w-auto"
          >
            View Products
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#contact"
            className="flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            Book Consultation
          </Link>
        </div>

        {/* Key Features Pill Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-600 sm:text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" /> Clean Label
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" /> Commercial Scale
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" /> Direct Farm Links
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" /> Lab Tested
          </div>
        </div>

        {/* Stat Cards - Centered Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center sm:border-r sm:border-slate-100">
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">100%</p>
            <p className="text-sm font-medium text-slate-500 mt-1">FSSAI Compliant</p>
          </div>
          <div className="flex flex-col items-center justify-center sm:border-r sm:border-slate-100">
            <p className="text-3xl font-extrabold text-blue-600 sm:text-4xl">VELOURA®</p>
            <p className="text-sm font-medium text-slate-500 mt-1">Signature Coffee</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">End-to-End</p>
            <p className="text-sm font-medium text-slate-500 mt-1">NPD Formulations</p>
          </div>
        </div>

      </div>
    </section>
        {/* ================= DYNAMIC PRODUCTS SHOWCASE ================= */}
        <section id="products" className="py-20 bg-white border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Top Priority Products
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Featured Commercial Offerings
              </h2>
              <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
                Explore our signature products and specialized consultancy packages crafted for modern food markets.
              </p>
            </div>

            {/* DYNAMIC CARD RENDERER */}
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {productsData.map((product, index) => {
                const badgeStyles = {
                  blue: 'bg-blue-100 text-blue-700',
                  emerald: 'bg-emerald-100 text-emerald-700',
                  cyan: 'bg-cyan-100 text-cyan-700',
                };

                return (
                  <div
                    key={product.id}
                    className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300 flex flex-col justify-between"
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >
                    <div>
                      {/* Product Image Holder */}
                      <div className="relative h-[350px] w-full overflow-hidden rounded-2xl bg-slate-200">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-full w-full object-fit group-hover:scale-105 transition-transform duration-300"
                        
                        />
                        {/* Image Fallback Container */}
                        {/* <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-600 -z-0">
                          <Coffee className="h-12 w-12" />
                        </div> */}
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeStyles[product.badgeColor]}`}>
                            {product.badge}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{product.typeLabel}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-slate-900">{product.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200/60">
                      <Link
                        href="#contact"
                        className="rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                      >
                        Inquire Order
                      </Link>
                      <span className="text-xs font-semibold text-slate-500">Gollya Avanta LLP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= CAPABILITIES & SERVICES ================= */}
        <section id="services" className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Expertise</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Comprehensive Innovation Capabilities
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">NPD & Food Science</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  End-to-end recipe creation, sensory evaluation, packaging compatibility, and regulatory registration setup.
                </p>
              </div>

              <div
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">Quality & Compliance</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Strict adherence to safety parameters, shelf-life verification, and FSSAI standard compliance assurance.
                </p>
              </div>

              <div
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">Agri Supply Ecosystem</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Empowering rural agricultural networks with tech integration, fair pricing models, and optimized logistics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROCESS TIMELINE ================= */}
        <section id="process" className="py-20 bg-white border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Execution Framework</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                How We Bring Ideas To Market
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-4">
              <div className="relative text-center" data-aos="zoom-in" data-aos-delay="100">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-extrabold text-white text-xl shadow-lg shadow-blue-500/30">
                  1
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Discovery</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Market analysis, feasibility benchmarking, and core project scope definition.
                </p>
              </div>

              <div className="relative text-center" data-aos="zoom-in" data-aos-delay="200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-extrabold text-white text-xl shadow-lg shadow-blue-500/30">
                  2
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Formulation</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Laboratory prototyping, sensory trials, and ingredients ratio balancing.
                </p>
              </div>

              <div className="relative text-center" data-aos="zoom-in" data-aos-delay="300">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-extrabold text-white text-xl shadow-lg shadow-blue-500/30">
                  3
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Testing</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Accelerated shelf-life testing, microbial safety audits, and compliance checks.
                </p>
              </div>

              <div className="relative text-center" data-aos="zoom-in" data-aos-delay="400">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-extrabold text-white text-xl shadow-lg shadow-blue-500/30">
                  4
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Commercialization</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Factory trial scaling, packaging finalization, and distribution rollout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS SLIDER ================= */}
        <section id="testimonials" className="py-20 bg-slate-50 overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Client Feedback</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Trusted By Industry Partners</h2>
            </div>

            <div className="mt-12 relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12" data-aos="fade-up">
              <div className="flex gap-1 text-amber-400">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400" />
                ))}
              </div>

              <p className="mt-6 text-lg sm:text-xl font-medium text-slate-700 italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                  <p className="text-base font-bold text-slate-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-xs font-medium text-slate-500">{testimonials[currentTestimonial].role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    aria-label="Previous Testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    aria-label="Next Testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            </div>

            <div className="mt-10 space-y-4" data-aos="fade-up">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-100 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                        activeFaq === idx ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-5 pt-0 text-sm text-slate-600 border-t border-slate-200/60 leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT & SUBMISSION INQUIRY SECTION ================= */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              <div className="lg:col-span-5" data-aos="fade-right">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Get In Touch</span>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Let’s Build Something Great Together
                </h2>
                <p className="mt-4 text-sm text-slate-600">
                  Have a new food product concept, supply chain requirement, or partnership idea? Connect directly with our team.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">Registered Office</p>
                      <p className="mt-1 text-sm font-medium text-slate-800">
                        Shop No. 5, AJ Avenue, Cummins College Road, Karvenagar, Pune – 411052, Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">Direct Phone</p>
                      <p className="mt-1 text-sm font-medium text-slate-800">+91 7822868900 / +91 7397944475</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">Email Address</p>
                      <p className="mt-1 text-sm font-medium text-slate-800">gollyaavanta@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">LLP Identification</p>
                      <p className="mt-1 text-sm font-medium text-slate-800">LLPIN: ACT-0313</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Container */}
              <div className="lg:col-span-7" data-aos="fade-left">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
                  <h3 className="text-2xl font-bold text-slate-900">Send Us a Message</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Fill out the inquiry form below and our innovation team will contact you.
                  </p>

                  {/* Submission Error Banner */}
                  {formStatus.error && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-medium text-red-600 border border-red-200">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{formStatus.error}</span>
                    </div>
                  )}

                  {/* Submission Success View */}
                  {formStatus.success ? (
                    <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                      <h4 className="mt-4 text-xl font-bold text-slate-900">Inquiry Sent Successfully!</h4>
                      <p className="mt-2 text-sm text-slate-600">
                        Thank you for contacting Gollya Avanta LLP. Our specialists will review your query and respond within 24 hours.
                      </p>
                      <button
                        onClick={() => setFormStatus({ submitting: false, success: false, error: null })}
                        className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    /* Inquiry Form */
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase">Your Name *</label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Rahul Sharma"
                            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase">Contact Email / Phone *</label>
                          <input
                            required
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            placeholder="rahul@example.com"
                            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase">Service Interested In</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                        >
                          <option>Food Product Consultancy (NPD)</option>
                          <option>VELOURA® Coffee Inquiry</option>
                          <option>Agri-Tech Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase">Message *</label>
                        <textarea
                          required
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Describe your project requirement..."
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus.submitting}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50"
                      >
                        {formStatus.submitting ? 'Submitting Query...' : 'Submit Inquiry'}
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

    
      </main>
    </>
  );
}