import axiosInstance from '@/lib/axiosInstance';
import { AuthUser, User, UpdateAbleUser } from '@/types/api/accounts';

export interface getUserProps {
  handle: string;
}

export interface getUserListProps {
  page?: number;
  search?: string;
}

export interface updateUserProps {
  handle: string;
  user: UpdateAbleUser;
}

export interface loginRequestProps {
  email: string;
  password: string;
}

export interface socialLoginRequestProps {
  url: string;
  code: string;
}

export interface loginResponseProps {
  access: string;
  refresh: string;
  user: AuthUser;
}

export interface registrationProps {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export const login = async (credentials: loginRequestProps) => {
  try {
    const response = await axiosInstance.post<loginResponseProps>(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async ({ handle }: getUserProps) => {
  try {
    const response = await axiosInstance.get<User>(`${process.env.NEXT_PUBLIC_USERS_URL}${handle}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const socialLogin = async (credentials: socialLoginRequestProps) => {
  try {
    const response = await axiosInstance.post<loginResponseProps>(
      credentials.url,
      { code: credentials.code },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registration = async (credentials: registrationProps) => {
  try {
    const response = await axiosInstance.post<loginResponseProps>(
      `${process.env.NEXT_PUBLIC_REGISTRATION_URL}`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserList = async ({
  page = 1,
  search,
}: getUserListProps): Promise<{ results: User[]; next: number | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_USERS_URL}`, {
    params: {
      page: page,
      page_size: 20,
      search: search,
    },
  });

  return {
    results: data.results,
    next: data.next ? page + 1 : null,
  };
};

export const updateUser = async ({ handle, user }: updateUserProps) => {
  try {
    const response = await axiosInstance.patch(`${process.env.NEXT_PUBLIC_USERS_URL}${handle}/`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
