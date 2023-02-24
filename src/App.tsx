import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <div>
                <h1>404 Page not found</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
