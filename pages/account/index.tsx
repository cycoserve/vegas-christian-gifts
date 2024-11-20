import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/authContext';
import { AccountSidebar } from '@/components/layouts/AccountSidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GetServerSideProps } from 'next';

// Force page to be client-side rendered
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};

export default function Account() {
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
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-2xl font-bold">{user.email}</p>
              </div>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="text-sm text-muted-foreground">
                  No recent orders found.
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
                <div className="text-sm text-muted-foreground">
                  No addresses saved yet.
                </div>
              </div>
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