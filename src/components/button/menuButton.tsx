type NavBarButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const MenuButton: React.FC<NavBarButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <div
      className={`flex w-auto space-x-2 px-4 py-3 items-center rounded-xl transition-all duration-75 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuButton;
