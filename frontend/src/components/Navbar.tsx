import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between px-8 py-6 border-b shadow-sm bg-card text-card-foreground">
      <div className="text-xl font-bold">Blog</div>
      <div className="flex items-center gap-6 ">
        <Link to="/" className="hover:underline">
          Blogs
        </Link>
        <Link to="/sign-in" className="cursor-pointer">
          <Button variant="secondary" className="cursor-pointer">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
}
