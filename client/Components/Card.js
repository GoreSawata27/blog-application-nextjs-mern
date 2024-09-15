import { useRouter } from "next/navigation";

export default function Card({ title, description, image, createdAt, id }) {
  const router = useRouter();

  const handelAllDetails = () => {
    router.push(`/dashboard/blogs/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="cursor-pointer card-container" onClick={handelAllDetails}>
      <div className="flex items-center justify-center w-full ">
        <img src={image} alt={title} />
      </div>

      <div className="company-name">{title}</div>
      <div className="description">{description}</div>
      <div className="time">
        <span className="icon">📅</span> {formatDate(createdAt)}
      </div>
    </div>
  );
}
