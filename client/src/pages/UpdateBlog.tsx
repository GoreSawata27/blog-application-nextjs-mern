"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import _authApi from "@/services/_authApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface UpdateBlogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getUpdatedBlog: () => void;
  blog: {
    _id: string;
    title: string;
    description: string;
    image: string;
  } | null;
}

export default function UpdateBlog({ open, onOpenChange, getUpdatedBlog, blog }: UpdateBlogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setImageFile(null);
    }
  }, [blog]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    if (!title || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = blog.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile as File);
        formData.append("upload_preset", "ml_default");
        formData.append("cloud_name", "dgfc01mnb");

        const imageUploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dgfc01mnb/image/upload",
          formData
        );

        imageUrl = imageUploadResponse.data.secure_url;
      }

      const updatedBlog = {
        title,
        description,
        image: imageUrl,
      };

      await _authApi.put(`/api/posts/${blog._id}`, updatedBlog);

      toast.success("Blog updated successfully");

      setImageFile(null);
      onOpenChange(false);
      getUpdatedBlog();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your blog description..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
            {blog?.image && !imageFile && (
              <img src={blog.image} alt="Current" className="h-24 w-24 object-cover rounded-md mt-2" />
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Updating..." : "Update Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
