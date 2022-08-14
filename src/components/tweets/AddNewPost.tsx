import * as React from "react";

import { IAuthUserProfile } from "@/models";
import IconSVG from "@/components/icon/IconSVG";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const AddNewPost: React.FC<TcurrentUser> = ({ currentUser }) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit !");
  };

  return (
    <div className="AddNewPost">
      <div className="box-img">
        {currentUser?.picture ? <img src={currentUser?.picture} alt="" /> : <IconSVG iconName="profile" />}
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="textarea">
          <textarea></textarea>
        </div>
        <div className="form-btn">
          <input type="file" name="img" id="file" className="form-input-file" />
          <label htmlFor="file" className="form-lable">
            <img src="" alt="" />
            <span>Ajouter une photo</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
