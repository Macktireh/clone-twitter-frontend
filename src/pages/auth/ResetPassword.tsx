import * as React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import resetPasswordAction from "../../actions/auth/resetPassword.action";
import Button from "../../components/Buttons/buttonSubmit";
import Input from "../../components/Input/Input";
import * as controlField from "../../validators/controlField";
import * as ErrorMessage from "../../utils/function";
import { authPath } from "../../routes/auth.route";

const ResetPassword: React.FC<any> = ({ resetPasswordAction }) => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const navigate = useNavigate();

  const { password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { uid, token } = useParams();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkPassword = await controlField.passwordValidator(password, confirmPassword);

    if (checkPassword.validate) {
      setDisabled(true);
      setDisplayError(false);
      setDetailError("");
      const res = await resetPasswordAction(uid, token, password, confirmPassword);
      if (res.error) {
        navigate("/not-found/");
      } else {
        navigate(authPath.resetPasswordConfirm);
        setDisplayError(false);
      }
    } else {
      setDisabled(false);
      ErrorMessage.DispyalErrorMessageFrontend(setDisplayError, setDetailError, checkPassword);
    }
  };

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>{detailError}</span>
            </div>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
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
          <Button nameClass={"btn-signup"} text={"Se connecter"} isDisabled={disabled} />
        </form>

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { resetPasswordAction })(ResetPassword);
