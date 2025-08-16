import { Button } from "./ui/button";

type HeroProps = { name: string };

export default function Hero({ name }: HeroProps) {
  return (
    <section className="flex justify-between px-8 py-6 ">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {name} 👋</h1>
        <p className="text-gray-500">Read and explore amazing blogs</p>
      </div>
      <Button variant="secondary">+ Create Blog</Button>
    </section>
  );
}
