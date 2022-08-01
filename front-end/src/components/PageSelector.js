export const PageSelector = ({ page, changePage, count }) => {
  return (
    <div className="flex justify-center">
      <nav>
        <ul className="flex list-style-none">
          <li className="">
            <button
              className="text-sm py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 hover:bg-gray-200"
              onClick={() => changePage("-")}
            >
              Previous
            </button>
          </li>
          <li className="">
            <button className="text-sm py-1 px-2 relative block border-0 bg-stone-500 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-stone-600 ">{`${page}/${
              Math.floor(count / 50) + 1
            }`}</button>
          </li>

          <li className="">
            <button
              className="text-sm py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200"
              onClick={() => changePage("+")}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
