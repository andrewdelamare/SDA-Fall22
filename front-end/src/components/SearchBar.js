export const SearchBar = ({searchUpdate, fieldUpdate, submitSearch}) => {

  const updateField = (update, func) => {
    update.preventDefault()
    func(update.target.value.toLowerCase())
  }

  return (
    <div className="flex w-full justify-center ">
      <select onChange={(e) => updateField(e, fieldUpdate)} id="searchSelect">
        <option>Search Field</option>
        <option value="departure">Departure</option>
        <option value="ret">Return</option>
        <option value="duration">Duration</option>
        <option value="distance">Distance</option>
      </select>
      <input type="search" className="border-2 mx-2" placeholder="Search" id="searchInput" onChange={(e) => updateField(e, searchUpdate)}></input>
    </div>
  )
}