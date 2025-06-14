
import { UnifiedOrderStatus } from '@/utils/unifiedOrderStatusUtils';

export const mockDriverProfile = {
  id: 'driver-123',
  user_id: 'user-456',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+250788123456',
  email: 'john.doe@example.com',
  driver_license: 'DL123456789',
  vehicle_type: 'motorbike',
  is_active: true,
  is_available: true,
  current_location: { lat: -1.9706, lng: 30.1044 }, // Kigali coordinates
  metadata: {},
  created_at: '2024-01-15T08:00:00.000Z',
  updated_at: '2024-06-14T10:30:00.000Z',
};

export const mockAvailableOrders = [
  {
    id: 'order-001',
    display_id: 1234,
    status: 'pending',
    unified_status: 'ready_for_pickup' as UnifiedOrderStatus,
    delivery_status: 'ready_for_pickup',
    customer_id: 'customer-001',
    shipping_address_id: 'addr-001',
    billing_address_id: 'addr-002',
    currency_code: 'RWF',
    email: 'customer@example.com',
    driver_id: null,
    assigned_at: null,
    picked_up_at: null,
    delivered_at: null,
    created_at: '2024-06-14T09:15:00.000Z',
    updated_at: '2024-06-14T09:15:00.000Z',
    metadata: {}
  },
  {
    id: 'order-002',
    display_id: 1235,
    status: 'pending',
    unified_status: 'ready_for_pickup' as UnifiedOrderStatus,
    delivery_status: 'ready_for_pickup',
    customer_id: 'customer-002',
    shipping_address_id: 'addr-003',
    billing_address_id: 'addr-004',
    currency_code: 'RWF',
    email: 'another@example.com',
    driver_id: null,
    assigned_at: null,
    picked_up_at: null,
    delivered_at: null,
    created_at: '2024-06-14T08:45:00.000Z',
    updated_at: '2024-06-14T08:45:00.000Z',
    metadata: {}
  },
  {
    id: 'order-003',
    display_id: 1236,
    status: 'pending',
    unified_status: 'ready_for_pickup' as UnifiedOrderStatus,
    delivery_status: 'ready_for_pickup',
    customer_id: 'customer-003',
    shipping_address_id: 'addr-005',
    billing_address_id: 'addr-006',
    currency_code: 'RWF',
    email: 'thirdcustomer@example.com',
    driver_id: null,
    assigned_at: null,
    picked_up_at: null,
    delivered_at: null,
    created_at: '2024-06-14T07:30:00.000Z',
    updated_at: '2024-06-14T07:30:00.000Z',
    metadata: {}
  }
];

export const mockAssignedOrders = [
  {
    id: 'order-004',
    display_id: 1237,
    status: 'processing',
    unified_status: 'assigned_to_driver' as UnifiedOrderStatus,
    delivery_status: 'assigned_to_driver',
    customer_id: 'customer-004',
    shipping_address_id: 'addr-007',
    billing_address_id: 'addr-008',
    currency_code: 'RWF',
    email: 'assigned@example.com',
    driver_id: 'driver-123',
    assigned_at: '2024-06-14T08:00:00.000Z',
    picked_up_at: null,
    delivered_at: null,
    created_at: '2024-06-14T07:00:00.000Z',
    updated_at: '2024-06-14T08:00:00.000Z',
    metadata: {}
  },
  {
    id: 'order-005',
    display_id: 1238,
    status: 'processing',
    unified_status: 'picked_up' as UnifiedOrderStatus,
    delivery_status: 'picked_up',
    customer_id: 'customer-005',
    shipping_address_id: 'addr-009',
    billing_address_id: 'addr-010',
    currency_code: 'RWF',
    email: 'pickedup@example.com',
    driver_id: 'driver-123',
    assigned_at: '2024-06-14T07:30:00.000Z',
    picked_up_at: '2024-06-14T09:00:00.000Z',
    delivered_at: null,
    created_at: '2024-06-14T06:30:00.000Z',
    updated_at: '2024-06-14T09:00:00.000Z',
    metadata: {}
  }
];
