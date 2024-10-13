import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { presignedPostUrl } from '@/types/api/images';

export const getPublicPresignedUrl = async (): Promise<presignedPostUrl> => {
  try {
    const request = await axiosInstance.get(`${process.env.NEXT_PUBLIC_PRESIGNED_URL}public/`, {});
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getPrivatePresignedUrl = async (): Promise<presignedPostUrl> => {
  try {
    const request = await axiosInstance.get(`${process.env.NEXT_PUBLIC_PRESIGNED_URL}private/`, {});
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFileToS3 = async (presignedPostData: presignedPostUrl, file: File) => {
  const formData = new FormData();

  Object.entries(presignedPostData.fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  formData.append('file', file);

  try {
    await axios.post(presignedPostData.url, formData);
  } catch (error) {
    console.log(error);
  }
  return `${presignedPostData.url}${presignedPostData.fields.key}`;
};

export async function uploadFileToR2(presignedPostData: presignedPostUrl, file: File) {
  const url = presignedPostData.url;
  try {
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  } catch (error) {
    throw error;
  }

  return `${url.split('?')[0]}`;
}
