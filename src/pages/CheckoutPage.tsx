import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCurrency } from '@/hooks/useCurrency';
import { ShieldCheck, Loader2, CreditCard } from 'lucide-react';
import { useCheckout } from '@/hooks/useCheckout';
import { MoMoPaymentModal } from '@/components/checkout/MoMoPaymentModal';

const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'Province must be at least 2 characters' }),
  sameShippingAddress: z.boolean().default(true),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const { items, subtotal, total } = useCartContext();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { 
    processCheckout, 
    isProcessing, 
    invoice, 
    showPaymentWidget, 
    handlePaymentSuccess,
    handlePaymentClose
  } = useCheckout();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      sameShippingAddress: true,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Form submitted with data:', data);
    processCheckout({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: '' // Empty since we removed postal code
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Contact Information */}
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="250781234567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                  
                  {/* Shipping Address */}
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Kigali" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                              <Input placeholder="Kigali City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="sameShippingAddress"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 mt-4">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            Billing address is the same as shipping address
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </Card>
                  
                  <div className="lg:hidden">
                    <OrderSummary 
                      items={items} 
                      subtotal={subtotal} 
                      total={total} 
                      formatPrice={formatPrice} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg border">
                    <ShieldCheck className="h-6 w-6 text-green-500 mr-2" />
                    <p className="text-sm text-gray-600">
                      Your payment information is secure. We use industry-standard encryption to protect your data.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Creating Order & Loading Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-3 h-6 w-6" />
                        Place Order & Pay {formatPrice(total)}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="hidden lg:block">
              <OrderSummary 
                items={items} 
                subtotal={subtotal} 
                total={total} 
                formatPrice={formatPrice} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <MoMoPaymentModal
        isOpen={showPaymentWidget}
        onClose={handlePaymentClose}
        invoice={invoice}
        onPaymentSuccess={handlePaymentSuccess}
      />
      
      <Footer />
    </div>
  );
};

interface OrderSummaryProps {
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
    discount_price?: number;
  }>;
  subtotal: number;
  total: number;
  formatPrice: (price: number) => string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, total, formatPrice }) => {
  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="max-h-80 overflow-y-auto mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex py-3 border-b last:border-b-0">
            <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 relative">
              <span className="absolute -right-2 -top-2 bg-gray-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                {item.quantity}
              </span>
              <img 
                src={item.thumbnail || "/placeholder.svg"} 
                alt={item.title} 
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="ml-3 flex-grow">
              <p className="text-sm font-medium line-clamp-1">{item.title}</p>
              <p className="text-sm text-gray-500">
                {formatPrice(item.discount_price || item.price)} x {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {formatPrice((item.discount_price || item.price) * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </Card>
  );
};

export default CheckoutPage;
