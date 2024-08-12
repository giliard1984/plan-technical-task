import { Route, Routes } from "react-router-dom";

// Layouts
import DefaultLayout from "@layouts/Default";

// Pages
import HomePage from "@pages/HomePage";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default Router;
