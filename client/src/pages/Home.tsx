import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";

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
  {
    id: 3,
    title: "Tailwind Guide",
    image: "https://via.placeholder.com/400",
    description: "Master Tailwind CSS utilities",
    createdAt: "2025-08-15",
  },
  {
    id: 4,
    title: "Tailwind Guide",
    image: "https://via.placeholder.com/400",
    description: "Master Tailwind CSS utilities",
    createdAt: "2025-08-15",
  },
];

export default function Home() {
  return (
    <div>
      <Hero name="Gore" />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
}
