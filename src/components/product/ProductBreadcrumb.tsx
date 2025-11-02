
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductBreadcrumbProps {
  title: string;
  categoryName?: string;
  categoryHandle?: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ title, categoryName, categoryHandle }) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="text-gray-500 hover:text-blue-500">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {categoryName && categoryHandle ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${categoryHandle}`} className="text-gray-500 hover:text-blue-500">
                  {categoryName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/collections" className="text-gray-500 hover:text-blue-500">Collections</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold text-gray-700">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
