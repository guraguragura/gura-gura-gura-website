import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jean Claude Niyonkuru',
    location: 'Kigali',
    rating: 5,
    comment: 'Fast delivery and great quality products! I ordered a laptop and it arrived the next day in perfect condition.',
    product: 'Electronics'
  },
  {
    id: 2,
    name: 'Marie Uwase',
    location: 'Musanze',
    rating: 5,
    comment: 'Best online shopping experience in Rwanda. The customer service is exceptional and prices are very competitive.',
    product: 'Home Appliances'
  },
  {
    id: 3,
    name: 'Patrick Habimana',
    location: 'Huye',
    rating: 5,
    comment: 'I love the variety of products available. Found everything I needed for my new apartment in one place!',
    product: 'Furniture'
  },
  {
    id: 4,
    name: 'Grace Mukamana',
    location: 'Rubavu',
    rating: 5,
    comment: 'Reliable and trustworthy. I have made multiple purchases and every experience has been excellent.',
    product: 'Fashion'
  }
];

const SocialProof = () => {
  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Trusted by Rwandans</h2>
          <p className="text-muted-foreground">See what our customers are saying</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm mb-4 text-foreground/80">{testimonial.comment}</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <p className="text-xs text-primary mt-1">{testimonial.product}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default SocialProof;
