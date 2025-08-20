import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import _api from "@/services/_api";
import { useEffect, useState } from "react";
import type { BlogType } from "@/types/blog.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/DateConverter";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const getBlog = async () => {
    setLoading(true);
    try {
      const response = await _api.get(`/api/posts/${id}`);
      setBlog(response.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <Skeleton className="h-64 w-full rounded-md md:w-1/2" />
          <div className="flex flex-col flex-1 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return <div className="p-6">Blog not found.</div>;

  return (
    <div className="max-w-8xl p-6 mx-auto">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-2/5">
          <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover rounded-md" />
        </div>

        <div className="flex flex-col justify-between flex-1 md:w-3/5">
          <div>
            <div className="flex gap-4 items-center justify-between mt-6">
              <h1 className="mb-2 text-3xl font-bold">{blog.title}</h1>
              <span className="flex gap-4">
                <Button variant="default" onClick={() => alert("Edit feature coming soon")}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    alert("Deleted");
                    navigate("/");
                  }}
                >
                  Delete
                </Button>
              </span>
            </div>
            <p className="mb-4 text-sm text-gray-400">{formatDate(blog.createdAt)}</p>
            <p className="text-gray-700">{blog.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
