"use client";
import { useState } from "react";
import axios from "axios";
import _authApi from "@/services/_authApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CreateBlogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getAllBlogs: () => void;
}

export default function CreateBlog({ open, onOpenChange, getAllBlogs }: CreateBlogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !imageFile) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile as File);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dgfc01mnb");

      const imageUploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dgfc01mnb/image/upload",
        formData
      );

      const imageUrl = imageUploadResponse.data.secure_url;

      const blogData = {
        title,
        description,
        image: imageUrl,
      };

      await _authApi.post("/api/posts", blogData);

      setTitle("");
      setDescription("");
      setImageFile(null);
      onOpenChange(false);
      getAllBlogs();
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Failed to post blog");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Blog</DialogTitle>
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
          </div>
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Posting..." : "Post Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
