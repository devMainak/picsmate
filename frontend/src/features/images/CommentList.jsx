const CommentList = ({ comments }) => {
  return (
    <div className="space-y-2 my-4 max-h-100 overflow-y-auto">
      {comments.map((c, index) => (
        <div
          key={index}
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-start gap-2"
        >
          <img
            src={c.owner.profilePic}
            alt={c.owner.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-black text-left dark:text-white">
              {c.owner.name}
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-left">{c.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
