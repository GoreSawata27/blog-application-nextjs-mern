type HeroProps = { name: string };

export default function Hero({ name }: HeroProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome, {name} 👋</h1>
      <p className="text-gray-500">Read and explore amazing blogs</p>
    </div>
  );
}
