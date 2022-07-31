import * as React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/buttonSubmit";
import Input from "../../components/Input/Input";

const SendEmailResetPassword: React.FC = () => {
  const [email, setEmail] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Réinitialisation du mot de passe</h2>
          <p>
            Mot de passe oublié ? Entrez votre adresse email ci-dessous et nous
            vous enverrons par e-mail des instructions pour en définir une
            nouvelle.
          </p>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"Envoyer"} />
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

export default SendEmailResetPassword;
