interface PostringImageListProps {
  images: string[];
}

const PostringImageList = ({ images }: PostringImageListProps) => {
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
