import { useMutation } from '@tanstack/react-query';
import { getPublicPresignedUrl, getPrivatePresignedUrl, uploadFileToS3 } from './imageApi';
import { compressImage } from '@/lib/imageCompressor';

export interface usePresignedImageProps {
  isPublic: boolean;
  image: File;
}

export const usePresignedImage = () => {
  return useMutation<string, Error, usePresignedImageProps>({
    mutationFn: async ({ isPublic, image }) => {
      const presigned = isPublic ? await getPublicPresignedUrl() : await getPrivatePresignedUrl();
      const compressedImg = await compressImage(image);
      const uploadedUrl = await uploadFileToS3(presigned, compressedImg);
      return uploadedUrl;
    },
  });
};
