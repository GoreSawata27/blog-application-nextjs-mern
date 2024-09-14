import React from "react";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Card({ title, description, image, createdAt }) {
  return (
    <div className="card-container">
      <img src={image} alt={title} />
      <div className="company-name">{title}</div>
      <div className="description">{description}</div>
      <div className="time">
        <span className="icon">📅</span> {formatDate(createdAt)}
      </div>
    </div>
  );
}
