"use client";

import Sidebar from "@/Components/dashboard/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div>{children}</div>
    </main>
  );
};

export default Layout;
