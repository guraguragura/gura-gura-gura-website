import { useState } from "react";
import { Link } from "react-router-dom";
import { useAllArticles } from "@/hooks/usePromotionalArticles";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const perPage = 12;
  const { data, isLoading } = useAllArticles(page, perPage);

  const totalPages = data ? Math.ceil(data.total / perPage) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <TopInfoBar />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Promotional Articles</h1>
            <p className="text-muted-foreground">
              Explore our latest promotions and special offers
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(perPage)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-64 rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : !data || data.articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No articles available at the moment.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.articles.map((article) => (
                  <Link
                    key={article.id}
                    to={article.link_url}
                    className="group flex flex-col overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className={`${article.background_color} h-64 relative overflow-hidden`}>
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(article.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesPage;
