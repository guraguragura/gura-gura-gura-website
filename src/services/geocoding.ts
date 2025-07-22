interface GeocodingResult {
  latitude: number;
  longitude: number;
  displayName: string;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

export class GeocodingService {
  private static readonly BASE_URL = 'https://nominatim.openstreetmap.org';
  private static readonly RATE_LIMIT_DELAY = 1000; // 1 second between requests
  private static lastRequestTime = 0;

  private static async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      await new Promise(resolve => 
        setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }

  static async geocodeAddress(address: {
    address?: string;
    district?: string;
    sector?: string;
    cell?: string;
    village?: string;
  }): Promise<GeocodingResult | null> {
    try {
      await this.rateLimit();

      // Format address for Rwanda
      const addressParts = [
        address.address,
        address.village,
        address.cell,
        address.sector,
        address.district,
        'Rwanda'
      ].filter(Boolean);

      const query = addressParts.join(', ');
      
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        countrycodes: 'rw',
        limit: '1',
        addressdetails: '1'
      });

      const response = await fetch(`${this.BASE_URL}/search?${params}`, {
        headers: {
          'User-Agent': 'Gura-App/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }

      const results: NominatimResponse[] = await response.json();
      
      if (results.length === 0) {
        return null;
      }

      const result = results[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        displayName: result.display_name
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  static async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    try {
      await this.rateLimit();

      const params = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        format: 'json',
        zoom: '18',
        addressdetails: '1'
      });

      const response = await fetch(`${this.BASE_URL}/reverse?${params}`, {
        headers: {
          'User-Agent': 'Gura-App/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.status}`);
      }

      const result: NominatimResponse = await response.json();
      return result.display_name;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }
}