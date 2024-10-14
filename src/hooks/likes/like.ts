import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { createPostLike, deletePostLike, getPostLikeList, getPostLikeListProps } from './likesApi';
import { User } from '@/types/api/accounts';

export interface useCreatePostLikeProps {
  uuid: string;
}

export interface useDeletePostLikeProps {
  uuid: string;
}

export const useCreatePostLike = () => {
  return useMutation<void, Error, useCreatePostLikeProps>({
    mutationFn: createPostLike,
  });
};

export const useDeletePostLike = () => {
  return useMutation<void, Error, useDeletePostLikeProps>({
    mutationFn: deletePostLike,
  });
};

export const usePostLikeList = ({ uuid }: getPostLikeListProps) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: User[]; next: string | null },
    Error
  >({
    refetchInterval: 1000 * 10,
    queryKey: ['postLikeList', uuid],
    queryFn: ({ pageParam }) => getPostLikeList(pageParam as getPostLikeListProps),
    initialPageParam: { cursor: null, uuid: uuid },
    getNextPageParam: (lastPage) => (lastPage.next ? { cursor: lastPage.next, uuid } : undefined),
  });

  return {
    like_user: data?.pages.flatMap((page) => page.results),
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
