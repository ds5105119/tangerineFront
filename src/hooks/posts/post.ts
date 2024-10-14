import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { createPost, getPostViaHandleList, getChatMessageListProps } from './postApi';
import { uploadPostProps, Post } from '@/types/api/posts';

export const useCreatePost = () => {
  return useMutation<Post, Error, uploadPostProps>({
    mutationFn: createPost,
    onError: (error) => {
      console.error('포스팅 오류:', error);
    },
  });
};

export const useHandlePostList = ({ handle }: getChatMessageListProps) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: Post[]; next: string | null },
    Error
  >({
    queryKey: ['chatRoomList', handle],
    queryFn: ({ pageParam }) => getPostViaHandleList(pageParam as getChatMessageListProps),
    initialPageParam: { cursor: null, handle: handle },
    getNextPageParam: (lastPage) => (lastPage.next ? { cursor: lastPage.next, handle } : undefined),
  });

  return {
    posts: data?.pages.flatMap((page) => page.results),
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
