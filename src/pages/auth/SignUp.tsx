import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";
import { ISignUp, TauthState } from "../../interfaces";
import signupAction from "../../actions/auth/signup.action";
import * as controlField from "../../validators/controlField";
import * as ErrorMessage from "../../utils/function";
import { authPath } from "../../routes/auth.route";

const SignUp: React.FC<any> = ({ signupAction, isAuthenticated }) => {
  const [formData, setFormData] = React.useState<ISignUp>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const navigate = useNavigate();
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkFirstName = await controlField.blankValidator("Prénom", firstName);
    const checkLastName = await controlField.blankValidator("Nom", lastName);
    const checkEmail = await controlField.emailValidator(email);
    const checkPassword = await controlField.passwordValidator(password, confirmPassword);

    if (
      checkFirstName.validate &&
      checkLastName.validate &&
      checkEmail.validate &&
      checkPassword.validate
    ) {
      setDisplayError(false);
      setDetailError("");
      setDisabled(true);

      const res = await signupAction(firstName, lastName, email, password, confirmPassword);

      if (!res.SignUpSuccess) {
        ErrorMessage.DispyalErrorMessageBackend(res, setDisplayError, setDetailError);
        setDisabled(false);
      } else {
        setDisplayError(false);
        setDetailError("");
        navigate(authPath.signupConfirm);
      }
    } else {
      ErrorMessage.DispyalErrorMessageFrontend(
        setDisplayError,
        setDetailError,
        checkFirstName,
        checkLastName,
        checkEmail,
        checkPassword
      );
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

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
          <Input id="email" name="email" type="email" label="Email *" onChange={handleChange} />
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
          <Button
            nameClass={disabled ? "btn-signup disabled" : "btn-signup"}
            text={"S'inscrire"}
            isDisabled={disabled}
          />
          <div className="info">
            <h4>
              Vous avez déjà un compte ?{" "}
              <span onClick={() => navigate(disabled ? "" : authPath.login)}>Connectez-vous</span>
            </h4>
          </div>
        </form>

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: TauthState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, { signupAction })(SignUp);
