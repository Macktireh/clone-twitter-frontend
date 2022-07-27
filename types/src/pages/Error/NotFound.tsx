import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  useEffect(() => {
    const container: HTMLElement | null =
      document.getElementById("container-404");
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
    <div className="notfound">
      <div id="container-404">
        <div className="content">
          <h2>404</h2>
          <h4>Opps! page not found</h4>
          <p>
            La page que vous recherchez n'existe pas. Il se peut que vous ayez
            mal saisi l'adresse ou que la page ait été déplacée.
          </p>
          <Link to="/">
            <span>Revenir à la page d'acceuil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
