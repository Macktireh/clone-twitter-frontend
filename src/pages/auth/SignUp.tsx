import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";
import { ISignUp } from "../../interfaces";
import signup from "../../actions/auth/signup.action";
import * as controlField from "../../validators/controlField";
import { verifyErrorMessage } from "../../utils/function";

const SignUp: React.FC<any> = ({ signup }) => {
  const [formData, setFormData] = React.useState<ISignUp>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkFirstName = await controlField.blankValidator(
      "Prénom",
      firstName
    );
    const checkLastName = await controlField.blankValidator("Nom", lastName);
    const checkEmail = await controlField.emailValidator(email);
    const checkPassword = await controlField.passwordValidator(
      password,
      confirmPassword
    );

    if (
      checkFirstName.validate &&
      checkLastName.validate &&
      checkEmail.validate &&
      checkPassword.validate
    ) {
      setDisplayError(false);
      setDetailError("");

      const res = await signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );

      verifyErrorMessage(
        res,
        setDisplayError,
        setDetailError,
        checkFirstName,
        checkLastName,
        checkEmail,
        checkPassword
      );
    }
  };

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Créer votre compte</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>{detailError}</span>
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
            isPasswords={true}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confimer mot de passe *"
            onChange={handleChange}
            isPasswords={true}
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

export default connect(null, { signup })(SignUp);
