import axiosInstance from '@/lib/axiosInstance';
import { uploadPostProps, Post } from '@/types/api/posts';

export interface getChatMessageListProps {
  cursor?: string | null;
  handle?: string;
}

export const createPost = async (post: uploadPostProps) => {
  try {
    const response = await axiosInstance.post<Post>(`${process.env.NEXT_PUBLIC_POST_URL}p/`, post);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostViaHandleList = async ({
  cursor = null,
  handle,
}: getChatMessageListProps): Promise<{ results: Post[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_POST_URL}latest/${handle}/`, {
    params: {
      cursor: cursor,
      page_size: 10,
    },
  });

  let nextCursor = null;
  if (data.next) {
    const parsedUrl = new URL(data.next);
    nextCursor = parsedUrl.searchParams.get('cursor');
  }

  return {
    results: data.results,
    next: nextCursor,
  };
};

export const getRecommandPostList = async ({
  cursor = null,
}: getChatMessageListProps): Promise<{ results: Post[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_POST_URL}recommand/`, {
    params: {
      cursor: cursor,
      page_size: 10,
    },
  });

  let nextCursor = null;
  if (data.next) {
    const parsedUrl = new URL(data.next);
    nextCursor = parsedUrl.searchParams.get('cursor');
  }

  return {
    results: data.results,
    next: nextCursor,
  };
};
