import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";

const SignUp = () => {
  const [displayError, setDisplayError] = useState(false);

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form>
          <h2>Créer votre compte</h2>
          {displayError ? (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>Adresse email ou mot de passe incorrect</span>
            </div>
          ) : null}
          <Input id="firstname" label="Prénom *" maxLength="50" length="25" />
          <Input id="lastname" label="Nom *" maxLength="50" length="25" />
          <Input id="email" type="email" label="Email *" />
          <Input
            id="password"
            type="password"
            label="Mot de passe *"
            passwordValidations={true}
          />
          <Input
            id="password2"
            type="password"
            label="Confimer mot de passe *"
          />
          <Button nameClass={"btn-signup"} text={"S'inscrire"} />
          <h4>
            Vous avez déjà un compte ?{" "}
            <Link to="/account/signin">
              <span>Connectez-vous</span>
            </Link>
          </h4>
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
