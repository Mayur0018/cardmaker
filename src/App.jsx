// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkbox from "./components/Checkbox";
import CardDetails from "./components/CardDetails";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Checkbox />} />
          <Route path="/card-details" element={<CardDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
