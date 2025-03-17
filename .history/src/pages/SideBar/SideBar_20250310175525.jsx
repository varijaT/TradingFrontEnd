import { logout } from "@/Redux/Auth/Action";  
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ExitIcon,
  HomeIcon,
  DashboardIcon,
  BookmarkIcon,
  ActivityLogIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6" /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
  { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-6 w-6" /> },
  { name: "Wallet", path: "/wallet", icon: <Wallet className="h-6 w-6" /> },
  { name: "Payment Details", path: "/payment-details", icon: <Landmark className="h-6 w-6" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCard className="h-6 w-6" /> },
  { name: "Profile", path: "/profile", icon: <PersonIcon className="h-6 w-6" /> },
];

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    localStorage.removeItem("jwt"); // Remove auth token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="mt-10 space-y-5">
      {menu.map((item, index) => (
        <SheetClose key={index} className="w-full">
          <Button
            onClick={() => navigate(item.path)}
            variant="outline"
            className="flex items-center gap-5 py-6 w-full"
          >
            <span className="w-8">{item.icon}</span>
            <p>{item.name}</p>
          </Button>
        </SheetClose>
      ))}

      {/* Logout Button */}
      <div className="border-t border-gray-300 mt-5 pt-5"> {/* Adds a separator before logout */}
        <SheetClose className="w-full">
          <Button
            onClick={handleLogout}
            variant="destructive" // Red-colored button
            className="flex items-center gap-5 py-6 w-full"
          >
            <span className="w-8"><ExitIcon className="h-6 w-6" /></span>
            <p>Logout</p>
          </Button>
        </SheetClose> 
      </div>
    </div>
  );
};

export default SideBar;
