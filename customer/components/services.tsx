'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FlaskConical,
  RefreshCw,
  Hammer,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    icon: FlaskConical,
    title: 'Product Development',
    description:
      'End-to-end engineering for New Product Development (NPD), Functional Foods, Nutraceuticals, instant beverage formulations, coffee/tea systems, and Ready-to-Eat/Cook solutions.',
  },
  {
    icon: RefreshCw,
    title: 'Product Reformulation',
    description:
      'Strategic product adjustments focusing on complete taste enhancement, target nutritional improvement, ingredient cost optimization, and safe shelf-life extension.',
  },
  {
    icon: Hammer,
    title: 'Research & Development',
    description:
      'Turn theoretical concepts into physical assets with hands-on prototype development, strict product standardization, advanced ingredient selection, pilot trials, and deep process optimization.',
  },
  {
    icon: HelpCircle,
    title: 'Food Business Support',
    description:
      'Dedicated guidance tailored for startups and enterprises across fast-tracked product commercialization, optimized manufacturing setups, rigorous vendor development, and multi-tier production scale-up.',
  },
  {
    icon: ShieldAlert,
    title: 'Regulatory & Compliance',
    description:
      'Streamline corporate compliance requirements smoothly with expert FSSAI guidance, accurate product documentation, clean label architecture creation, and comprehensive nutritional analysis.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-background">
      {/* Container matched perfectly with the max-w-6xl configuration used in the About layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Block with Optimized Responsive Spacing */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-primary/10 text-primary border-primary/20 mb-4 md:mb-5">
            What We Offer
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            Comprehensive Food Product{' '}
            <span className="text-primary">Consultancy & Services</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have an idea, prototype, or existing product, our team helps convert complex concepts into successful, scalable, market-ready products.
          </p>
        </div>

        {/* Dynamic Responsive Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch justify-center">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border-border/50 bg-card flex flex-col h-full"
            >
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-accent transition-all duration-300 shrink-0">
                  <service.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <CardTitle className="text-base sm:text-lg font-bold group-hover:text-primary tracking-tight transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0 flex-grow">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dynamic Lower Action Container */}
        <div className="text-center mt-10 md:mt-12">
          <Button size="lg" variant="outline" className="group text-sm h-10 sm:h-11 px-5 sm:px-6">
            Explore Consultancy Framework
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
      </div>
    </section>
  );
}