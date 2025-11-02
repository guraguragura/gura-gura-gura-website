
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ProductReviews from '@/components/product/ProductReviews';

interface ProductTabsProps {
  product: {
    id: string;
    title: string;
    description: string;
    images?: string[];
    rating: number;
    reviews_count: number;
    features?: string[];
    specifications?: Record<string, any>;
  };
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  return (
    <Tabs defaultValue="description" className="mb-12">
      <TabsList className="w-full justify-start border-b rounded-none bg-transparent mb-6">
        <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none">
          Description
        </TabsTrigger>
        <TabsTrigger value="specifications" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none">
          Specifications
        </TabsTrigger>
        <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none">
          Reviews ({product.reviews_count})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <img 
                  src={product.images?.[1] || product.images?.[0]} 
                  alt={product.title} 
                  className="w-full object-contain rounded-lg mb-4"
                />
                <div className="text-center text-gray-600">
                  <p>Experience the next level of innovation with {product.title}.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="specifications" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <table className="w-full">
                  <tbody>
                    {product.specifications && Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 font-medium">{key}</td>
                        <td className="py-3 px-4 text-gray-600">{value as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <img 
                  src={product.images?.[2] || product.images?.[0]} 
                  alt={product.title} 
                  className="w-full object-contain rounded-lg mb-4"
                />
                <div className="text-center text-gray-600">
                  <p>Detailed specifications of {product.title}.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <ProductReviews 
              productId={product.id} 
              productTitle={product.title}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
