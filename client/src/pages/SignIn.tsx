import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import _api from "@/services/_api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await _api.post("/api/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("jwtToken", res.data?.token);
      localStorage.setItem("Name", res.data?.name);
      localStorage.setItem("Email", res.data?.email);

      toast.success("Signed in successfully ", {
        description: `Welcome back, ${res.data?.name || "User"}!`,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      const errorMessage = axiosError.response?.data?.message || "Invalid credentials. Please try again.";

      toast.error("Sign in failed", {
        description: errorMessage,
      });
      console.error("Error during signin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Sign In</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
