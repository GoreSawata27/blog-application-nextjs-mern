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
      <div>
        <input
          id="Name"
          name="Name"
          type="text"
          autoComplete="email"
          placeholder="Afterglow"
          className="block w-[225px] rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
        />
      </div>
      <div class="flex gap-6 -space-x-2 overflow-hidden">
        <img
          class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
