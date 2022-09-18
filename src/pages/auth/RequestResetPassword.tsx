import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import requestResetPasswordActiond from "@/actions/auth/requestResetPassword.action";
import ButtonCustom from "@/widgets/ButtonCustom";
import InputCustom from "@/widgets/InputCustom";
import { authRoutes } from "@/routes/auth.routes";
import SpinnersLoding from "@/widgets/SpinnersLoding";

const RequestResetPassword: React.FC<any> = ({ requestResetPasswordActiond }) => {
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
    <div className="container-auth">
      <SpinnersLoding isLoading={loading} nameClass={loading ? "" : "displayNone"} />
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Réinitialisation du mot de passe</h2>
          <p style={{ textAlign: "center" }}>
            Mot de passe oublié ? Entrez votre adresse email ci-dessous et si votre adresse email existe, nous
            vous enverrons par e-mail des instructions pour en définir une nouvelle.
          </p>
          <InputCustom id="email" name="email" type="email" label="Email" onChange={handleChange} value={email} />
          <ButtonCustom nameClass={"btn-signup"} text={"Envoyer"} isDisabled={disabled} />
        </form>
        <br />

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { requestResetPasswordActiond })(RequestResetPassword);
