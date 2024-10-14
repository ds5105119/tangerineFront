'use client';

import { useEffect } from 'react';
import { useRecommmandPostList } from '@/hooks/posts/post';
import { useInView } from 'react-intersection-observer';
import Post from '@/components/post/post';

export default function Home() {
  const { ref: recommandRef, inView: recommandInView } = useInView();
  const {
    posts: recommandPosts,
    hasNextPage: recommandHasNextPage,
    fetchNextPage: recommandFetchNextPage,
  } = useRecommmandPostList();

  useEffect(() => {
    if (recommandInView && recommandHasNextPage) {
      recommandFetchNextPage();
    }
  }, [recommandInView]);

  return (
    <main className="flex flex-1 justify-center w-full overflow-auto min-h-[calc(100dvh-64px)] h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] lg:min-h-screen lg:h-screen lg:max-h-screen">
      <div className="flex flex-col items-center w-full lg:w-[600px] py-10 lg:py-20">
        {recommandPosts?.map((post, index) => {
          return <Post {...post} key={index} />;
        })}
        <div ref={recommandRef} className="h-0" />
      </div>
    </main>
  );
}
