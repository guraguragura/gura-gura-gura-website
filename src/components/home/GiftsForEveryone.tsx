
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const giftsCategories = [
  {
    id: 1,
    name: "For Her",
    description: "Perfect gifts for all the special women in your life",
    image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
    handle: "gifts-for-her"
  },
  {
    id: 2,
    name: "For Him",
    description: "Unique presents sure to impress the men in your life",
    image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6",
    handle: "gifts-for-him"
  },
  {
    id: 3,
    name: "For Kids",
    description: "Fun and educational gifts children will love",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c",
    handle: "gifts-for-kids"
  },
  {
    id: 4,
    name: "For Home",
    description: "Beautiful pieces to enhance any living space",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e",
    handle: "gifts-for-home"
  }
];

const GiftsForEveryone = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gifts for <span className="font-normal">Everyone</span></h2>
          <Link to="/gifts" className="flex items-center text-blue-600 hover:underline">
            View All Gifts <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {giftsCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden border-0 shadow-sm">
              <div className="relative h-48">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                  <p className="text-xs opacity-90 line-clamp-2 mb-2">{category.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-fit bg-white/20 border-white/40 text-white hover:bg-white/30 backdrop-blur-sm"
                  >
                    <Link to={`/categories/${category.handle}`}>
                      Shop Now
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftsForEveryone;
