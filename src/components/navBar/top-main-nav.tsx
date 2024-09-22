import { IoSearch } from 'react-icons/io5';
import { topMainNavProps } from './types';

const TopMainNav = ({ children, onSearchButtonClick }: topMainNavProps) => {
  return (
    <div className="w-full h-12 flex justify-between items-center align-middle bg-white px-4">
      <div className="text-black text-lg font-medium">{children}</div>
      <button onClick={onSearchButtonClick}>
        <IoSearch size="27" className="text-black" />
      </button>
    </div>
  );
};

export default TopMainNav;
