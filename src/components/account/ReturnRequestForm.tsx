
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mockOrderDetails } from './order-details/mock-data';

interface ReturnRequestFormProps {
  orderId?: string;
  orderItemId?: string;
  productName?: string;
}

const returnReasons = [
  "Wrong item received",
  "Item damaged",
  "Item defective",
  "No longer needed",
  "Not as described",
  "Better price found elsewhere",
  "Missing parts/accessories",
  "Other"
];

const ReturnRequestForm: React.FC<ReturnRequestFormProps> = ({ 
  orderId, 
  orderItemId, 
  productName 
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = orderId || params.orderId;
  const itemId = orderItemId || params.orderItemId;
  
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canReturn, setCanReturn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Check if the order exists and is delivered
    if (id) {
      const order = mockOrderDetails[id];
      
      if (!order) {
        setError("Order not found");
        setCanReturn(false);
      } else if (order.status !== 'delivered') {
        setError("Only delivered orders can be returned");
        setCanReturn(false);
      } else if (order.status === 'canceled') {
        setError("Canceled orders cannot be returned");
        setCanReturn(false);
      } else {
        setCanReturn(true);
      }
    }
    
    setIsLoading(false);
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canReturn) {
      toast({
        title: "Error",
        description: error || "This order cannot be returned",
        variant: "destructive"
      });
      return;
    }
    
    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason for your return.",
        variant: "destructive"
      });
      return;
    }

    if (!id || !itemId) {
      toast({
        title: "Error",
        description: "Missing order information.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert the return request into Supabase
      const { error: supabaseError } = await supabase
        .from('customer_return_requests')
        .insert({
          order_id: id,
          order_item_id: itemId,
          reason,
          description,
          quantity,
          status: 'pending'
        });

      if (supabaseError) throw supabaseError;

      toast({
        title: "Return request submitted",
        description: "We have received your return request and will process it shortly."
      });
      
      // Navigate back to returns page
      navigate('/account/returns');
    } catch (error) {
      console.error('Error submitting return request:', error);
      toast({
        title: "Failed to submit request",
        description: "There was an error submitting your return request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Return Request</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return Request</CardTitle>
          <CardDescription>
            {productName ? `Return for ${productName}` : `Return for Order #${id}`}
          </CardDescription>
        </CardHeader>

        {isLoading ? (
          <CardContent>
            <p className="text-center py-4">Loading order details...</p>
          </CardContent>
        ) : !canReturn ? (
          <CardContent>
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
              <p>{error || "This order is not eligible for return."}</p>
              <p className="mt-2">Only delivered orders can be returned.</p>
            </div>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">Reason for Return</label>
                <Select onValueChange={setReason} required>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {returnReasons.map(reason => (
                      <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Additional Details</label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide any additional details about your return"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting || !canReturn}
              >
                {isSubmitting ? "Submitting..." : "Submit Return Request"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ReturnRequestForm;
