
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'assigned_to_driver': return 'bg-blue-100 text-blue-800';
    case 'picked_up': return 'bg-yellow-100 text-yellow-800';
    case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getNextStatus = (currentStatus: string): string | null => {
  switch (currentStatus) {
    case 'assigned_to_driver': return 'picked_up';
    case 'picked_up': return 'out_for_delivery';
    case 'out_for_delivery': return 'delivered';
    default: return null;
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'picked_up': return 'Mark as Picked Up';
    case 'out_for_delivery': return 'Mark Out for Delivery';
    case 'delivered': return 'Mark as Delivered';
    default: return 'Update Status';
  }
};

export const formatStatusText = (status: string): string => {
  return status.replace('_', ' ');
};
