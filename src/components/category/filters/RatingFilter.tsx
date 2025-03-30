
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RadioFilterItem from "./RadioFilterItem";

interface RatingOption {
  value: number;
  count: number;
}

interface RatingFilterProps {
  ratings: RatingOption[];
  ratingFilter: number | null;
  setRatingFilter: (value: number) => void;
}

const RatingFilter = ({ ratings, ratingFilter, setRatingFilter }: RatingFilterProps) => {
  return (
    <AccordionItem value="rating" className="border-0">
      <AccordionTrigger className="text-lg font-semibold py-0">Filter by Rating</AccordionTrigger>
      <AccordionContent>
        <div className="mt-2 space-y-2">
          {ratings.map((rating) => (
            <RadioFilterItem
              key={rating.value}
              id={`rating-${rating.value}`}
              name="rating"
              value={rating.value}
              checked={ratingFilter === rating.value}
              onChange={() => setRatingFilter(rating.value)}
              count={rating.count}
            >
              <div className="flex items-center">
                <div className="flex">
                  {Array(5).fill(null).map((_, index) => (
                    <svg
                      key={index}
                      className={`h-4 w-4 ${
                        index < rating.value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </RadioFilterItem>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default RatingFilter;
