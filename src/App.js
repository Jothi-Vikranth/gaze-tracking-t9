import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

const T9 = React.lazy(() => import("./pages/T9"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" index element={<T9 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
