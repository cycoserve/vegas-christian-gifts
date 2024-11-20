import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { ScrollArea } from "../ui/scroll-area";
import { ShoppingBag, User, Heart, Clock, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/authContext";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccountSidebar({ className }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const currentPath = router.pathname;

  const handleLogout = async () => {
    try {
      await logout();
      // AuthContext will handle redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarItems = [
    {
      title: "Profile",
      icon: User,
      href: "/account",
    },
    {
      title: "Orders",
      icon: ShoppingBag,
      href: "/account/orders",
    },
    {
      title: "Wishlist",
      icon: Heart,
      href: "/account/wishlist",
    },
    {
      title: "Order History",
      icon: Clock,
      href: "/account/history",
    },
    {
      title: "All Products",
      icon: Clock,
      href: "/products",
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Account</h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={currentPath === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
