import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError ? (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>Adresse email ou mot de passe incorrect</span>
            </div>
          ) : null}
          <Input id="email" type="email" label="Email" />
          <Input id="password" type="password" label="Mot de passe" />
          <Button nameClass={"btn-signup"} text={"Se connecter"} />
          <h4>
            Vous n'avez pas de compte ?{" "}
            <Link to="/account/signup">
              <span>Inscrivez-vous</span>
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

export default SignIn;
