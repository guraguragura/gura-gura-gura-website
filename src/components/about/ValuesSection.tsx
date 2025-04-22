
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Users, Shield, Lightbulb } from "lucide-react";

const ValuesSection = () => (
  <div className="bg-gray-50 py-12 px-6 rounded-lg">
    <div className="grid md:grid-cols-3 gap-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Our <span className="text-blue-500">Values</span>
        </h2>
        <div className="h-96 overflow-hidden rounded-lg mb-4">
          <img
            src="/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png"
            alt="Our Values"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Settings className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We are dedicated to offering quality products and services. Our stringent quality control procedures guarantee that each item upholds our high standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-gray-600">
                  We place our customers at the heart of everything we do. Our goal is to exceed customer expectations through every interaction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                <p className="text-gray-600">
                  We prioritize reliability with every order. Our commitment to fast delivery ensures that your purchases arrive swiftly and securely, every time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Lightbulb className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="text-gray-600">
                  Simplicity guides everything we offer. With intuitive navigation and clear choices, we ensure shopping is seamless, making it easy to find exactly what you're looking for.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default ValuesSection;
