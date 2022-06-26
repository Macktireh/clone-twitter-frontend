import React from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";
import Home from "../home/Home";

const SignUp = () => {
  return (
    <div className="container-signup">
      <Home />
      <Link to="/">
        <div className="bg"></div>
      </Link>
      <div className="modal-signup">
        <form>
          <h2>Créer votre compte</h2>
          <Input id="firstname" label="Prénom" />
          <Input id="lastname" label="Nom" />
          <Input id="email" type="email" label="Email" />
          <Input id="password" type="password" label="Mot de passe" />
          <Input id="password2" type="password" label="Confimer mot de passe" />
          <Button nameClass={"btn-signup"} text={"S'inscrire"} />
        </form>

        <Link to="/">
          <div className="close">
            <img src="/static/svg/close.svg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
