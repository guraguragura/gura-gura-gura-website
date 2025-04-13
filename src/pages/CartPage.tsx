
import React from 'react';
import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCurrency } from '@/hooks/useCurrency';
import CartEmpty from '@/components/cart/CartEmpty';
import CartSummary from '@/components/cart/CartSummary';

const CartPage = () => {
  const { items, removeItem, updateItemQuantity, itemCount, subtotal, total } = useCartContext();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TopInfoBar />
        <Navbar />
        <div className="container mx-auto py-8 px-4 flex-grow">
          <CartEmpty />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 sm:py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Shopping Cart ({itemCount} items)</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 py-6 border-b last:border-b-0">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mx-auto sm:mx-0">
                      <img 
                        src={item.thumbnail || "/placeholder.svg"} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow w-full sm:w-auto">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-blue-600 transition-colors">
                        {item.title}
                      </Link>
                      
                      <div className="mt-1 flex items-center">
                        <span className="font-semibold">
                          {item.discount_price 
                            ? formatPrice(item.discount_price) 
                            : formatPrice(item.price)
                          }
                        </span>
                        
                        {item.discount_price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 rounded-none px-2"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="h-8 w-12 border-0 text-center focus-visible:ring-0"
                          />
                          
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 rounded-none px-2"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      
                        <div className="text-right flex-shrink-0 ml-auto sm:ml-0 w-full sm:w-auto mt-2 sm:mt-0">
                          <span className="font-semibold">
                            {formatPrice((item.discount_price || item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile-only button to continue shopping */}
              <div className="mt-4 block lg:hidden">
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link to="/">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-1 mt-4 lg:mt-0">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
