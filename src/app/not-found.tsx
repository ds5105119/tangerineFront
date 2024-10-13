import Link from 'next/link';
import { AiOutlineDisconnect } from 'react-icons/ai';

export default function Custom404() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center px-4 py-8 font-sans bg-gradient-to-b from-slate-400 via-transparent to-slate-400">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AiOutlineDisconnect className="w-16 h-16 mx-auto text-gray-300" strokeWidth={1} />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">페이지를 찾을 수 없습니다</h1>
        <p className="text-xl text-gray-500 mb-8 leading-relaxed text-pretty">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-sm"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
