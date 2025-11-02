import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminProductCategory } from "@medusajs/framework/types";
import { Container, Heading } from "@medusajs/ui";
import CategoryImageForm from "../components/category-image-form";

const CategoryImageDetailWidget = ({ 
  data 
}: DetailWidgetProps<AdminProductCategory>) => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Category Image</Heading>
      </div>
      <div className="px-6 py-4">
        <CategoryImageForm category={data} />
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product_category.details.after",
});

export default CategoryImageDetailWidget;
