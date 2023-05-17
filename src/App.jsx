import { useState, lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import adoptedPetContext from "./AdoptedPetContext";

const Details = lazy(() => import("./Details"))
const SearchParams = lazy(() => import("./SearchParams"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="loading-pane">
        <h2 className="loader">Loading...</h2>
      </div>}>
        <adoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </adoptedPetContext.Provider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App
