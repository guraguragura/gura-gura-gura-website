
import { OrderStatus } from '../Orders';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  thumbnail?: string;
}

export interface OrderDetails {
  id: string;
  display_id: number;
  status: OrderStatus;
  date: string;
  total: number;
  items: OrderItem[];
  shipping: {
    address: string;
    method: string;
    cost: number;
  };
  payment: {
    method: string;
    last4?: string;
  };
}

export const mockOrderDetails: Record<string, OrderDetails> = {
  'ord_1234': {
    id: 'ord_1234',
    display_id: 1234,
    status: 'pending',
    date: '2023-11-01',
    total: 124.99,
    items: [
      { id: 'item_1', name: 'Wireless Headphones', quantity: 1, price: 89.99, subtotal: 89.99, thumbnail: '/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png' },
      { id: 'item_2', name: 'Phone Case', quantity: 1, price: 24.99, subtotal: 24.99, thumbnail: '/lovable-uploads/61870ac8-67b1-4faf-9fa6-e40f60010b9d.png' },
    ],
    shipping: {
      address: '123 Main St, Anytown, AN 12345',
      method: 'Standard Shipping',
      cost: 10.00
    },
    payment: {
      method: 'Credit Card',
      last4: '4242'
    }
  },
  'ord_2345': {
    id: 'ord_2345',
    display_id: 2345,
    status: 'processing',
    date: '2023-10-27',
    total: 79.95,
    items: [
      { id: 'item_3', name: 'Smart Watch', quantity: 1, price: 79.95, subtotal: 79.95, thumbnail: '/lovable-uploads/189d5b38-0cf3-4a56-9606-2caba74233ca.png' },
    ],
    shipping: {
      address: '456 Oak Ave, Somewhere, SW 67890',
      method: 'Express Shipping',
      cost: 15.00
    },
    payment: {
      method: 'PayPal'
    }
  },
  'ord_3456': {
    id: 'ord_3456',
    display_id: 3456,
    status: 'out_for_delivery',
    date: '2023-10-20',
    total: 249.50,
    items: [
      { id: 'item_4', name: 'Bluetooth Speaker', quantity: 1, price: 129.99, subtotal: 129.99, thumbnail: '/lovable-uploads/2b4f1e1c-8388-4e0a-a05c-1efa3ecbb777.png' },
      { id: 'item_5', name: 'Wireless Charger', quantity: 2, price: 49.99, subtotal: 99.98, thumbnail: '/lovable-uploads/8b872c64-6416-41e9-bcd6-fa615c17062e.png' },
      { id: 'item_6', name: 'USB Cable', quantity: 1, price: 9.99, subtotal: 9.99, thumbnail: '/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png' },
    ],
    shipping: {
      address: '789 Pine St, Elsewhere, EL 13579',
      method: 'Next Day Delivery',
      cost: 20.00
    },
    payment: {
      method: 'Credit Card',
      last4: '1234'
    }
  },
  'ord_4567': {
    id: 'ord_4567',
    display_id: 4567,
    status: 'delivered',
    date: '2023-10-15',
    total: 54.99,
    items: [
      { id: 'item_7', name: 'T-Shirt', quantity: 1, price: 29.99, subtotal: 29.99, thumbnail: '/lovable-uploads/9f9f6f6c-f423-47c6-8964-326b064c2fd8.png' },
      { id: 'item_8', name: 'Socks', quantity: 5, price: 4.99, subtotal: 24.95, thumbnail: '/lovable-uploads/4de8f3ef-2f9c-4028-b855-f7d4a316dabf.png' },
    ],
    shipping: {
      address: '321 Maple Rd, Nowhere, NW 24680',
      method: 'Standard Shipping',
      cost: 5.00
    },
    payment: {
      method: 'Credit Card',
      last4: '5678'
    }
  },
  'ord_5678': {
    id: 'ord_5678',
    display_id: 5678,
    status: 'canceled',
    date: '2023-10-10',
    total: 199.99,
    items: [
      { id: 'item_9', name: 'Tablet', quantity: 1, price: 199.99, subtotal: 199.99, thumbnail: '/lovable-uploads/5bc8b271-aa7d-4103-8681-58b3e69bf415.png' },
    ],
    shipping: {
      address: '654 Cedar Ln, Anyplace, AP 97531',
      method: 'Standard Shipping',
      cost: 10.00
    },
    payment: {
      method: 'Credit Card',
      last4: '9012'
    }
  }
};
