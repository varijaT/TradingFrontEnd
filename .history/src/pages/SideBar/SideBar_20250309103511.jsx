import PropTypes from "prop-types"; // Import PropTypes for validation
import { logout } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import {
  ExitIcon,
  HomeIcon,
  DashboardIcon,
  BookmarkIcon,
  ActivityLogIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
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

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  // Hide sidebar if user is not logged in
  if (!auth.user) return null;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt"); // Remove auth token
    navigate("/"); // Redirect to login page
    if (closeSidebar) closeSidebar(); // Close sidebar on logout
  };

  return (
    <div className="mt-10 space-y-5 w-64 bg-gray-800 text-white p-4">
      {menu.map((item, index) => (
        <Button
          key={index}
          onClick={() => {
            navigate(item.path);
            if (closeSidebar) closeSidebar(); // Close sidebar after navigation
          }}
          variant="outline"
          className="flex items-center gap-5 py-6 w-full"
        >
          <span className="w-8">{item.icon}</span>
          <p>{item.name}</p>
        </Button>
      ))}

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="flex items-center gap-5 py-6 w-full"
      >
        <span className="w-8"><ExitIcon className="h-6 w-6" /></span>
        <p>Logout</p>
      </Button>
    </div>
  );
};

// ✅ Add PropTypes validation
Sidebar.propTypes = {
  closeSidebar: PropTypes.func, // closeSidebar is a function (optional)
};

export default Sidebar;






