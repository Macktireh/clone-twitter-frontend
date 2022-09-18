import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { IStateReduce } from "@/models";
import updateCurrentUserAction from "@/actions/user/updateCurrentUser.action";

type ContextPropsType = {
  userData: {
    public_id: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    pseudo: string | undefined;
    bio: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: any;
};

export const EditProfileContext = React.createContext<null | ContextPropsType>(null);

const EditProfileProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IStateReduce) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState({
    public_id: currentUser?.user.public_id,
    first_name: currentUser?.user.first_name,
    last_name: currentUser?.user.last_name,
    pseudo: currentUser?.pseudo,
    bio: currentUser?.bio,
  });

  const { public_id, first_name, last_name, pseudo, bio } = userData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log([e.target.name], e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    // console.log("Context");
    // console.log(public_id);
    if (
      public_id &&
      (first_name !== currentUser?.user.first_name ||
        last_name !== currentUser?.user.last_name ||
        pseudo !== currentUser?.pseudo ||
        bio !== currentUser?.bio)
    ) {
      dispatch(updateCurrentUserAction(public_id, { user: { first_name, last_name }, pseudo }) as any);
    }
  };

  return (
    <EditProfileContext.Provider value={{ userData, handleChange, handleSubmit }}>
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfile = () => {
  return React.useContext(EditProfileContext);
};

export default EditProfileProvider;
