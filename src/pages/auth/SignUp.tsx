import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";
import { ISignUp } from "../../interfaces";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<ISignUp>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const CheckeredPassword = async () => {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Créer votre compte</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>Adresse email ou mot de passe incorrect</span>
            </div>
          )}
          <Input
            id="firstName"
            name="firstName"
            label="Prénom *"
            maxLength="50"
            onChange={handleChange}
          />
          <Input
            id="lastName"
            name="lastName"
            label="Nom *"
            maxLength="50"
            onChange={handleChange}
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email *"
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe *"
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confimer mot de passe *"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"S'inscrire"} />
          <div className="info">
            <h4>
              Vous avez déjà un compte ?{" "}
              <Link to="/auth/login/">
                <span>Connectez-vous</span>
              </Link>
            </h4>
          </div>
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
