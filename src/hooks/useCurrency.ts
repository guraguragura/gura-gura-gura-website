
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface Currency {
  code: string;
  symbol: string;
}

export const useCurrency = () => {
  const [currency, setCurrency] = useState<Currency>({ code: 'RWF', symbol: 'RWF ' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      setIsLoading(true);
      try {
        // First fetch the default store currency
        const { data: storeCurrency, error: storeError } = await supabase
          .from('store_currency')
          .select('currency_code')
          .eq('is_default', true)
          .maybeSingle();
          
        if (storeError) {
          throw new Error(`Error fetching store currency: ${storeError.message}`);
        }
        
        if (storeCurrency) {
          // Then fetch the currency details based on the code
          const { data: currencyDetails, error: currencyError } = await supabase
            .from('currency')
            .select('code, symbol')
            .eq('code', storeCurrency.currency_code)
            .maybeSingle();
          
          if (currencyError) {
            throw new Error(`Error fetching currency details: ${currencyError.message}`);
          }
          
          if (currencyDetails) {
            setCurrency(currencyDetails);
          }
        }
      } catch (err) {
        console.error("Failed to fetch currency:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCurrency();
  }, []);

  const formatPrice = (price: number) => {
    try {
      const isRWF = currency.code?.toUpperCase() === 'RWF'
      const formatted = new Intl.NumberFormat(undefined, {
        style: 'decimal',
        minimumFractionDigits: isRWF ? 0 : 2,
        maximumFractionDigits: isRWF ? 0 : 2,
      }).format(isRWF ? Math.round(price) : price)
      return `${currency.symbol}${formatted}`
    } catch {
      return `${currency.symbol}${currency.code?.toUpperCase() === 'RWF' ? Math.round(price) : price.toFixed(2)}`
    }
  };

  return { currency, isLoading, error, formatPrice };
};
