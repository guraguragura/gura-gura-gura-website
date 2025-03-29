
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle, 
  Package 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ReturnRequest {
  id: string;
  order_id: string;
  order_item_id: string;
  reason: string;
  description: string | null;
  status: string; // Changed from strict union type to string to match database
  quantity: number;
  created_at: string;
}

// Status configuration with icons and colors
const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  pending: { 
    icon: <Clock className="h-5 w-5" />, 
    color: 'text-yellow-500', 
    label: 'Pending' 
  },
  approved: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: 'text-blue-500', 
    label: 'Approved' 
  },
  completed: { 
    icon: <Package className="h-5 w-5" />, 
    color: 'text-green-500', 
    label: 'Completed' 
  },
  rejected: { 
    icon: <XCircle className="h-5 w-5" />, 
    color: 'text-red-500', 
    label: 'Rejected' 
  }
};

export const Returns = () => {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const { data, error } = await supabase
          .from('customer_return_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReturns(data || []);
      } catch (err) {
        console.error('Error fetching returns:', err);
        setError('Failed to load your return requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const initiateNewReturn = () => {
    navigate('/account/orders');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Returns</h2>
          <p className="text-gray-500 mt-1">Manage your product returns</p>
        </div>
        <div className="border rounded-lg p-6 text-center py-12">
          <p className="text-gray-500">Loading your return requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Returns</h2>
          <p className="text-gray-500 mt-1">Manage your product returns</p>
        </div>
        <div className="border rounded-lg p-6 text-center py-12 bg-red-50">
          <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <p className="text-red-500">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (returns.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Returns</h2>
          <p className="text-gray-500 mt-1">Manage your product returns</p>
        </div>
        <div className="border rounded-lg p-6 text-center py-12">
          <p className="text-gray-500">You don't have any returns.</p>
          <Button 
            onClick={initiateNewReturn}
            className="mt-4"
          >
            Return an Item
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Returns</h2>
          <p className="text-gray-500 mt-1">Manage your product returns</p>
        </div>
        <Button onClick={initiateNewReturn}>Return an Item</Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {returns.map((returnRequest) => (
                <tr key={returnRequest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{returnRequest.order_id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{returnRequest.reason}</div>
                    {returnRequest.description && (
                      <div className="text-xs text-gray-500 truncate max-w-xs">{returnRequest.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(returnRequest.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${statusConfig[returnRequest.status]?.color || 'text-gray-500'}`}>
                      {statusConfig[returnRequest.status]?.icon || <Clock className="h-5 w-5" />}
                      <span className="ml-1.5">{statusConfig[returnRequest.status]?.label || returnRequest.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{returnRequest.quantity}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
