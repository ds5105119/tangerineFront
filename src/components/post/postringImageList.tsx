import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageDimension {
  width: number;
  height: number;
}

interface PostringImageListProps {
  images: string[];
}

const PostringImageList = ({ images }: PostringImageListProps) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimension[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const dimensions = await Promise.all(
        images.map(
          (src) =>
            new Promise<ImageDimension>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                resolve({
                  width: img.width,
                  height: img.height,
                });
              };
              img.src = src;
            })
        )
      );
      setImageDimensions(dimensions);
    };

    loadImages();
  }, [images]);

  return (
    <div className="flex min-w-full overflow-x-auto space-x-4">
      {images.map((val, index) => {
        return (
          <div
            key={index}
            className="flex-shrink-0 h-44 max-w-64 relative overflow-hidden rounded-xl hover:brightness-75 transition-all duration-200 select-none"
          >
            <img src={val} className="h-44 object-cover object-center pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};

export default PostringImageList;
