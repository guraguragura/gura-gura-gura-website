
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, MapPin, CheckCircle, Clock, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderNrRegex = /^[A-Za-z0-9-]{3,20}$/;
  const isValid = orderNrRegex.test(orderNumber.trim());

  useEffect(() => {
    document.title = "Track Order — Gura";
  }, []);

  const formatDate = (value?: string | null) => {
    if (!value) return undefined;
    try {
      return format(new Date(value), "PPP p");
    } catch {
      return value as string;
    }
  };
  const handleTrackOrder = async () => {
    const trimmed = orderNumber.trim();
    if (!trimmed || !isValid) {
      setError('Please enter a valid order number.');
      return;
    }
    setLoading(true);
    setError(null);
    setTrackingResult(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('order-tracking-lookup', {
        body: { orderNumber: trimmed },
      });

      if (fnError || !data?.success) {
        setError((data as any)?.error || 'Order not found');
      } else {
        setTrackingResult((data as any).data);
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <PageLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Package className="h-8 w-8 text-blue-500" />
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your order number to get real-time updates on your delivery
          </p>
        </div>

        {/* Tracking Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="orderNumber">Order Number</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="orderNumber"
                    placeholder="Enter your order number (e.g., GU123456789)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="flex-1"
                  />
<Button onClick={handleTrackOrder} disabled={loading || !isValid} className="flex items-center gap-2">
  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
  {loading ? 'Tracking...' : 'Track Order'}
</Button>
                </div>
              </div>
<div className="space-y-2">
  <p className="text-sm text-gray-600">
    You can find your order number in your confirmation email or account dashboard.
  </p>
  {orderNumber && !isValid && (
    <p className="text-sm text-destructive">Invalid order number format.</p>
  )}
  {error && <p className="text-sm text-destructive">{error}</p>}
</div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-6">
            {/* Order Status Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Order Number</h3>
                    <p className="text-lg font-bold">{trackingResult.orderNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                    <Badge className="bg-blue-500">{trackingResult.status}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Estimated Delivery</h3>
                    <p className="text-lg font-bold text-green-600">{trackingResult.estimatedDelivery ? formatDate(trackingResult.estimatedDelivery) : 'Not available yet'}</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Current Location</p>
                    <p className="text-gray-600">{trackingResult.currentLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Tracking Timeline</h3>
                <div className="space-y-6">
                  {trackingResult.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : step.current 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : step.current ? (
                            <Truck className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        {index < trackingResult.steps.length - 1 && (
                          <div className={`w-0.5 h-8 mt-2 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {step.title}
                          {step.current && <Badge className="ml-2 bg-blue-500">Current</Badge>}
                        </h4>
                        {step.date && (
                          <p className="text-sm text-gray-600 mt-1">{formatDate(step.date) || '-'}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {trackingResult.attempts?.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Delivery Attempts</h3>
                  <div className="space-y-3">
                    {trackingResult.attempts.map((a: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{a.status}</span>
                        </div>
                        <span className="text-sm text-gray-600">{formatDate(a.attempted_at) || '-'}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Delivery Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                    <p className="text-gray-600">
                      {trackingResult?.deliveryAddress ? (
                        <>
                          {trackingResult.deliveryAddress.address}
                          {trackingResult.deliveryAddress.address_2 && (<><br />{trackingResult.deliveryAddress.address_2}</>)}
                          <br />
                          {[trackingResult.deliveryAddress.city, trackingResult.deliveryAddress.district].filter(Boolean).join(', ')}
                          <br />
                          {trackingResult.deliveryAddress.geocoded_address || trackingResult.deliveryAddress.country_code || 'Rwanda'}
                        </>
                      ) : (
                        'Address details not available yet.'
                      )}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Instructions</h4>
                    <p className="text-gray-600">
                      Please call upon arrival. Leave at front door if no answer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about your order, our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">Contact Support</Button>
              <Button variant="outline">View Order Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TrackOrderPage;
