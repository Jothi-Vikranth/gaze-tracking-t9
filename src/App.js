import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

const Home = React.lazy(() => import("./pages/Home"));
const Settings = React.lazy(() => import("./pages/Settings"));
const T9 = React.lazy(() => import("./pages/T9"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/t9" element={<T9 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
