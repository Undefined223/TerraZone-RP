import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ChakraProvider } from "@chakra-ui/react";

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Store = lazy(() => import('./pages/Store'));
const Factions = lazy(() => import('./pages/Factions'));
const Applications = lazy(() => import('./pages/Applications'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <div className="App">
        <ChakraProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/store" element={<Store />} />
                <Route path="/factions" element={<Factions />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/about" element={<About />} />

              </Routes>
            </Suspense>
          </BrowserRouter>
        </ChakraProvider>
    </div>
  );
}

export default App;
