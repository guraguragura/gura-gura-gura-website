
export type UnifiedOrderStatus = 
  | 'pending_payment'
  | 'paid' 
  | 'processing'
  | 'ready_for_pickup'
  | 'assigned_to_driver'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed_delivery'
  | 'cancelled'
  | 'refunded';

export const getUnifiedStatusColor = (status: UnifiedOrderStatus): string => {
  switch (status) {
    case 'pending_payment': return 'bg-yellow-100 text-yellow-800';
    case 'paid': return 'bg-green-100 text-green-800';
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'ready_for_pickup': return 'bg-purple-100 text-purple-800';
    case 'assigned_to_driver': return 'bg-indigo-100 text-indigo-800';
    case 'picked_up': return 'bg-orange-100 text-orange-800';
    case 'out_for_delivery': return 'bg-amber-100 text-amber-800';
    case 'delivered': return 'bg-emerald-100 text-emerald-800';
    case 'failed_delivery': return 'bg-red-100 text-red-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    case 'refunded': return 'bg-slate-100 text-slate-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getNextUnifiedStatus = (currentStatus: UnifiedOrderStatus): UnifiedOrderStatus | null => {
  switch (currentStatus) {
    case 'pending_payment': return 'paid';
    case 'paid': return 'processing';
    case 'processing': return 'ready_for_pickup';
    case 'ready_for_pickup': return 'assigned_to_driver';
    case 'assigned_to_driver': return 'picked_up';
    case 'picked_up': return 'out_for_delivery';
    case 'out_for_delivery': return 'delivered';
    case 'failed_delivery': return 'assigned_to_driver';
    default: return null;
  }
};

export const getUnifiedStatusLabel = (status: UnifiedOrderStatus): string => {
  switch (status) {
    case 'pending_payment': return 'Pending Payment';
    case 'paid': return 'Paid';
    case 'processing': return 'Processing';
    case 'ready_for_pickup': return 'Ready for Pickup';
    case 'assigned_to_driver': return 'Assigned to Driver';
    case 'picked_up': return 'Picked Up';
    case 'out_for_delivery': return 'Out for Delivery';
    case 'delivered': return 'Delivered';
    case 'failed_delivery': return 'Failed Delivery';
    case 'cancelled': return 'Cancelled';
    case 'refunded': return 'Refunded';
    default: return 'Unknown';
  }
};

export const getNextStatusActionLabel = (nextStatus: UnifiedOrderStatus): string => {
  switch (nextStatus) {
    case 'paid': return 'Mark as Paid';
    case 'processing': return 'Start Processing';
    case 'ready_for_pickup': return 'Mark Ready for Pickup';
    case 'assigned_to_driver': return 'Assign to Driver';
    case 'picked_up': return 'Mark as Picked Up';
    case 'out_for_delivery': return 'Mark Out for Delivery';
    case 'delivered': return 'Mark as Delivered';
    default: return 'Update Status';
  }
};

export const formatUnifiedStatusText = (status: UnifiedOrderStatus): string => {
  return getUnifiedStatusLabel(status);
};

export const getStatusProgress = (status: UnifiedOrderStatus): number => {
  const progressMap: Record<UnifiedOrderStatus, number> = {
    'pending_payment': 0,
    'paid': 15,
    'processing': 30,
    'ready_for_pickup': 45,
    'assigned_to_driver': 60,
    'picked_up': 75,
    'out_for_delivery': 90,
    'delivered': 100,
    'failed_delivery': 85,
    'cancelled': 0,
    'refunded': 0
  };
  return progressMap[status] || 0;
};

export const isDriverActionableStatus = (status: UnifiedOrderStatus): boolean => {
  return ['assigned_to_driver', 'picked_up', 'out_for_delivery'].includes(status);
};

export const isCustomerVisibleStatus = (status: UnifiedOrderStatus): boolean => {
  return !['pending_payment'].includes(status);
};
