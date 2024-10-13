import axiosInstance from '@/lib/axiosInstance';

interface createFollowProps {
  handle: string;
}

export const createFollow = async ({ handle }: createFollowProps): Promise<void> => {
  await axiosInstance.post(`${process.env.NEXT_PUBLIC_FOLLOWS_URL}`, {
    handle: handle,
  });
};

export const deleteFollow = async ({ handle }: createFollowProps): Promise<void> => {
  await axiosInstance.delete(`${process.env.NEXT_PUBLIC_FOLLOWS_URL}${handle}/unfollow/`, {});
};
