import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { IStateReduce } from "@/models";
import updateCurrentUserAction from "@/actions/user/updateCurrentUser.action";

type pictureType = {
  profilePicture?: any;
  coverPicture?: any;
};

type ContextPropsType = {
  // modal?: {modalActive: boolean, setModalActive: () => void}
  popup?: { popupActive: boolean; setPopupActive: () => void };
  userData: {
    public_id: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    pseudo: string | undefined;
    bio: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReSetUserData?: () => void;
  picture?: pictureType | undefined;
  handleChangePicture?: (e: any) => void;
  handleSubmit: any;
};

const EditProfileContext = React.createContext<null | ContextPropsType>(null);

const EditProfileProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IStateReduce) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const [popupActive, setPopupActive] = React.useState(false);
  const [userData, setUserData] = React.useState({
    public_id: currentUser?.user.public_id,
    first_name: currentUser?.user.first_name,
    last_name: currentUser?.user.last_name,
    pseudo: currentUser?.pseudo,
    bio: currentUser?.bio,
  });
  const [picture, setPicture] = React.useState<pictureType>({
    profilePicture: null,
    coverPicture: null,
  });

  const { public_id, first_name, last_name, pseudo, bio } = userData;

  const handleReSetUserData = () => {
    const resetUserData = {
      public_id: currentUser?.user.public_id,
      first_name: currentUser?.user.first_name,
      last_name: currentUser?.user.last_name,
      pseudo: currentUser?.pseudo,
      bio: currentUser?.bio,
    };
    const pictures = {
      profilePicture: null,
      coverPicture: null,
    };
    setUserData(resetUserData);
    setPicture(pictures);
  };

  React.useEffect(() => {
    const resetUserData = {
      public_id: currentUser?.user.public_id,
      first_name: currentUser?.user.first_name,
      last_name: currentUser?.user.last_name,
      pseudo: currentUser?.pseudo,
      bio: currentUser?.bio,
    };
    setUserData(resetUserData);
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
    } else {
      setPicture({ ...picture, [e.target.name]: e.target.files[0] });
    }
  };

  const popup = {
    popupActive,
    setPopupActive: () => setPopupActive(!popupActive),
  };

  const handleSubmit = async (e: any) => {
    if (
      public_id &&
      (first_name !== currentUser?.user.first_name ||
        last_name !== currentUser?.user.last_name ||
        pseudo !== currentUser?.pseudo ||
        bio !== currentUser?.bio)
    )
      dispatch(updateCurrentUserAction(public_id, { user: { first_name, last_name }, pseudo, bio }) as any);
    if (public_id && (picture.profilePicture !== null || picture.coverPicture !== null)) {
      if (picture.profilePicture !== null && picture.coverPicture !== null) {
        const formData = new FormData();
        formData.append("profilePicture", picture.profilePicture, picture.profilePicture.name);
        formData.append("coverPicture", picture.coverPicture, picture.coverPicture.name);
        dispatch(updateCurrentUserAction(public_id, formData, true) as any);
      } else if (picture.profilePicture !== null) {
        const formData = new FormData();
        formData.append("profilePicture", picture.profilePicture);
        dispatch(updateCurrentUserAction(public_id, formData, true) as any);
      } else if (picture.coverPicture !== null) {
        const formData = new FormData();
        formData.append("coverPicture", picture.coverPicture, picture.coverPicture.name);
        dispatch(updateCurrentUserAction(public_id, formData, true) as any);
      }
    }
  };

  return (
    <EditProfileContext.Provider
      value={{
        popup,
        userData,
        handleChange,
        handleReSetUserData,
        picture,
        handleChangePicture,
        handleSubmit,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfile = () => {
  return React.useContext(EditProfileContext);
};

export default EditProfileProvider;
