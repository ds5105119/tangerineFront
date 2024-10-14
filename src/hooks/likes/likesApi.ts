import axiosInstance from '@/lib/axiosInstance';
import { User } from '@/types/api/accounts';

export interface createPostLikeProps {
  uuid: string;
}

export interface deletePostLikeProps {
  uuid: string;
}

export interface getPostLikeListProps {
  cursor: string | null;
  uuid: string;
}

export const createPostLike = async ({ uuid }: createPostLikeProps) => {
  try {
    await axiosInstance.post(`${process.env.NEXT_PUBLIC_LIKE_POST_URL}`, { post_uuid: uuid });
  } catch (error) {
    throw error;
  }
};

export const deletePostLike = async ({ uuid }: deletePostLikeProps) => {
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_LIKE_POST_URL}${uuid}/`);
  } catch (error) {
    throw error;
  }
};

export const getPostLikeList = async ({
  cursor = null,
  uuid,
}: getPostLikeListProps): Promise<{ results: User[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_LIKE_POST_URL}`, {
    params: {
      uuid: uuid,
      cursor: cursor,
      page_size: 20,
    },
  });

  let nextCursor = null;
  if (data.next) {
    const parsedUrl = new URL(data.next);
    nextCursor = parsedUrl.searchParams.get('cursor');
  }

  return {
    results: data.results.like_user,
    next: nextCursor,
  };
};
