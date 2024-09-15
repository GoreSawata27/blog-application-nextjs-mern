"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [Email, setEmail] = useState("guest@gmail.com");
  const [Name, setName] = useState("Guest");

  useEffect(() => {
    const storedEmail = localStorage.getItem("Email");
    const storedName = localStorage.getItem("Name");

    setEmail(storedEmail);
    setName(storedName);
  }, []);

  return (
    <div className="navbar">
      <div></div>
      <div class="flex gap-6 -space-x-2 overflow-hidden">
        <img
          class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://res.cloudinary.com/dgfc01mnb/image/upload/v1726373829/meteorologist-digital-avatar-_er1yxf.avif"
          alt=""
        />
        <div className="flex flex-col ">
          <span className="username">{Name}</span>
          <span className="email">{Email}</span>
        </div>
      </div>
    </div>
  );
}
