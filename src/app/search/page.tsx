import TopSearchNav from '@/components/navBar/top-search-nav';

export default function Home() {
  return (
    <main className="flex w-full h-full">
      <div className="flex flex-col flex-1 overflow-auto space-y-10 lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <div className="mt-10 px-8 text-2xl font-extrabold">검색</div>
        <TopSearchNav />
      </div>
    </main>
  );
}
