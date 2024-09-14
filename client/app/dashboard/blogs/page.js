import Card from "@/Components/Card";
import React from "react";

export default function Blogs() {
  return (
    <>
      <div className="blog-page">
        <div className="title">Blogs</div>
        <div className="flex gap-3 btns">
          <button className="btn add-btn">Add New</button>
          <button className="btn preview-btn">Preview</button>
        </div>
      </div>

      <div className="blog-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
