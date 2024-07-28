import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import ModalAuth from "@/components/auth/ModalAuth";
import ButtonCustom from "@/widgets/ButtonCustom";
import InputCustom from "@/widgets/InputCustom";
import requestResetPasswordActiond from "@/actions/auth/requestResetPassword.action";
import { authRoutes } from "@/routes/auth.routes";

type propsTypes = { 
  requestResetPasswordActiond: (email: string) => Promise<{ response: any; error: boolean }> 
};

const RequestResetPassword: React.FC<propsTypes> = ({ requestResetPasswordActiond }) => {
  const [email, setEmail] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = authRoutes.requestResetPassword.title;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    await requestResetPasswordActiond(email);
    navigate(authRoutes.requestResetPasswordConfirm.path);
  };

  return (
    <ModalAuth title="Request password reset" loading={loading} disabled={disabled}>
      <form onSubmit={onSubmit}>
        <p>
        Forgot your password? Enter your email address below, and if your email address exists, we will send you instructions on how to set a new one.
        </p>
        <InputCustom
          id="email"
          name="email"
          type="email"
          label="Email"
          onChange={handleChange}
          value={email}
        />
        <ButtonCustom nameClass={"btn-signup"} text={"Send"} isDisabled={disabled} />
      </form>
    </ModalAuth>
  );
};

export default connect(null, { requestResetPasswordActiond })(RequestResetPassword);
