
import React from "react";
import { Link } from "react-router-dom";

interface PromotionalCardProps {
  image: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  link: string;
}

const PromotionalCard = ({ image, title, subtitle, backgroundColor, link }: PromotionalCardProps) => {
  return (
    <div className="flex flex-col">
      <Link to={link} className="block overflow-hidden rounded-lg mb-3 hover:opacity-95 transition-opacity">
        <div className={`${backgroundColor} h-64 rounded-lg relative flex items-center justify-center`}>
          <img 
            src={image} 
            alt={title} 
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
      </Link>
      <div className="text-left">
        <h3 className="text-xl font-bold text-gray-800">{title} <span className="font-normal text-gray-600">{subtitle}</span></h3>
      </div>
    </div>
  );
};

const PromotionalBannerCards = () => {
  const promotionalCards = [
    {
      image: "/lovable-uploads/9f9f6f6c-f423-47c6-8964-326b064c2fd8.png",
      title: "The newest",
      subtitle: "gadgets at your finger tips",
      backgroundColor: "bg-orange-400",
      link: "/shop"
    },
    {
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
      title: "Gear up and dominate:",
      subtitle: "sports gear for every victory",
      backgroundColor: "bg-green-700",
      link: "/shop"
    },
    {
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
      title: "Deal of the week :",
      subtitle: "Get 15% off on amazing headsets!",
      backgroundColor: "bg-yellow-400",
      link: "/shop"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotionalCards.map((card, index) => (
            <PromotionalCard
              key={index}
              image={card.image}
              title={card.title}
              subtitle={card.subtitle}
              backgroundColor={card.backgroundColor}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBannerCards;
