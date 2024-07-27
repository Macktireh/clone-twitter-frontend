import React from "react";
import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  React.useEffect(() => {
    document.title = "Error 404 Not Found | Clone Twitter";
    const container: HTMLElement | null = document.getElementById("container-Error404");
    window.onmousemove = (e: MouseEvent) => {
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
            The page you are looking for does not exist. You may have entered the address incorrectly, or the page may have been moved.
          </p>
          <Link to="/">
            <span>Back to home page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
