import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="max-w-4xl w-full py-12 sm:py-0 sm:h-main flex items-center justify-between">
        <HomePage />
      </div>
    </main>
  );
}
