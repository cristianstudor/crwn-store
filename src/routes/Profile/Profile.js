import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selectors";

import UserInfo from "../../components/UserInfo/UserInfo";
import OrdersHistory from "../../components/OrdersHistory/OrdersHistory";

const Profile = () => {
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) navigate("/");
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Fragment>
      <UserInfo />
      <OrdersHistory />
    </Fragment>
  );
};

export default Profile;
