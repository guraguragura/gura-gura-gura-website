import React from "react";
import { Helmet } from "react-helmet";

interface ArticleSchemaProps {
  article: {
    title: string;
    subtitle: string;
    content: string | null;
    image_url: string;
    featured_image_alt: string | null;
    author: string | null;
    published_at: string;
    slug: string;
  };
}

const ArticleSchema: React.FC<ArticleSchemaProps> = ({ article }) => {
  // Make sure image is absolute URL
  const absoluteImage = article.image_url.startsWith('http') 
    ? article.image_url 
    : `${window.location.origin}${article.image_url}`;

  const articleSchema = {
    "@context": "https://schema.org/",
    "@type": "Article",
    "headline": article.title,
    "description": article.subtitle,
    "image": absoluteImage,
    "datePublished": article.published_at,
    "dateModified": article.published_at,
    "publisher": {
      "@type": "Organization",
      "name": "Gura",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/lovable-uploads/e3ce3e2d-544e-4626-b3fa-b35dd86d950c.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

export default ArticleSchema;
