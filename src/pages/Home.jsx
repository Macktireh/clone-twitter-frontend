import React from "react";

import Button from "../components/widgets/Button";

const Home = () => {
  return (
    <div className="home-page">
      <div className="container-content">
        <header>
          <img
            className="logo"
            src="./static/svg/twitter.svg"
            alt="logo Twitter"
          />
        </header>
        <div className="frame-title">
          <h1>Ça se passe maintenant</h1>
          <h2>Rejoignez Twitter dès aujourd'hui.</h2>
        </div>
        <div className="frame-btn-connexion">
          <div className="frame1">
            <Button
              nameClass={"signup-ext"}
              pic={"./static/svg/google.svg"}
              text={"S'inscrire avec Google"}
            />
            <Button
              nameClass={"signup-ext"}
              pic={"./static/svg/apple.svg"}
              text={"S'inscrire avec Apple"}
            />
            <div className="sep">
              <hr />
              <span>ou</span>
            </div>
            <div className="frame-signup-int">
              <Button
                nameClass={"signup-int"}
                text={"S'inscrire avec un email et password"}
              />
              <p>
                En vous inscrivant, vous acceptez les{" "}
                <a href="">Conditions d'Utilisation</a> et la{" "}
                <a href="">Politique de Confidentialité</a>, incluant l'
                <a href="">Utilisation de Cookies</a>.
              </p>
            </div>
          </div>
          <div className="frame-signin">
            <h4>Vous avez déjà un compte ?</h4>
            <Button text={"Se connecter"} />
          </div>
        </div>
      </div>
      <div className="container-img">
        <img src="./static/svg/twitter.svg" />
      </div>
      <div className="container-footer">
        <a id="items-footer-home">À propos</a>
        <a id="items-footer-home">Centre d'assistance</a>
        <a id="items-footer-home">Conditions d’utilisation</a>
        <a id="items-footer-home">Politique de Confidentialité</a>
        <a id="items-footer-home">Politique relative aux cookies</a>
        <a id="items-footer-home">Accessibilité</a>
        <a id="items-footer-home">Informations sur les publicités</a>
        <a id="items-footer-home">Blog</a>
        <a id="items-footer-home">Statut</a>
        <a id="items-footer-home">Carrières</a>
        <a id="items-footer-home">Ressources de la marque</a>
        <a id="items-footer-home">Publicité</a>
        <a id="items-footer-home">Marketing</a>
        <a id="items-footer-home">Twitter pour les professionnels</a>
        <a id="items-footer-home">Développeurs</a>
        <a id="items-footer-home">Répertoire</a>
        <a id="items-footer-home">Paramètres</a>
        <a id="items-footer-home">© 2022 Twitter, Inc.</a>
      </div>
    </div>
  );
};

export default Home;
