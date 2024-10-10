interface TextDividerType {
  children: React.ReactNode;
}

const TextDivider = ({ children }: TextDividerType) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-300">{children}</span>
      </div>
    </div>
  );
};

export default TextDivider;
