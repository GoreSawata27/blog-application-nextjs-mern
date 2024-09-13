"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import _noAuth from "@/utils/_noAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === " " && (email === "" || password === "")) {
      e.preventDefault();
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || name === "") {
      toast.error("Please fill in all fields", {
        duration: 3000,
        position: "top-center",
        className: "custom-toast",
        iconTheme: {
          primary: "#ffc107",
        },
      });
      return;
    }
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|mil|int|info|biz|name|pro|coop|museum|aero|jobs|mobi|travel|xxx|us|uk|in|ca|au|de|jp|fr|cn|ru|br|za|mx|es|it|nl|se|ch|ae|sg|app|blog|online|site|tech|store|io|ai|me|dev|asia|africa|eu|club|shop|news|photo|music|movie|law|рф|中国|السعودية)$/i;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      toast.error("Please enter a valid email address", {
        duration: 3000,
        position: "top-center",
        className: "custom-toast",
        iconTheme: {
          primary: "#ffc107",
        },
      });
      return;
    }
    setLoading(true);
    try {
      await _noAuth.post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      router.push("/login");
    } catch (error) {
      setLoading(false);
      const errors = error.response?.data?.message || "Something went wrong";
      toast.error(errors, {
        duration: 3000,
        position: "top-center",
        className: "custom-toast",
      });
      console.error("Error during signin:", error);
    }
  };

  return (
    <>
      <div className="h-[100vh] flex flex-col items-center justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  value={name}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                onClick={signUp}
                className="flex w-full justify-center rounded-md bg-[#6C5DD3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6C5DD3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5DD3]"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Already have an account?
            <Link href="/login" className="ml-3 text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
