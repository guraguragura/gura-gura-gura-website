
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, MapPin, CheckCircle, Clock, Search } from "lucide-react";

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrackOrder = () => {
    // Mock tracking data
    if (orderNumber) {
      setTrackingResult({
        orderNumber: orderNumber,
        status: "In Transit",
        estimatedDelivery: "Tomorrow, Dec 23",
        currentLocation: "Kigali Distribution Center",
        steps: [
          { title: "Order Confirmed", completed: true, date: "Dec 20, 10:30 AM" },
          { title: "Processing", completed: true, date: "Dec 20, 2:15 PM" },
          { title: "Shipped", completed: true, date: "Dec 21, 9:00 AM" },
          { title: "In Transit", completed: true, date: "Dec 22, 1:45 PM", current: true },
          { title: "Out for Delivery", completed: false, date: "" },
          { title: "Delivered", completed: false, date: "" }
        ]
      });
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
                  <Button onClick={handleTrackOrder} className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Track Order
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                You can find your order number in your confirmation email or account dashboard.
              </p>
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
                    <p className="text-lg font-bold text-green-600">{trackingResult.estimatedDelivery}</p>
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
                          <p className="text-sm text-gray-600 mt-1">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                    <p className="text-gray-600">
                      123 Main Street<br />
                      Kigali, Rwanda<br />
                      +250 788 123 456
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
