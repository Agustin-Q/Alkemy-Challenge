import Home from './components/Home';
import MenuBar from './components/MenuBar';
import { Routes, Route, } from "react-router-dom";
import SignUp from './components/SignUp';
function App() {
  return (
    <div className="App">
      <MenuBar/>
      <div className="Content">
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
