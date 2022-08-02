import * as React from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import activateAccount from "../../actions/auth/activate.action";

const Activate: React.FC<any> = ({ activateAccount }) => {
  const [redirect, setRedirect] = React.useState("");
  const { uidb64, token } = useParams();

  React.useEffect(() => {
    (async () => {
      const res = await activateAccount(uidb64, token);
      if (!res.error) {
        setRedirect("home");
      } else {
        setRedirect("404");
      }
    })();
  });

  if (redirect === "home") return <Navigate to="/" />;
  else if (redirect === "404") return <Navigate to="/not-found/" />;

  return (
    <div>
      <h1>Your account has been successfully created and activated!</h1>
    </div>
  );
};

export default connect(null, { activateAccount })(Activate);
