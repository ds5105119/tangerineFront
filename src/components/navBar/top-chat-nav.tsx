import { IoArrowBack } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';
import { topChatNavProps } from './types';

const TopChatNav = ({ onBackButtonClick, onMoreButtonClick, children }: topChatNavProps) => {
  return (
    <div className="flex w-12 justify-between items-center align-middle bg-white px-6">
      <div className="flex h-full items-center">
        <button onClick={onBackButtonClick}>
          <IoArrowBack size="27" className="text-black" />
        </button>
        <div className="px-3 text-black">{children}</div>
      </div>
      <button onClick={onMoreButtonClick}>
        <IoMdMore size="27" className="text-black" />
      </button>
    </div>
  );
};

export default TopChatNav;
