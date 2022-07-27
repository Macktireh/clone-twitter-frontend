import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";
import { ILogin } from "../../interfaces";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<ILogin>({ email: "", password: "" });
  const [displayError, setDisplayError] = useState(false);

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Connexion :\n email: ${email} password: ${password}`);
  };

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError ? (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>Adresse email ou mot de passe incorrect</span>
            </div>
          ) : null}
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"Se connecter"} />
          <h4>
            Vous n'avez pas de compte ?{" "}
            <Link to="/auth/signup">
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

export default Login;
