import React from "react";
import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  React.useEffect(() => {
    document.title = "Error 404 Not Found | Clone Twitter";
    const container: HTMLElement | null = document.getElementById("container-Error404");
    window.onmousemove = (e) => {
      let x = -e.clientX / 5;
      let y = -e.clientY / 5;
      if (container) {
        container.style.backgroundPositionX = x + "px";
        container.style.backgroundPositionY = y + "px";
      }
    };
  }, []);

  return (
    <div className="Error404">
      <div id="container-Error404">
        <div className="content">
          <h2>404</h2>
          <h4>Opps! page not found</h4>
          <p>
            La page que vous recherchez n'existe pas. Il se peut que vous ayez mal saisi l'adresse
            ou que la page ait été déplacée.
          </p>
          <Link to="/">
            <span>Revenir à la page d'acceuil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
