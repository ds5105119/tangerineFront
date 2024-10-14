'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IoClose, IoImages } from 'react-icons/io5';
import { MdOutlinePostAdd } from 'react-icons/md';
import { authUserToUser } from '@/lib/accounts';
import { usePresignedImage } from '@/hooks/images/image';
import { useCreatePost } from '@/hooks/posts/post';
import useAuthStore from '@/lib/auth';
import HighlightedTextarea from './highLightedTextArea';
import PostringImageList from './postringImageList';
import Profile from '../user/profile';
import usePostingStore from '@/lib/posting';
import Toast from '@/components/toast';

const Posting: React.FC = () => {
  const router = useRouter();
  const presignedImageHandler = usePresignedImage();
  const uploadPostHandler = useCreatePost();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const { auth } = useAuthStore();
  const { isPostingOpen, closePosting } = usePostingStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && auth) {
      presignedImageHandler.mutate(
        { isPublic: true, image: file },
        {
          onSuccess: (uploadedUrl) => {
            setImages([...images, uploadedUrl]);
          },
          onError: () => {
            setShowToast('파일 업로드 중 문제가 발생하였습니다.');
          },
        }
      );
    }
  };

  const handleSubmit = () => {
    uploadPostHandler.mutate({ text: text, tags: [...new Set(tags)], images: images });
    if (uploadPostHandler.isSuccess) {
      setImages([]);
      setText('');
      closePosting();
      router.push(`/${auth?.user.handle}`);
    }
  };

  if (!isPostingOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full h-full lg:w-2/3 lg:h-auto lg:max-w-2xl lg:rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold">새로운 게시물</h2>
          <button
            onClick={closePosting}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="px-8 py-6">
          {/* 포스팅 입력 부분 */}
          <div className="flex w-full mb-4 space-x-4">
            <Profile user={authUserToUser(auth?.user)} priority={true} className="w-12 h-12 min-w-12 min-h-12" />
            <div className="flex w-full flex-col mb-4 space-y-1">
              <span className="font-semibold">{auth?.user.handle}</span>
              <HighlightedTextarea text={text} tags={tags} setText={setText} setTags={setTags} />
            </div>
          </div>

          {/* 이미지 미리보기 */}
          <div className="flex px-6 space-x-3">
            <PostringImageList images={images} />
          </div>

          {/* 툴바 */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <IoImages size={24} />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <MdOutlinePostAdd size={20} />
            </button>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
      {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
    </div>
  );
};

export default Posting;
