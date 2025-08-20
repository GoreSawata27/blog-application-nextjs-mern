import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/DateConverter";

type BlogCardProps = {
  id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
};

export default function BlogCard({ id, title, image, description, createdAt }: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-xs text-gray-400">{formatDate(createdAt)}</p>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
