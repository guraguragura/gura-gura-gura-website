
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

interface CategoryBreadcrumbProps {
  categoryName: string;
  parentCategory?: { name: string; handle: string } | null;
}

const CategoryBreadcrumb = ({ categoryName, parentCategory }: CategoryBreadcrumbProps) => {
  const isMobile = useIsMobile();
  
  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${window.location.origin}/`
      },
      ...(parentCategory ? [{
        "@type": "ListItem",
        "position": 2,
        "name": parentCategory.name,
        "item": `${window.location.origin}/categories/${parentCategory.handle}`
      }] : []),
      {
        "@type": "ListItem",
        "position": parentCategory ? 3 : 2,
        "name": categoryName,
        "item": window.location.href
      }
    ]
  };
  
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground ${isMobile ? 'mb-3' : 'mb-6'}`}>
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        {parentCategory && (
          <>
            <Link to={`/categories/${parentCategory.handle}`} className="hover:text-primary transition-colors truncate">
              {parentCategory.name}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </>
        )}
        <span className="font-semibold text-foreground truncate">{categoryName || "Product Category"}</span>
      </div>
    </>
  );
};

export default CategoryBreadcrumb;
