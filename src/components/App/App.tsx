import "./App.module.css";
import { type Movie } from "../../types/movie";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>("");

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => getMovies(query),
    enabled: query !== "",
  });

  const openModal = (movie: Movie) => {
    setIsModalOpen(true);
    setMovie(movie);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid onSelect={openModal} movies={data.results} />
      )}
      {isModalOpen && movie !== null && (
        <MovieModal onClose={closeModal} movie={movie} />
      )}
    </>
  );
}
