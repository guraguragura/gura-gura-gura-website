import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useArticleBySlug } from "@/hooks/usePromotionalArticles";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleSchema from "@/components/article/ArticleSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticleBySlug(slug || "");

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <TopInfoBar />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-96 mb-4" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/press" replace />;
  }

  const publishedDate = article.published_at 
    ? format(new Date(article.published_at), "MMMM d, yyyy")
    : "";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>{article.title} - Gura Press & Media</title>
        <meta name="description" content={article.excerpt || article.subtitle} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || article.subtitle} />
        <meta property="og:image" content={article.image_url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.published_at} />
        {article.author && <meta property="article:author" content={article.author} />}
      </Helmet>

      <ArticleSchema article={article} />
      
      <TopInfoBar />
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/press">Press & Media</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            
            {article.subtitle && (
              <p className="text-xl text-muted-foreground mb-6">
                {article.subtitle}
              </p>
            )}

            {publishedDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.published_at}>{publishedDate}</time>
              </div>
            )}
          </header>

          {/* Featured Image */}
          <figure className="mb-8">
            <img
              src={article.image_url}
              alt={article.featured_image_alt || article.title}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="eager"
            />
            {article.featured_image_alt && (
              <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                {article.featured_image_alt}
              </figcaption>
            )}
          </figure>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content ? (
              <div 
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="article-content"
              />
            ) : (
              <p className="text-muted-foreground">
                This article is available externally.{" "}
                {article.link_url && (
                  <a 
                    href={article.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Full Article
                  </a>
                )}
              </p>
            )}
          </div>

          {/* Back to Press Link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link 
              to="/press" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              ← Back to Press & Media
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
