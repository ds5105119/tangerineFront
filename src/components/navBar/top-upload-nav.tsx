import { IoArrowBack } from 'react-icons/io5';
import { topUploadNavProps } from './types';
import Button from '@/components/button/roundButton';

const TopUploadNav = ({ onBackButtonClick, onSaveButtonClick }: topUploadNavProps) => {
  return (
    <div className="w-full h-12 flex justify-between items-center align-middle bg-white px-4">
      <button onClick={onBackButtonClick}>
        <IoArrowBack size="27" className="text-black" />
      </button>
      <Button size="ms" className="min-w-24" onClick={onSaveButtonClick}>
        저장
      </Button>
    </div>
  );
};

export default TopUploadNav;
