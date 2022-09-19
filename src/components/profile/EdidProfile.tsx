import React from "react";

import { IAuthUserProfile } from "@/models";
import { baseURL } from "@/config/axios";
import IconSVG from "@/widgets/IconSVG";
import { useEditProfile } from "@/context/EditProfileProvider";
import InputCustom from "@/widgets/InputCustom";

type PropsType = {
  currentUser: IAuthUserProfile | null;
};

const EdidProfile: React.FC<PropsType> = ({ currentUser }) => {
  const propsContext = useEditProfile();

  const handleChangePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (propsContext) propsContext.handleChangePicture && propsContext.handleChangePicture(e);
  };

  return (
    <div className="EdidProfile">
      <div className="img-container">
        <div className="cover-pic">
          <img
            src={
              currentUser?.coverPicture
                ? baseURL + currentUser.coverPicture
                : baseURL + "/mediafiles/default/coverPic.jpg"
            }
            alt="cover-pic"
          />
          <input
            type="file"
            name="coverPicture"
            id="coverPicture"
            hidden
            onChange={(e) => handleChangePic(e)}
          />
          <label htmlFor="coverPicture">
            <IconSVG iconName="camImage" fill="#CCCCCC" />
          </label>
        </div>
        <div className="profile-pic">
          <img
            className=""
            src={
              currentUser?.profilePicture
                ? baseURL + currentUser.profilePicture
                : baseURL + "/mediafiles/default/coverPic.jpg"
            }
            alt="profile-pic"
          />
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            hidden
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleChangePic(e)}
          />
          <label htmlFor="profilePicture">
            <IconSVG iconName="camImage" fill="#CCCCCC" />
          </label>
        </div>
      </div>
      <div className="form-container">
        <InputCustom
          nameClass="entry-container"
          id="first_name"
          name="first_name"
          type="text"
          label="Prénom"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.first_name ? propsContext.userData.first_name : ""}
        />
        <InputCustom
          nameClass="entry-container"
          id="last_name"
          name="last_name"
          type="text"
          label="Nom"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.last_name ? propsContext.userData.last_name : ""}
        />
        <InputCustom
          nameClass="entry-container"
          id="pseudo"
          name="pseudo"
          type="text"
          label="Pseudo"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.pseudo ? propsContext.userData.pseudo : ""}
        />
        <InputCustom
          nameClass="entry-container"
          id="bio"
          name="bio"
          label="bio"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.bio ? propsContext.userData.bio : ""}
          textarea={true}
        />
      </div>
    </div>
  );
};

export default EdidProfile;
