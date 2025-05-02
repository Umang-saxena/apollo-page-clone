import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import FilterSideBar from "@/components/FilterSideBar";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 bg-white gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <Navbar />
    //   <FilterSideBar />
    //   <Main />
    // </div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 bg-white gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <div className="grid grid-cols-12 w-full gap-4">
        <aside className="col-span-3">
          <FilterSideBar />
        </aside>
        <main className="col-span-9">
          <Main />
        </main>
      </div>
    </div>
  );
}
