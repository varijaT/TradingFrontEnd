import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

const menu = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "Activity", path: "/activity" },
  { name: "Wallet", path: "/wallet" },
];

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  if (!auth.user) return null; // Ensure Sidebar is not shown for non-logged-in users

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    localStorage.removeItem("jwt"); // Remove JWT token
    navigate("/"); // Redirect to login page
    closeSidebar(); // Close the sidebar after logout
  };

  return (
    <div className="mt-10 space-y-5 w-64 bg-gray-800 text-white p-4 h-screen flex flex-col justify-between">
      <div>
        {menu.map((item, index) => (
          <Button
            key={index}
            onClick={() => { navigate(item.path); closeSidebar(); }}
            variant="outline"
            className="flex items-center gap-5 py-6 w-full"
          >
            <p>{item.name}</p>
          </Button>
        ))}
      </div>

      {/* Logout Button at the Bottom */}
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="flex items-center gap-5 py-6 w-full"
      >
        <ExitIcon className="w-6 h-6" />
        <p>Logout</p>
      </Button>
    </div>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default Sidebar;



