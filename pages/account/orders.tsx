import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/authContext';
import { AccountSidebar } from '@/components/layouts/AccountSidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GetServerSideProps } from 'next';

// Mock order data - replace with real data from your backend
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 129.99,
    items: [
      { name: 'Cross Necklace', quantity: 1, price: 79.99 },
      { name: 'Prayer Journal', quantity: 1, price: 50.00 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Processing',
    total: 45.99,
    items: [
      { name: 'Bible Cover', quantity: 1, price: 45.99 }
    ]
  }
];

// Force page to be client-side rendered
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};

export default function Orders() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 z-40 flex w-72 flex-col
          lg:static lg:block
          ${sidebarOpen ? 'block' : 'hidden'}
          bg-background border-r
        `}>
          <AccountSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
              {mockOrders.length > 0 ? (
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                              <span>{item.quantity}x</span>
                              <span>{item.name}</span>
                            </div>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No orders found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}