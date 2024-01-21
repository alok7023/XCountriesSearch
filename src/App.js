import { useEffect, useState } from "react";
import "./App.css";
const URL = `https://restcountries.com/v3.1/all`;
function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filterCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilterCountries(filterCountries);
  }, [searchInput, countries]);

  return (
    <div className="App">
      <h1>Country Flags</h1>
      <input
        type="text"
        placeholder="Search for countries..."
        className="searchBar"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="cards">
        {filterCountries.map((country) => {
          return (
            <div className="cardstyle">
              <img
                src={country.flags.png}
                alt={country.name.common}
                height={100}
                width={100}
              />
              <h2>{country.name.common}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
