import React, { useContext } from "react";
import VideosList from "@components/videosList/VideosList";
import { AppContext } from "@contexts/AppContext";

const HomePage: React.FC = () => {
  // retrieved states and methods associated with the app context
  const {
    loading,
    error,
    filteredVideosList
  } = useContext(AppContext);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {filteredVideosList && <VideosList data={filteredVideosList} />}
    </>
  );
};

export default HomePage;
