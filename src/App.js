import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.js";
import Home from "./routes/Home/Home.js";
import Shop from "./routes/Shop/Shop.js";
import Authentication from "./routes/Authentication/Authentication.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
