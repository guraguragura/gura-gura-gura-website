
import React from "react";
import { Link } from "react-router-dom";
import { useLatestArticles } from "@/hooks/usePromotionalArticles";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { data: articles, isLoading } = useLatestArticles(3);

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="h-64 rounded-lg mb-3" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <PromotionalCard
              key={article.id}
              image={article.image_url}
              title={article.title}
              subtitle={article.subtitle}
              backgroundColor={article.background_color}
              link={`/article/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBannerCards;
