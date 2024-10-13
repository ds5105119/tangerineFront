import imageCompression from 'browser-image-compression';

const compressionOptions = {
  maxSizeMB: 0.2,
  maxWidthOrHeight: 1980,
  useWebWorker: true,
  initialQuality: 0.9,
};

export async function compressImage(file: File): Promise<File> {
  try {
    // 이미지 압축기 정의
    const compressedFile = await imageCompression(file, compressionOptions);

    // JPG 변환을 위한 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    const img = new Image();
    img.src = URL.createObjectURL(compressedFile);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File([blob], file.name.replace(/\..+$/, '.jpg'), {
                  type: 'image/jpeg',
                })
              );
            } else {
              reject(new Error('Failed to convert image to JPG'));
            }
          },
          'image/jpeg',
          0.9
        );

        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}
