'use client';

import { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useHandlePostList } from '@/hooks/posts/post';
import { useUser } from '@/hooks/accounts/account';
import { useInView } from 'react-intersection-observer';
import Post from '@/components/post/post';
import UserPreview from '@/components/user/userPreview';

export default function Home() {
  const { handle } = useParams();
  const { data: user, isError } = useUser(handle as string);
  const { ref, inView } = useInView();
  const { posts, hasNextPage, fetchNextPage } = useHandlePostList({ handle: handle as string });

  useEffect(() => {
    if (isError) {
      notFound();
    }
  }, [isError]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className="flex flex-1 justify-center w-full overflow-auto min-h-[calc(100dvh-64px)] h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] lg:min-h-screen lg:h-screen lg:max-h-screen">
      <div className="flex flex-col items-center w-full lg:w-[600px] py-10 lg:py-20">
        <div className="w-full px-6 lg:px-0 mb-10">
          <UserPreview handle={user?.handle} />
        </div>

        {posts?.map((post, index) => {
          return <Post {...post} key={index} />;
        })}
        <div ref={ref} />
      </div>
    </main>
  );
}
