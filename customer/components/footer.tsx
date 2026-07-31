import Link from 'next/link';
import { Building2 } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  'Business Consulting',
  'Growth Strategy',
  'Innovation Advisory',
  'Compliance Services',
  'Operational Excellence',
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10">
                <Building2 className="h-6 w-6 text-background" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-background">
                  GOLLYA AVANTA
                </span>
                <span className="text-xs text-background/70 -mt-1">LLP</span>
              </div>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              Building success through innovation and trust. Your trusted
              partner for comprehensive business solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-background/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-background/70">
                <span className="font-medium text-background/90">Address:</span>
                <br />
               Registered Office 
Shop No. 5, AJ Avenue, 
Cummins College Road, 
Karvenagar, 
Pune – 411052, 
Maharashtra, India 
              </li>
              <li className="text-sm text-background/70">
                <span className="font-medium text-background/90">Email:</span>
                <br />
                gollyaavanta@gmail.com 
              </li>
              <li className="text-sm text-background/70">
                <span className="font-medium text-background/90">Phone:</span>
                <br />
               +91 7822868900 

              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/70">
              &copy; {new Date().getFullYear()} Gollya Avanta LLP. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-background/70 hover:text-background transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-background/70 hover:text-background transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
