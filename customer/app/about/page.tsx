'use client';

import { useEffect } from 'react';
import AOS from 'aos';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, Sprout, FlaskConical, Lightbulb, User, 
  Coffee, ShieldCheck, HeartPulse, GraduationCap, Briefcase,
  Award, Leaf, Hammer
} from 'lucide-react';

const missionPoints = [
  "Develop meaningful innovations with real-world impact.",
  "Transform ideas into scalable products and businesses.",
  "Promote sustainable and farmer-centric technologies.",
  "Create intellectual property with global relevance.",
  "Support entrepreneurship through science and innovation.",
  "Build solutions that improve everyday life."
];

const leadership = [
  {
    name: "Ankit Amrutrao Salunkhe",
    role: "Founder & CEO",
    bio: "Ankit Amrutrao Salunkhe is a Food Technology professional, innovator, entrepreneur, and product development specialist. As Founder & CEO of Gollya Avanta LLP, he leads the company's innovation, research, product development, and commercialization initiatives.",
    qualifications: ["B.Tech Food Technology", "Research & Product Innovation Head", "Food Product Developer", "Innovation Strategist", "Entrepreneur"],
    expertise: ["Food Product Development", "Beverage Innovation", "Functional Foods", "Research & Development", "Intellectual Property Development", "Startup Development"],
    quote: "Innovation is not about creating products. It is about creating impact."
  },
  {
    name: "Gayatri Dipak Kanase",
    role: "Managing Director & Co-Founder",
    bio: "Gayatri Dipak Kanase leads research, quality systems, formulation development, and operational excellence at Gollya Avanta LLP.",
    qualifications: ["M.Tech Food Technology", "Product Formulation Specialist", "Research & Development Expert", "Quality Systems Professional"],
    expertise: ["Food Formulation", "Nutraceutical Development", "Quality Management", "Product Standardization", "Process Optimization"],
    quote: "Research becomes valuable only when it reaches people."
  }
];

const domains = [
  { title: "Food Technology", desc: "Developing advanced food products, processing systems, and value-added food solutions.", icon: FlaskConical },
  { title: "Beverage Innovation", desc: "Research and development of coffee, tea, functional beverages, instant drinks, and specialty beverage products.", icon: Coffee },
  { title: "Nutraceuticals", desc: "Development of health-focused foods, functional ingredients, wellness products, and nutraceutical solutions.", icon: HeartPulse },
  { title: "Agriculture & Rural Innovation", desc: "Creating technologies and business models that improve farmer income and agricultural sustainability.", icon: Sprout },
  { title: "Sustainability", desc: "Developing environmentally responsible products and technologies that support resource efficiency and long-term sustainability.", icon: Leaf },
  { title: "Consumer Products", desc: "Building innovative solutions that improve daily life and address emerging market needs.", icon: Target }
];

const farmerFocus = [
  { step: "01", title: "Value Addition to Agricultural Produce", desc: "Transforming agricultural commodities into premium and market-ready products through innovative processing technologies." },
  { step: "02", title: "Farm-to-Market Solutions", desc: "Supporting efficient supply chains that connect farmers with consumers and industries." },
  { step: "03", title: "Agri-Tech Innovation", desc: "Developing practical technologies that improve agricultural productivity and efficiency." },
  { step: "04", title: "Sustainable Agriculture", desc: "Promoting environmentally responsible practices and resource-efficient farming systems." },
  { step: "05", title: "Farmer Entrepreneurship", desc: "Supporting farmers in building brands, processing units, and value-added businesses." }
];

const services = [
  { title: "Product Development", items: ["New Product Development (NPD)", "Functional Foods & Nutraceuticals", "Instant Beverage Formulations", "Coffee & Tea Products", "Ready-to-Eat & Ready-to-Cook Foods"] },
  { title: "Product Reformulation", items: ["Taste Enhancement", "Nutritional Improvement", "Cost Optimization", "Shelf-Life Extension"] },
  { title: "Research & Development", items: ["Prototype Development", "Product Standardization", "Ingredient Selection & Pilot Trials", "Process Optimization"] },
  { title: "Food Business Support", items: ["Startup Guidance", "Product Commercialization", "Manufacturing Setup Support", "Vendor Development & Scale-Up"] },
  { title: "Regulatory Support", items: ["FSSAI Guidance", "Product Documentation", "Label Development", "Technical Specifications & Nutritional Info"] }
];

const valueChains = [
  { title: "Farmers", points: ["Better Income Opportunities", "Value Addition", "Market Linkages", "Technology Access"] },
  { title: "Startups", points: ["Faster Product Development", "R&D Support", "Technical Expertise", "Commercialization Assistance"] },
  { title: "Food Businesses", points: ["Product Innovation", "Process Optimization", "Technical Consultancy", "Manufacturing Guidance"] },
  { title: "Consumers", points: ["Better Products", "Sustainable Solutions", "Improved Nutrition", "Enhanced Quality"] }
];

