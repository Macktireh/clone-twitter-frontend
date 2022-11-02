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
    <ModalAuth title="Réinitialisation du mot de passe" loading={loading} disabled={disabled}>
      <form onSubmit={onSubmit}>
        <p>
          Mot de passe oublié ? Entrez votre adresse email ci-dessous et si votre adresse email existe, nous
          vous enverrons par e-mail des instructions pour en définir une nouvelle.
        </p>
        <InputCustom
          id="email"
          name="email"
          type="email"
          label="Email"
          onChange={handleChange}
          value={email}
        />
        <ButtonCustom nameClass={"btn-signup"} text={"Envoyer"} isDisabled={disabled} />
      </form>
    </ModalAuth>
  );
};

export default connect(null, { requestResetPasswordActiond })(RequestResetPassword);
