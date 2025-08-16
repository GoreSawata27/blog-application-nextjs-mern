import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    id: 1,
    title: "React Basics",
    image: "https://via.placeholder.com/400",
    description: "Learn React from scratch",
    createdAt: "2025-08-16",
  },
  {
    id: 2,
    title: "Tailwind Guide",
    image: "https://via.placeholder.com/400",
    description: "Master Tailwind CSS utilities",
    createdAt: "2025-08-15",
  },
];

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) return <div className="p-6">Blog not found.</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">{blog.title}</h1>
      <p className="mb-4 text-sm text-gray-400">{blog.createdAt}</p>
      <img src={blog.image} alt={blog.title} className="object-cover w-full mb-6 rounded-md" />
      <p className="text-gray-700">{blog.description}</p>

      <div className="flex gap-4 mt-6">
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
      </div>
    </div>
  );
}
