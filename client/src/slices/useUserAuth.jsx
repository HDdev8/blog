import {useMemo} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "./userSlice";

/* currentUser: {name,username,token} */

export const useUserAuth = () => {
  const user = useSelector(selectCurrentUser);
  return useMemo(() => ({user}), [user]);
};
