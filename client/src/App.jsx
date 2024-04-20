import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import TerraZoneProvider from './context/TerraZoneProvider'
import ResetPassword from "./pages/ResetPassword";

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Store = lazy(() => import('./pages/Store'));
const Factions = lazy(() => import('./pages/Factions'));
const Applications = lazy(() => import('./pages/Applications'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <div className="App">
      <TerraZoneProvider>
        <ChakraProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/store" element={<Store />} />
                <Route path="/factions" element={<Factions />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/about" element={<About />} />
                <Route path="/resetpassword/:token" element={<ResetPassword />} />

              </Routes>
            </Suspense>
          </BrowserRouter>
        </ChakraProvider>
      </TerraZoneProvider>
    </div>
  );
}

export default App;
