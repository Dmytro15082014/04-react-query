import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}
