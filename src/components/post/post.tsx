import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { FaHeart, FaRegHeart, FaRegMessage, FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Post as PostType } from '@/types/api/posts';
import { useTimeAgo } from '@/lib/time';

const Post: React.FC<PostType> = (post) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > 50) {
      cancel();
      if (xDir > 0 && currentImage > 0) {
        setCurrentImage(currentImage - 1);
      } else if (xDir < 0 && currentImage < post.images.length - 1) {
        setCurrentImage(currentImage + 1);
      }
    }
    set({ x: down ? mx : 0, immediate: down });
  });

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else if (direction === 'next' && currentImage < post.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const formatContent = (text: string) => {
    return text.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <Link key={index} href={`/tag/${word.slice(1)}`} className="text-blue-500 hover:underline">
            {word}{' '}
          </Link>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="w-full mx-auto pb-4 border-b border-gray-200">
      <div className="p-4 flex items-center w-full">
        <Image
          src={post.user.profile.profile_image}
          alt={post.user.username}
          width={32}
          height={32}
          className="rounded-full mr-3 h-10 w-10"
        />
        <span className="font-semibold">{post.user.username}</span>
      </div>
      <div ref={containerRef} className="relative h-96 w-full overflow-hidden">
        <animated.div {...bind()} style={{ display: 'flex', x, touchAction: 'pan-y' }} className="h-full">
          {post.images.map((img, index) => (
            <div key={index} className="h-full w-full flex-shrink-0">
              <Image
                src={img}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </animated.div>
        {post.images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
              onClick={() => navigateImage('prev')}
              disabled={currentImage === 0}
            >
              <FaAngleLeft className="w-4 h-4" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
              onClick={() => navigateImage('next')}
              disabled={currentImage === post.images.length - 1}
            >
              <FaAngleRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              {post.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setLiked(!liked)} className={`${liked ? 'text-red-500' : 'text-gray-500'}`}>
              <FaHeart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
              <FaRegHeart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-gray-500">
              <FaRegMessage className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="font-semibold mb-2">{post.likes_count.toLocaleString()} likes</div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {formatContent(post.text)}
        </p>
        <div className="text-gray-500 text-sm">{useTimeAgo(post.created_at)}</div>
      </div>
    </div>
  );
};
export default Post;
