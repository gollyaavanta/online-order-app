import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
            Established Excellence in Business Solutions
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl leading-tight">
            Building Success Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Innovation
            </span>{' '}
            and Trust
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Gollya Avanta LLP delivers comprehensive business solutions with a
            commitment to excellence. We partner with organizations to drive
            growth, innovation, and sustainable success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="group">
              Our Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Play className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-1 mt-1 border-t w-full max-w-3xl">
            {/* <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-primary">
                10+
              </span>
              <span className="text-sm text-muted-foreground">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-primary">
                500+
              </span>
              <span className="text-sm text-muted-foreground">Happy Clients</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-primary">
                50+
              </span>
              <span className="text-sm text-muted-foreground">Projects Done</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-primary">
                24/7
              </span>
              <span className="text-sm text-muted-foreground">Support</span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
