import { IoArrowBack } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';
import { topBasicNavProps } from './types';

const TopBasicNav = ({ onBackButtonClick, onMoreButtonClick }: topBasicNavProps) => {
  return (
    <div className="w-full h-12 flex justify-between items-center align-middle bg-white px-4">
      <button onClick={onBackButtonClick}>
        <IoArrowBack size="27" className="text-black" />
      </button>
      <button onClick={onMoreButtonClick}>
        <IoMdMore size="27" className="text-black" />
      </button>
    </div>
  );
};

export default TopBasicNav;
