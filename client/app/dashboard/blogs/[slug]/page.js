"use client";

import React, { useEffect, useState } from "react";
import _api from "@/utils/_api";

export default function BlogInfo({ params }) {
  const { slug } = params;
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
          const response = await _api.get(`/api/posts/${slug}`);
          setBlog(response.data);
        } catch (err) {
          setError(err.response?.data?.message || "An error occurred");
        }
      };

      fetchBlog();
    }
  }, [slug]);

  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto my-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
        {blog.title}
      </h1>

      <div className="mb-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="object-cover rounded-lg shadow-md w-54 h-52"
        />
      </div>

      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        {blog.description}
      </p>
      <div className="flex gap-2">
        <div className="text-right">
          <button className="px-4 py-2 text-white bg-[#6C5DD3] rounded-md hover:bg-[#6f5ee0]">
            Update
          </button>
        </div>
        <div className="text-right">
          <button className="px-4 py-2 text-white bg-[#6C5DD3] rounded-md hover:bg-[#6d5cde]">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
