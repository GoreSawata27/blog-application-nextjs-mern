import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import _api from "@/services/_api";
import CreateBlog from "./CreateBlog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Blog = {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createBlogModal, setCreateBlogModal] = useState(false);

  const getAllBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await _api.get("/api/posts");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBlogModal = () => {
    const CheckToken = localStorage.getItem("jwtToken");

    if (!CheckToken) {
      toast.error("You must be logged in to create a blog");
      return;
    }
    setCreateBlogModal(true);
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <section className="flex justify-between px-8 py-6 ">
        <Hero name="Gore" />
        <Button className="cursor-pointer" onClick={handleCreateBlogModal}>
          + Create Blog
        </Button>

        <CreateBlog open={createBlogModal} onOpenChange={setCreateBlogModal} getAllBlogs={getAllBlogs} />
      </section>

      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}

        {!isLoading && blogs.map((blog) => <BlogCard key={blog._id} id={blog._id} {...blog} />)}

        {!isLoading && blogs.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
