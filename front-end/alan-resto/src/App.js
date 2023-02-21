import { Route,Routes } from "react-router-dom";
import TransactionPage from "./Pages/TransactionPage";
import FoodPage from "./Pages/FoodPage";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path="/"element={<TransactionPage/>} />
          <Route path="/food"element={<FoodPage/>} />
        </Routes>
    </div>
  );
}

export default App;
