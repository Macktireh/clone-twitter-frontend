import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ModalAuth from "@/components/auth/ModalAuth";
import ButtonCustom from "@/widgets/ButtonCustom";
import InputCustom from "@/widgets/InputCustom";
import resetPasswordAction from "@/actions/auth/resetPassword.action";
import * as controlField from "@/validators/controlField";
import * as ErrorMessage from "@/utils/displayError";
import { authRoutes } from "@/routes/auth.routes";

type propsTypes = {
  resetPasswordAction: (
    uid: string,
    token: string,
    newPassword: string,
    reNewPassword: string
  ) => Promise<{ response: any; error: boolean }>;
};

const ResetPassword: React.FC<propsTypes> = ({ resetPasswordAction }) => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { password, confirmPassword } = formData;

  React.useEffect(() => {
    document.title = authRoutes.resetPassword.title;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkPassword = await controlField.passwordValidator(password, confirmPassword);

    if (checkPassword.validate) {
      setLoading(true);
      setDisabled(true);
      setDisplayError(false);
      setDetailError("");
      const res = await resetPasswordAction(uid as string, token as string, password, confirmPassword);
      if (res.error) {
        navigate("/not-found/");
      } else {
        navigate(authRoutes.resetPasswordConfirm.path);
        setDisplayError(false);
      }
    } else {
      setLoading(false);
      setDisabled(false);
      ErrorMessage.DispyalErrorMessageFrontend(setDisplayError, setDetailError, checkPassword);
    }
  };

  return (
    <ModalAuth title="Reset my password" loading={loading} disabled={disabled}>
      <form onSubmit={onSubmit}>
        {displayError && (
          <div className="error-auth">
            <img src="/static/svg/error.svg" alt="icon error" />
            <span>{detailError}</span>
          </div>
        )}
        <InputCustom
          id="password"
          name="password"
          type="password"
          label="Password *"
          onChange={handleChange}
          isPasswords={true}
          value={password}
        />
        <InputCustom
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password *"
          onChange={handleChange}
          isPasswords={true}
          value={confirmPassword}
        />
        <ButtonCustom nameClass={"btn-signup"} text={"Send"} isDisabled={disabled} />
      </form>
    </ModalAuth>
  );
};

export default connect(null, { resetPasswordAction })(ResetPassword);
