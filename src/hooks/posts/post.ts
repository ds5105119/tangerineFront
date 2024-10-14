import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import {
  getPost,
  createPost,
  getPostViaHandleList,
  getRecommandPostList,
  getFollowsPostList,
  searchPostList,
  getPostProps,
  getPostListProps,
  getRecommandPostListProps,
  getFollowsPostListProps,
  searchPostListProps,
} from './postApi';
import { uploadPostProps, Post } from '@/types/api/posts';

export const usePost = () => {
  return useMutation<void, Error, getPostProps>({
    mutationFn: getPost,
  });
};

export const useCreatePost = () => {
  return useMutation<Post, Error, uploadPostProps>({
    mutationFn: createPost,
    onError: (error) => {
      console.error('포스팅 오류:', error);
    },
  });
};

export const useHandlePostList = ({ handle }: getPostListProps) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: Post[]; next: string | null },
    Error
  >({
    queryKey: ['postList', handle],
    queryFn: ({ pageParam }) => getPostViaHandleList(pageParam as getPostListProps),
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

export const useRecommmandPostList = () => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: Post[]; next: string | null },
    Error
  >({
    queryKey: ['postList', 'recommand'],
    queryFn: ({ pageParam }) => getRecommandPostList(pageParam as getRecommandPostListProps),
    initialPageParam: { cursor: null },
    getNextPageParam: (lastPage) => (lastPage.next ? { cursor: lastPage.next } : undefined),
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

export const useFollowsPostList = () => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: Post[]; next: string | null },
    Error
  >({
    queryKey: ['postList', 'follows'],
    queryFn: ({ pageParam }) => getFollowsPostList(pageParam as getFollowsPostListProps),
    initialPageParam: { cursor: null },
    getNextPageParam: (lastPage) => (lastPage.next ? { cursor: lastPage.next } : undefined),
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

export const useSearchPostList = ({ tags, search }: searchPostListProps) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: Post[]; next: string | null },
    Error
  >({
    queryKey: ['postList', tags, search],
    queryFn: ({ pageParam }) => searchPostList(pageParam as searchPostListProps),
    initialPageParam: { cursor: null, tags: tags, search: search },
    getNextPageParam: (lastPage) => (lastPage.next ? { cursor: lastPage.next, tags, search } : undefined),
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
