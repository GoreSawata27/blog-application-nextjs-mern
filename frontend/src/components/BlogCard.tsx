import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BlogCardProps = {
  id: number;
  title: string;
  image: string;
  description: string;
  createdAt: string;
};

export default function BlogCard({ id, title, image, description, createdAt }: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <Card className="transition cursor-pointer hover:shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-xs text-gray-400">{createdAt}</p>
        </CardHeader>
        <CardContent>
          <img src={image} alt={title} className="object-cover w-full h-40 mb-3 rounded-md" />
          <p className="text-gray-600">{description.slice(0, 80)}...</p>
        </CardContent>
      </Card>
    </Link>
  );
}
