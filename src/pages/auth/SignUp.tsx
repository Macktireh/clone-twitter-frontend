import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import InputCustom from "@/components/widgets/InputCoustom";
import ButtonCustom from "@/components/widgets/ButtonCustom";
import signupAction from "@/actions/auth/signup.action";
import * as controlField from "@/validators/controlField";
import * as ErrorMessage from "@/utils/function";
import { IAuthUserSignUp } from "@/models";
import { authRoutes } from "@/routes/auth.routes";
import SpinnersLoding from "@/components/widgets/SpinnersLoding";

const SignUp: React.FC<any> = ({ signupAction }) => {
  const [formData, setFormData] = React.useState<IAuthUserSignUp>({
    firstName: "Mack",
    lastName: "AS",
    email: "abdimack97@gmail.com",
    password: "Charco@97",
    confirmPassword: "Charco@97",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = authRoutes.signup.title;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkFirstName = await controlField.blankValidator("Prénom", firstName);
    const checkLastName = await controlField.blankValidator("Nom", lastName);
    const checkEmail = await controlField.emailValidator(email);
    const checkPassword = await controlField.passwordValidator(password, confirmPassword);

    if (checkFirstName.validate && checkLastName.validate && checkEmail.validate && checkPassword.validate) {
      setLoading(true);
      setDisabled(true);
      setDisplayError(false);
      setDetailError("");
      const res = await signupAction(firstName, lastName, email, password, confirmPassword);

      if (!res.SignUpSuccess) {
        ErrorMessage.DispyalErrorMessageBackend(res, setDisplayError, setDetailError);
        setDisabled(false);
        setLoading(false);
      } else {
        setDisplayError(false);
        setDetailError("");
        navigate(authRoutes.signupConfirm.path);
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

  return (
    <div className="container-auth">
      <SpinnersLoding isLoading={loading} nameClass={loading ? "" : "displayNone"} />
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Créer votre compte</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>{detailError}</span>
            </div>
          )}
          <InputCustom id="firstName" name="firstName" label="Prénom *" maxLength="50" onChange={handleChange} value={firstName} />
          <InputCustom id="lastName" name="lastName" label="Nom *" maxLength="50" onChange={handleChange} value={lastName} />
          <InputCustom id="email" name="email" type="email" label="Email *" onChange={handleChange} value={email} />
          <InputCustom
            id="password"
            name="password"
            type="password"
            label="Mot de passe *"
            onChange={handleChange}
            isPasswords={true}
            value={password}
          />
          <InputCustom
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confimer mot de passe *"
            onChange={handleChange}
            isPasswords={true}
            value={confirmPassword}
          />
          <ButtonCustom
            nameClass={disabled ? "btn-signup disabled" : "btn-signup"}
            text={"S'inscrire"}
            isDisabled={disabled}
          />
          <div className="info">
            <h4>
              Vous avez déjà un compte ?{" "}
              <span onClick={() => navigate(disabled ? "" : authRoutes.login.path)}>Connectez-vous</span>
              <br />
              <br />
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

export default connect(null, { signupAction })(SignUp);
