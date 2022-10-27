import React from "react";

import InputCustom from "@/widgets/InputCustom";
import IconSVG from "@/widgets/IconSVG";
import { IUserProfile } from "@/models";
import { useEditProfile } from "@/context/EditProfileProvider";

type propsTypes = {
  currentUser: IUserProfile | null;
};

const EdidProfile: React.FC<propsTypes> = ({ currentUser }) => {
  const propsContext = useEditProfile();
  const [profilePicturePreview, setProfilePicturePreview] = React.useState<string | null>();
  const [coverPicturePreview, setCoverPicturePreview] = React.useState<string | null>();
  const imageInputRefPofile = React.useRef<HTMLInputElement>(null);
  const imageInputRefCover = React.useRef<HTMLInputElement>(null);

  const handleChangePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (propsContext) propsContext.handleChangePicture && propsContext.handleChangePicture(e);
  };

  React.useEffect(() => {
    if (propsContext?.picture?.profilePicture) {
      const profileReader = new FileReader();
      profileReader.onloadend = () => {
        setProfilePicturePreview(profileReader.result as string);
      };
      profileReader.readAsDataURL(propsContext.picture.profilePicture);
    } else {
      setProfilePicturePreview(null);
    }
    if (propsContext?.picture?.coverPicture) {
      const coverReader = new FileReader();
      coverReader.onloadend = () => {
        setCoverPicturePreview(coverReader.result as string);
      };
      coverReader.readAsDataURL(propsContext.picture.coverPicture);
    } else {
      setCoverPicturePreview(null);
    }
  }, [propsContext?.picture?.profilePicture, propsContext?.picture?.coverPicture]);

  const resetInputFilePofile = async () => {
    if (imageInputRefPofile.current) imageInputRefPofile.current.value = "";
  };

  const resetInputFileCover = async () => {
    if (imageInputRefCover.current) imageInputRefCover.current.value = "";
  };

  return (
    <div className="EdidProfile">
      <div className="img-container">
        <div className="cover-pic">
          <img
            src={coverPicturePreview ? coverPicturePreview : (currentUser?.coverPicture as string)}
            alt="cover-pic"
          />
          <input
            type="file"
            name="coverPicture"
            id="coverPicture"
            hidden
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleChangePic(e)}
            onClick={resetInputFileCover}
            ref={imageInputRefCover}
          />
          <label htmlFor="coverPicture">
            <IconSVG iconName="camImage" fill="#CCCCCC" />
          </label>
        </div>
        <div className="profile-pic">
          <img
            className=""
            src={profilePicturePreview ? profilePicturePreview : (currentUser?.profilePicture as string)}
            alt="profile-pic"
          />
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            hidden
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleChangePic(e)}
            onClick={resetInputFilePofile}
            ref={imageInputRefPofile}
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
          maxLength="50"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.first_name ? propsContext.userData.first_name : ""}
        />
        <InputCustom
          nameClass="entry-container"
          id="last_name"
          name="last_name"
          type="text"
          label="Nom"
          maxLength="50"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.last_name ? propsContext.userData.last_name : ""}
        />
        <InputCustom
          nameClass="entry-container"
          id="pseudo"
          name="pseudo"
          type="text"
          label="Pseudo"
          maxLength="50"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.pseudo ? propsContext.userData.pseudo : ""}
        />
        <InputCustom
          nameClass="entry-container"
          id="bio"
          name="bio"
          label="bio"
          maxLength="160"
          onChange={propsContext?.handleChange}
          value={propsContext?.userData.bio ? propsContext.userData.bio : ""}
          textarea={true}
        />
      </div>
    </div>
  );
};

export default EdidProfile;
