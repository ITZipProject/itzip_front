const Filter = () => {
  return (
    <div className="w-52 h-80 border-2 border-gray-300 rounded-md p-4 shadow-md flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold text-center">문제 검색</h1>
      <div className="relative w-48 h-8 border-2 border-gray-300 rounded-md p-0 mt-2 flex items-center">
        <input
          type="text"
          className="w-full h-full border-none outline-none box-border px-2"
          placeholder="검색어를 입력하세요..."
        />
        <img
          src={"./search.png"}
          alt="돋보기 아이콘"
          className="w-4 h-4 mr-2"
        />
      </div>
    </div>
  );
};

export default Filter;