const milestones = [
  "Innovation-Driven Company", "Research-Oriented Development", "Product Development Expertise",
  "Intellectual Property Focus", "Startup Ecosystem Engagement", "Farmer-Centric Initiatives"
];

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="bg-background text-foreground space-y-16 sm:space-y-24 md:space-y-32 pb-16 md:pb-24 overflow-x-hidden">
      
      {/* 1. Hero & Company Overview */}
      <section id="about" className="relative pt-16 sm:pt-24 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex justify-center" data-aos="fade-down">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-xs sm:text-sm font-medium text-primary tracking-wide">
              About GOLLYA AVANTA LLP
            </span>
          </div>

          <div className="mx-auto mt-8 max-w-4xl text-center space-y-6" data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-4xl font-extrabold tracking-tight leading-none sm:text-5xl lg:text-6xl">
              Building the Future Through{" "}
              <span className="text-primary block sm:inline">Innovation</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
              We develop science-backed products and technologies that improve
              health, agriculture, food systems, and sustainability—transforming
              innovative ideas into real-world solutions with global impact.
            </p>
          </div>

          <div className="mt-16 md:mt-24 grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="space-y-6 lg:col-span-7 flex flex-col justify-center" data-aos="fade-right" data-aos-delay="200">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Who We Are
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
                  Innovation with Purpose
                </h2>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Founded in <strong className="text-foreground font-semibold">2025</strong>,
                Gollya Avanta LLP is an innovation-driven company focused on
                developing breakthrough products across Food Technology,
                Beverage Innovation, Nutraceuticals, Agriculture,
                Sustainability, and Consumer Products.
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                We bridge scientific research, product development, and
                commercialization to create meaningful impact for consumers,
                industries, and farming communities while building a healthier
                and more sustainable future.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm lg:col-span-5 flex flex-col justify-center" data-aos="fade-left" data-aos-delay="300">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                What Drives Us
              </h3>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Science-Driven Research</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Every innovation is backed by rigorous research, testing,
                    and technical expertise.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Product Innovation</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    We transform ideas into scalable products that solve
                    real-world challenges.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Sustainable Growth</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Our focus is on creating long-term value for consumers,
                    businesses, and farming communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <Card className="lg:col-span-4 border-border/50 bg-card flex flex-col justify-between" data-aos="fade-up">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Our Vision</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                To become a globally recognized innovation company developing sustainable products and technologies that improve health, food systems, agriculture, and quality of life.
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-8 border-border/50 bg-card flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Our Mission</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Leadership Team Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-6 md:space-y-8">
        <div className="space-y-2" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Leadership Team</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">Guided by deep research, strategic development, and operational excellence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {leadership.map((member, index) => (
            <Card key={index} className="border-border/50 bg-card flex flex-col h-full justify-between overflow-hidden" data-aos="fade-up" data-aos-delay={index * 150}>
              <CardContent className="p-6 sm:p-8 space-y-6 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight">{member.name}</h3>
                    </div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{member.role}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  
                  <div className="space-y-4 pt-2">
                    <div>
                      <h4 className="text-xs font-bold tracking-wide uppercase text-foreground mb-2 flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" /> Qualifications
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.qualifications.map((q, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">{q}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-wide uppercase text-foreground mb-2 flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-muted-foreground" /> Core Expertise
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((exp, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-primary/5 text-primary border border-primary/10 font-medium">{exp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-2 border-accent/40 pl-4 italic text-sm text-muted-foreground bg-accent/5 py-3 pr-2 rounded-r-md mt-6">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Innovation Domains Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-6 md:space-y-8">
        <div className="space-y-2" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Our Innovation Domains</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">Pushing boundaries across diverse engineering and lifestyle segments.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => {
            const IconComponent = domain.icon;
            return (
              <Card key={index} className="group hover:shadow-md transition-all duration-300 border-border/50 bg-card flex flex-col justify-between" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <CardContent className="p-6 space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">{domain.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{domain.desc}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. Farmer Empowerment Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl" data-aos="fade-up">
        <div className="bg-muted/30 p-6 sm:p-10 md:p-12 rounded-2xl border border-border/40 space-y-8 md:space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-accent">Empowering Farmers Through Innovation</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Farmer Empowerment & Rural Innovation</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              At Gollya Avanta LLP, we believe that the future of food begins with the farmer. We are committed to creating farmer-centric solutions that enhance productivity, reduce waste, improve profitability, and generate value-added opportunities for agricultural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerFocus.map((focus, index) => (
              <div key={index} className="space-y-2 p-5 rounded-xl bg-background border border-border/30 shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-primary bg-primary/10 rounded px-2 py-0.5">{focus.step}</span>
                    <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight">{focus.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{focus.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold uppercase text-foreground tracking-wide">Our Long-Term Goal</h4>
              <p className="text-sm text-muted-foreground max-w-2xl">To establish a farmer-centric innovation ecosystem where agriculture becomes more profitable, sustainable, and technology-driven.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brands Portfolio */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-6" data-aos="fade-up">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Our Brands</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Flagship brands born from continuous product breakthrough cycles.</p>
        </div>

        <Card className="border-primary/20 bg-card overflow-hidden relative shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden lg:block">
            <Coffee className="h-40 w-40" />
          </div>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">VELOURA®</h3>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Premium Coffee Innovation Brand</p>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary self-start sm:self-auto font-semibold tracking-wide uppercase">
                Beverage Flagship
              </span>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              VELOURA® represents our commitment to premium coffee experiences through innovation, quality, and product excellence.
            </p>
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Product Categories</h4>
              <div className="flex flex-wrap gap-2">
                {["Instant Coffee", "Coffee Concentrates", "Functional Coffee", "Specialty Coffee Solutions", "HORECA Coffee Products", "Future Beverage Innovations"].map((cat, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-md bg-muted text-foreground border border-border/40 font-medium">{cat}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 7. Food Product Consultancy */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-6 md:space-y-8">
        <div className="space-y-2" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Food Product Consultancy</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-4xl leading-relaxed">
            <strong className="text-foreground font-semibold">From Idea to Market:</strong> Gollya Avanta LLP provides comprehensive food product development and commercialization services for startups, entrepreneurs, restaurants, manufacturers, and food businesses. Whether you have an idea, prototype, or existing product, our team helps convert concepts into successful market-ready products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Card key={idx} className="border-border/50 bg-card h-full flex flex-col justify-between" data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
              <CardContent className="p-6 flex-grow space-y-4">
                <h3 className="font-bold text-sm sm:text-base text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" /> {service.title}
                </h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary text-xs mt-0.5 shrink-0">✦</span>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. R&D Foundations & Selection Arguments */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Why Choose Us */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center" data-aos="fade-right">
          <h2 className="text-2xl font-bold tracking-tight">Why Choose Gollya Avanta LLP?</h2>
          <div className="space-y-5">
            {[
              { title: "Science-Driven Innovation", desc: "Every solution is backed by research, testing, and technical expertise." },
              { title: "Commercially Focused Development", desc: "We develop products that are practical, scalable, and market-ready." },
              { title: "Startup-Friendly Approach", desc: "Supporting entrepreneurs from concept to commercialization." },
              { title: "Farmer-Centric Vision", desc: "Creating solutions that generate value throughout the agricultural ecosystem." },
              { title: "Future-Focused Thinking", desc: "Building products and technologies designed for tomorrow's challenges." }
            ].map((reason, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* R&D Key Areas */}
        <div className="lg:col-span-5 flex flex-col justify-center" data-aos="fade-left">
          <Card className="border-border/50 bg-muted/20 h-full flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Hammer className="h-5 w-5 text-primary" /> Key Research Areas
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Innovation is the foundation of Gollya Avanta LLP. Our R&D activities focus on creating practical, scalable, and sustainable solutions across multiple sectors.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs sm:text-sm text-foreground font-medium">
                {["Food Technology", "Coffee Science", "Functional Foods", "Nutraceuticals", "Sustainable Agriculture", "Food Processing", "Packaging Innovations", "Consumer Product Innovations"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-background p-2.5 rounded-lg border border-border/40 shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 9. Value Chain Impact Matrix */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-6">
        <div className="space-y-1" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Impact Across the Value Chain</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Delivering systematic transformations for all ecosystem stakeholders.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueChains.map((vc, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/50 bg-card space-y-4 flex flex-col justify-between shadow-sm" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="space-y-3">
                <h3 className="font-bold text-base text-foreground border-b border-border/40 pb-2 leading-tight">{vc.title}</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {vc.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent text-xs mt-0.5 shrink-0">✔</span>
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Achievements & Milestones Footer Row */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-8 border-t border-border/60" data-aos="fade-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-foreground">
              <Award className="h-4 w-4 text-primary" /> Core Milestones
            </h2>
            <p className="text-xs text-muted-foreground">Strategic focus anchors shaping the company identity.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {milestones.map((m, idx) => (
              <span key={idx} className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted border border-border/40 text-muted-foreground whitespace-nowrap">{m}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}