
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, FileText, Globe, Mail } from 'lucide-react';
import { useAllArticles, useLatestArticles } from '@/hooks/usePromotionalArticles';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PressPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;
  const { data, isLoading, error } = useAllArticles(currentPage, articlesPerPage);
  const { data: latestArticles, isLoading: isLoadingLatest } = useLatestArticles(3);

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the latest news, press releases, and media resources about Gura.
          </p>
        </div>

        {/* Press Releases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-blue-500" />
            Press Releases
          </h2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full">
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Failed to load press releases. Please try again later.</p>
            </div>
          ) : data?.articles && data.articles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {data.articles.map((article) => (
                  <Card key={article.id} className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-sm text-muted-foreground mb-1">
                        {format(new Date(article.published_at), 'MMMM d, yyyy')}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{article.subtitle}</p>
                      <Link 
                        to={`/article/${article.slug}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Read full press release
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              {data.total > articlesPerPage && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      {Array.from({ length: Math.ceil(data.total / articlesPerPage) }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(Math.ceil(data.total / articlesPerPage), p + 1))}
                          className={currentPage === Math.ceil(data.total / articlesPerPage) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No press releases yet</p>
              <p className="text-muted-foreground">Check back soon for our latest news and updates.</p>
            </div>
          )}
        </section>

        {/* Media Coverage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Globe className="mr-2 h-6 w-6 text-blue-500" />
            Media Coverage
          </h2>
          {isLoadingLatest ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full">
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-6 w-full mb-4" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <Card key={article.id} className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="text-sm text-muted-foreground mb-1">
                      {format(new Date(article.published_at), 'MMMM yyyy')}
                    </div>
                    <h3 className="text-lg font-bold mb-4 flex-grow">{article.title}</h3>
                    <Link to={`/article/${article.slug}`} className="text-primary hover:underline font-medium">
                      Read article
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No media coverage yet</p>
              <p className="text-muted-foreground">Check back soon for our latest media features.</p>
            </div>
          )}
        </section>

        {/* Press Contact Section */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
                  <p className="text-gray-700 mb-6">
                    For press inquiries, interview requests, or additional information about Gura, please contact our media relations team.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>press@gura.rw</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span>www.gura.rw/press</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Press Kit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default PressPage;
