import axiosInstance from '@/lib/axiosInstance';
import { uploadPostProps, Post } from '@/types/api/posts';

export interface getPostProps {
  uuid: string;
}

export interface getPostListProps {
  cursor?: string | null;
  handle?: string;
}

export interface getRecommandPostListProps {
  cursor?: string | null;
}

export interface getFollowsPostListProps {
  cursor?: string | null;
}

export interface searchPostListProps {
  cursor?: string | null;
  tags?: string;
  search?: string;
}

export const getPost = async ({ uuid }: getPostProps) => {
  try {
    await axiosInstance.get(`${process.env.NEXT_PUBLIC_POST_URL}p/${uuid}/`);
  } catch (error) {
    throw error;
  }
};

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
}: getPostListProps): Promise<{ results: Post[]; next: string | null }> => {
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
}: getRecommandPostListProps): Promise<{ results: Post[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_POST_URL}p/`, {
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

export const getFollowsPostList = async ({
  cursor = null,
}: getFollowsPostListProps): Promise<{ results: Post[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_POST_URL}follows/`, {
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

export const searchPostList = async ({
  cursor = null,
  tags,
  search,
}: searchPostListProps): Promise<{ results: Post[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_POST_URL}p/`, {
    params: {
      cursor: cursor,
      page_size: 10,
      tags: tags,
      search: search,
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
