"use client";

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
    <main>
      <div>sidebar</div>
      <div>{children}</div>
    </main>
  );
};

export default Layout;
