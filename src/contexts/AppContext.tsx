// this context api is responsible for managing the main
// information related to the application
import { createContext, useState, useEffect } from "react";
import useFetch from "@hooks/useFetch";
import { useDebounce } from "@hooks/useDebounce";

import type { Video } from "@definitions/global";

const AppContextValue = {
  loading: false,
  error: null as Error | null,
  videosList: [] as Video[] | undefined,
  filteredVideosList: [] as Video[] | undefined,
  isInteractive: true,
  searchValue: "",
  setIsInteractive: (_value: boolean) => {},
  setSearchValue: (_value: string) => {},
 };

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const AppContext = createContext(AppContextValue);

const AppProvider = ({ children }: Props) => {
  const [isInteractive, setIsInteractive] = useState(true);
  const [searchValue, setSearchValue] = useState(""); // state that keeps the typed information (input)
  const [filteredVideosList, setFilteredVideosList] = useState<Video[]>();

  // debounce hook based on the searchValue state (search input)
  const debouncedValue = useDebounce<string>(searchValue, 500);

  // as soon as the component mounts, the videos list should be fetched
  const {
    data: videosList,
    loading,
    error
  } = useFetch<Video[]>("http://localhost:5181/videos");

  // as soon as the data is fetched, we make a copy of it, so the data can be filtered
  useEffect(() => {
    setFilteredVideosList(videosList);
  }, [videosList]);

  // based on the search text input, we filter the data, and render on the screen
  useEffect(() => {
    const filtered = structuredClone(videosList)
      ?.filter((obj: Video) => Object.values(obj).some(val => String(val).toLowerCase().includes(searchValue.toLowerCase())));
    setFilteredVideosList(filtered);
  }, [debouncedValue]);

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        videosList,
        searchValue,
        isInteractive,
        filteredVideosList,
        setIsInteractive,
        setSearchValue
      }}
    >
      {children}
    </AppContext.Provider>
  );
 };
 
 export { AppContext, AppProvider };
