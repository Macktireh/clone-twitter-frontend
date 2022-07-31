import * as React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/buttonSubmit";
import Input from "../../components/Input/Input";

const ResetPasswordConfirm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = React.useState(false);

  const { password, confirmPassword } = formData;

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
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError ? (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>Adresse email ou mot de passe incorrect</span>
            </div>
          ) : null}
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confimer mot de passe *"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"Se connecter"} />
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

export default ResetPasswordConfirm;
