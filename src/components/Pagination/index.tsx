const Pagination = () => {
  return (
    <div className="flex justify-end items-center gap-4 text-xs text-purple-500 font-medium pt-6">
      <button className="hover:text-white transition-colors">&lt;&lt;</button>
      <button className="hover:text-white transition-colors">&lt;</button>
      <span className="text-white border-b border-purple-500">1</span>
      <button className="hover:text-white transition-colors">2</button>
      <button className="hover:text-white transition-colors">3</button>
      <button className="hover:text-white transition-colors">&gt;</button>
      <button className="hover:text-white transition-colors">&gt;&gt;</button>
    </div>
  );
};

export default Pagination;
