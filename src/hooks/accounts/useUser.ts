import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/api/accounts';
import axiosInstance from '@/lib/axiosInstance';

export const useUser = (handle: string) => {
  return useQuery<User, Error>({
    queryKey: ['user', handle],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<User>(`${process.env.NEXT_PUBLIC_USERS_URL}${handle}/`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
