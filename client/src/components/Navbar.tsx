import { Link } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [alreadySignedIn, setAlreadySignedIn] = useState(false);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      setAlreadySignedIn(true);
    }
  }, [token]);

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("Name");
    localStorage.removeItem("Email");
    setAlreadySignedIn(false);
  };

  return (
    <nav className="sticky top-0 flex items-center justify-between px-8 py-6 border-b shadow-sm bg-card text-card-foreground">
      <div className="text-xl font-bold">Blog</div>
      <div className="flex items-center gap-3 ">
        <Link to="/" className="hover:underline">
          Blogs
        </Link>
        {alreadySignedIn ? (
          <Button variant="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <>
            <SignIn setAlreadySignedIn={setAlreadySignedIn} />
            <SignUp setAlreadySignedIn={setAlreadySignedIn} />
          </>
        )}
      </div>
    </nav>
  );
}
