import { useContext } from "react";
import { debounce } from "lodash";
import { AppContext } from "../../context/appContext.js";
import { constants } from "../../constants.js";

const SearchFormComponent = () => {
  const { keyword } = useContext(AppContext);

  const inputValue = debounce((value) => {
    if (keyword && keyword[1]) {
      keyword[1](value);
    }
  }, constants.DEBOUNCE_MILLISECONDS);

  const handleSubmit = (e) => e.preventDefault();
  const handleSearchChange = (e) => {
    inputValue(e.target.value);
  };

  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <input
          role="searchbox"
          className="search__input"
          type="text"
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
};

export default SearchFormComponent;
