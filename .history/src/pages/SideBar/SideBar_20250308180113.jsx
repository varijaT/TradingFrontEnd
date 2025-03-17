import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menu = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "Activity", path: "/activity" },
  { name: "Wallet", path: "/wallet" },
];

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 space-y-5 w-64 bg-gray-800 text-white p-4 h-screen">
      {menu.map((item, index) => (
        <Button key={index} onClick={() => { navigate(item.path); closeSidebar(); }} variant="outline" className="flex items-center gap-5 py-6 w-full">
          <p>{item.name}</p>
        </Button>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default Sidebar;


