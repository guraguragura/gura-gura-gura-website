import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon, DivIcon } from 'leaflet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Check, Edit3, Loader2 } from 'lucide-react';
import { GeocodingService } from '@/services/geocoding';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationData {
  latitude: number;
  longitude: number;
  geocodedAddress?: string;
  isConfirmed: boolean;
}

interface DeliveryLocationConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  initialAddress?: {
    address?: string;
    district?: string;
    sector?: string;
    cell?: string;
    village?: string;
  };
  onLocationConfirmed: (location: LocationData) => void;
  initialLocation?: { latitude: number; longitude: number };
}

// Kigali city center as default
const KIGALI_CENTER: [number, number] = [-1.9441, 30.0619];

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const DeliveryLocationConfirmation: React.FC<DeliveryLocationConfirmationProps> = ({
  isOpen,
  onClose,
  initialAddress,
  onLocationConfirmed,
  initialLocation
}) => {
  const [currentLocation, setCurrentLocation] = useState<[number, number]>(
    initialLocation ? [initialLocation.latitude, initialLocation.longitude] : KIGALI_CENTER
  );
  const [geocodedAddress, setGeocodedAddress] = useState<string>('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);

  useEffect(() => {
    if (isOpen && initialAddress && !initialLocation) {
      geocodeInitialAddress();
    } else if (isOpen && initialLocation) {
      setCurrentLocation([initialLocation.latitude, initialLocation.longitude]);
      setShowMap(true);
      reverseGeocodeLocation(initialLocation.latitude, initialLocation.longitude);
    } else if (isOpen && !initialAddress && !initialLocation) {
      // No address provided, show manual map selection
      setShowMap(true);
      setIsAdjusting(true);
    }
  }, [isOpen, initialAddress, initialLocation]);

  const geocodeInitialAddress = async () => {
    if (!initialAddress) return;

    setIsGeocoding(true);
    try {
      const result = await GeocodingService.geocodeAddress(initialAddress);
      
      if (result) {
        setCurrentLocation([result.latitude, result.longitude]);
        setGeocodedAddress(result.displayName);
        setShowMap(true);
      } else {
        // No geocoding result, show manual selection
        setShowMap(true);
        setIsAdjusting(true);
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
      setShowMap(true);
      setIsAdjusting(true);
    } finally {
      setIsGeocoding(false);
    }
  };

  const reverseGeocodeLocation = async (lat: number, lng: number) => {
    try {
      const address = await GeocodingService.reverseGeocode(lat, lng);
      if (address) {
        setGeocodedAddress(address);
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
  };

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setCurrentLocation([lat, lng]);
    reverseGeocodeLocation(lat, lng);
    setIsAdjusting(true);
  }, []);

  const handleConfirmLocation = () => {
    onLocationConfirmed({
      latitude: currentLocation[0],
      longitude: currentLocation[1],
      geocodedAddress,
      isConfirmed: true
    });
    onClose();
  };

  const handleAdjustLocation = () => {
    setIsAdjusting(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Confirm Delivery Location
          </DialogTitle>
        </DialogHeader>

        {isGeocoding && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Finding your location...</span>
          </div>
        )}

        {showMap && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">📍 Is this your correct delivery location?</CardTitle>
                {geocodedAddress && (
                  <p className="text-sm text-muted-foreground">{geocodedAddress}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 w-full rounded-lg overflow-hidden border">
                  <MapContainer
                    center={currentLocation}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    key={`${currentLocation[0]}-${currentLocation[1]}`}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={currentLocation}
                      draggable={isAdjusting}
                      eventHandlers={{
                        dragend: (e) => {
                          const marker = e.target;
                          const position = marker.getLatLng();
                          handleLocationSelect(position.lat, position.lng);
                        },
                      }}
                    />
                    {isAdjusting && (
                      <MapClickHandler onLocationSelect={handleLocationSelect} />
                    )}
                  </MapContainer>
                </div>

                {isAdjusting && (
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    💡 <strong>Tip:</strong> Drag the marker or tap on the map to set your exact delivery location.
                  </div>
                )}

                <div className="flex gap-3">
                  {!isAdjusting ? (
                    <>
                      <Button onClick={handleConfirmLocation} className="flex-1">
                        <Check className="h-4 w-4 mr-2" />
                        Yes, Confirm
                      </Button>
                      <Button variant="outline" onClick={handleAdjustLocation} className="flex-1">
                        <Edit3 className="h-4 w-4 mr-2" />
                        No, Adjust
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleConfirmLocation} className="w-full">
                      <Check className="h-4 w-4 mr-2" />
                      Confirm This Location
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};