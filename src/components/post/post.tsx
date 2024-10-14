import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart, FaRegMessage, FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Post as PostType } from '@/types/api/posts';
import { useTimeAgo } from '@/lib/time';
import { useCreatePostLike, useDeletePostLike } from '@/hooks/likes/like';
import { usePost } from '@/hooks/posts/post';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import useAuthStore from '@/lib/auth';

const Post: React.FC<PostType> = (post) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(post.likes_count);
  const [requestSent, setRequestSent] = useState(false);
  const { auth } = useAuthStore();
  const createPostLikeHandler = useCreatePostLike();
  const deletePostLikeHandler = useDeletePostLike();
  const historyPostHandler = usePost();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else if (direction === 'next' && currentImage < post.images.length - 1) {
      setCurrentImage((prev) => prev + 1);
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

  const handleLikeToggle = () => {
    if (auth) {
      if (liked) {
        deletePostLikeHandler.mutate({ uuid: post.uuid });
        setLikeCount((prev) => prev - 1);
      } else {
        createPostLikeHandler.mutate({ uuid: post.uuid });
        setLikeCount((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    setLiked(post.is_liked);
    setLikeCount(post.likes_count);
  }, [post]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (inView && !requestSent) {
      timer = setTimeout(() => {
        historyPostHandler.mutate({ uuid: post.uuid });
        setRequestSent(true);
      }, 10000);
    } else if (!inView) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [inView, requestSent]);

  return (
    <div className="w-full mx-auto pb-4 border-b border-gray-200">
      <div className="p-4 flex items-center w-full">
        <Image
          src={post.user.profile.profile_image || '/defaultUserIcon.png'}
          alt={post.user.username}
          width={32}
          height={32}
          className="rounded-full mr-3 h-10 w-10"
        />
        <span className="font-semibold align-middle">{post.user.username}</span>
      </div>
      <div className="relative w-full overflow-hidden" ref={ref}>
        {post.images.length > 0 ? (
          <div
            className="flex h-96 transition-transform duration-500 ease-in-out"
            style={{
              width: `${post.images.length * 100}%`,
              transform: `translateX(-${(currentImage * 100) / post.images.length}%)`,
            }}
          >
            {post.images.map((img, index) => (
              <div key={index} className="h-full" style={{ width: `${100 / post.images.length}%` }}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Post image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-0" />
        )}
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
            <button onClick={handleLikeToggle} className={`${liked ? 'text-red-500' : 'text-gray-500'}`}>
              {liked ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
            </button>
            <button className="text-gray-500">
              <FaRegMessage className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="font-semibold mb-2">{likeCount.toLocaleString()} likes</div>
        <p className="text-gray-700 dark:text-gray-300 mb-2 align-baseline">
          <span className="font-semibold mr-1 align-baseline">{post.user.username}</span>
          {formatContent(post.text)}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">{useTimeAgo(post.created_at)}</div>
      </div>
    </div>
  );
};

export default Post;
