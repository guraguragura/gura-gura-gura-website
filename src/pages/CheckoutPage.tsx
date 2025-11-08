
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCurrency } from '@/hooks/useCurrency';
import { CreditCard, CalendarRange, Lock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useCheckoutWithLocation } from '@/hooks/useCheckoutWithLocation';
import { DeliveryLocationConfirmation } from '@/components/address/DeliveryLocationConfirmation';

const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  zipCode: z.string().min(5, { message: 'ZIP code must be at least 5 characters' }),
  sameShippingAddress: z.boolean().default(true),
  paymentMethod: z.enum(['creditCard', 'paypal']),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  savePaymentInfo: z.boolean().default(false),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const { items, subtotal, total } = useCartContext();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { 
    initiateCheckout, 
    handleLocationConfirmed, 
    handleLocationDialogClose, 
    showLocationConfirmation, 
    pendingCheckoutData, 
    isProcessing 
  } = useCheckoutWithLocation();

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
      zipCode: '',
      sameShippingAddress: true,
      paymentMethod: 'creditCard',
      savePaymentInfo: false,
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = (data: CheckoutFormValues) => {
    initiateCheckout({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      paymentMethod: data.paymentMethod
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Gura</title>
        <meta name="description" content="Complete your purchase securely" />
      </Helmet>
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
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                  
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
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
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
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
                  
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value="creditCard" id="creditCard" />
                                <label htmlFor="creditCard" className="flex items-center cursor-pointer">
                                  <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                                  <span>Credit or Debit Card</span>
                                </label>
                              </div>
                              
                              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <label htmlFor="paypal" className="flex items-center cursor-pointer">
                                  <img src="/placeholder.svg" alt="PayPal" className="h-5 mr-2" />
                                  <span>PayPal</span>
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {paymentMethod === 'creditCard' && (
                      <div className="mt-4 space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name on Card</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="MM/YY" {...field} />
                                    <CalendarRange className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="123" type="password" {...field} />
                                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="savePaymentInfo"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 mt-4">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal">
                                Save this payment method for future purchases
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
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
                    className="w-full" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
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
      <Footer />
      
      <DeliveryLocationConfirmation
        isOpen={showLocationConfirmation}
        onClose={handleLocationDialogClose}
        initialAddress={pendingCheckoutData ? {
          address: pendingCheckoutData.address,
          district: '', // Map city to district for Rwanda
          sector: '', 
          cell: '',
          village: pendingCheckoutData.city
        } : undefined}
        onLocationConfirmed={handleLocationConfirmed}
      />
    </div>
    </>
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
