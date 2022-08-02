export const SearchBar = ({ filterEvent, options }) => {
  const searchIt = (e) => {
    e.preventDefault();
    const field = document.getElementById("searchSelect").value.toLowerCase();
    const search = document.getElementById("searchInput").value.toLowerCase();
    filterEvent(search, field);
  };

  return (
    <div className="flex w-full justify-center ">
      <form onChange={(e) => searchIt(e)} onSubmit={(e) => e.preventDefault()}>
        <select id="searchSelect">
          <option>Filter</option>

          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <input
          type="search"
          className="border-2 mx-2"
          placeholder="Search"
          id="searchInput"
        ></input>
      </form>
    </div>
  );
};
