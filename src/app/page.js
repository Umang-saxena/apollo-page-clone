import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import RightBar from "@/components/RightBar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 bg-white gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <RightBar />
      <Main />
    </div>
  );
}
