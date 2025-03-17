import { Button } from "@/components/ui/button"; 
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Sidebar from "../Sidebar/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN"
        ? navigate("/admin/withdrawal")
        : navigate("/profile");
    }
  };

  return (
    <>
      <div className="px-2 py-3 border-b z-50 bg-background sticky top-0 left-0 right-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full h-11 w-11" variant="ghost" size="icon">
                <DragHandleHorizontalIcon className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Branding */}
          <p onClick={() => navigate("/")} className="text-sm lg:text-base cursor-pointer">
            Zosh Trading
          </p>

          {/* Search Button */}
          <div className="p-0 ml-9">
            <Button variant="outline" onClick={() => navigate("/search")} className="flex items-center gap-3">
              <MagnifyingGlassIcon className="left-2 top-3" />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {/* User Avatar */}
        <div>
          <Avatar className="cursor-pointer" onClick={handleNavigate}>
            {!auth.user ? (
              <AvatarFallback>U</AvatarFallback>
            ) : (
              <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;



