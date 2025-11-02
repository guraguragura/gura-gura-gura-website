import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Table, Button, Badge, toast } from "@medusajs/ui";
import { PencilSquare, Trash, Plus } from "@medusajs/icons";
import { useState, useEffect } from "react";
import { ArticleForm } from "../components/article-form";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  background_color: string;
  is_active: boolean;
  published_at: string;
  created_at: string;
}

const PromotionalArticlesWidget = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://wxniywyujrxlwraocszi.supabase.co/rest/v1/promotional_articles?select=*&order=published_at.desc",
        {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4`,
          },
        }
      );
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      toast.error("Error", { description: "Failed to load articles" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      await fetch(
        `https://wxniywyujrxlwraocszi.supabase.co/rest/v1/promotional_articles?id=eq.${id}`,
        {
          method: "DELETE",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4`,
          },
        }
      );
      toast.success("Success", { description: "Article deleted" });
      fetchArticles();
    } catch (error) {
      toast.error("Error", { description: "Failed to delete article" });
    }
  };

  const handleToggleActive = async (article: Article) => {
    try {
      await fetch(
        `https://wxniywyujrxlwraocszi.supabase.co/rest/v1/promotional_articles?id=eq.${article.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4`,
          },
          body: JSON.stringify({ is_active: !article.is_active }),
        }
      );
      toast.success("Success", { description: "Article updated" });
      fetchArticles();
    } catch (error) {
      toast.error("Error", { description: "Failed to update article" });
    }
  };

  if (showForm || editingArticle) {
    return (
      <ArticleForm
        article={editingArticle}
        onClose={() => {
          setShowForm(false);
          setEditingArticle(null);
        }}
        onSuccess={() => {
          setShowForm(false);
          setEditingArticle(null);
          fetchArticles();
        }}
      />
    );
  }

  return (
    <Container className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading level="h1">Promotional Articles</Heading>
        <Button onClick={() => setShowForm(true)}>
          <Plus /> Create New Article
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Subtitle</Table.HeaderCell>
              <Table.HeaderCell>Published</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {articles.map((article) => (
              <Table.Row key={article.id}>
                <Table.Cell>
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </Table.Cell>
                <Table.Cell>{article.title}</Table.Cell>
                <Table.Cell>{article.subtitle}</Table.Cell>
                <Table.Cell>
                  {new Date(article.published_at).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    color={article.is_active ? "green" : "grey"}
                    onClick={() => handleToggleActive(article)}
                    className="cursor-pointer"
                  >
                    {article.is_active ? "Active" : "Inactive"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      variant="transparent"
                      onClick={() => setEditingArticle(article)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      variant="transparent"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.list.before",
});

export default PromotionalArticlesWidget;
