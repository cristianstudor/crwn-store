import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { checkUserSession } from "./store/user/user.actions";

import Spinner from "./components/Spinner/Spinner";
import Navigation from "./routes/Navigation/Navigation";

const Home = lazy(() => import("./routes/Home/Home"));
const Shop = lazy(() => import("./routes/Shop/Shop"));
const Authentication = lazy(() =>
  import("./routes/Authentication/Authentication")
);
const Checkout = lazy(() => import("./routes/Checkout/Checkout"));
const Payment = lazy(() => import("./routes/Payment/Payment"));
const Profile = lazy(() => import("./routes/Profile/Profile"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // eslint-disable-next-line
  }, []); // wrong dispatch dependency error, dispatch never changes

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
