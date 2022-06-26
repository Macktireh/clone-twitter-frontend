import React from "react";

import Button from "../../components/Buttons/buttonSubmit";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <div className="container-content">
        <header>
          <img
            className="logo"
            src="/static/svg/twitter.svg"
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
              nameClass={"btn-signup-ext"}
              pic={"/static/svg/google.svg"}
              text={"S'inscrire avec Google"}
            />
            <Button
              nameClass={"btn-signup-ext"}
              pic={"/static/svg/apple.svg"}
              text={"S'inscrire avec Apple"}
            />
            <div className="sep">
              <hr />
              <span>ou</span>
            </div>
            <div className="frame-signup-int">
              <Link to="/account/signup">
                <Button
                  nameClass={"btn-signup-int"}
                  text={"S'inscrire avec un email et password"}
                />
              </Link>
              <p>
                En vous inscrivant, vous acceptez les{" "}
                <span href="">Conditions d'Utilisation</span> et la{" "}
                <span href="">Politique de Confidentialité</span>, incluant l'
                <span href="">Utilisation de Cookies</span>.
              </p>
            </div>
          </div>
          <div className="frame-signin">
            <h4>Vous avez déjà un compte ?</h4>
            <Button nameClass={"btn-signin"} text={"Se connecter"} />
          </div>
        </div>
      </div>
      <div className="container-img">
        <img src="/static/svg/twitter.svg" alt="" />
      </div>
      <div className="container-footer">
        <span id="items-footer-home">À propos</span>
        <span id="items-footer-home">Centre d'assistance</span>
        <span id="items-footer-home">Conditions d’utilisation</span>
        <span id="items-footer-home">Politique de Confidentialité</span>
        <span id="items-footer-home">Politique relative aux cookies</span>
        <span id="items-footer-home">Accessibilité</span>
        <span id="items-footer-home">Informations sur les publicités</span>
        <span id="items-footer-home">Blog</span>
        <span id="items-footer-home">Statut</span>
        <span id="items-footer-home">Carrières</span>
        <span id="items-footer-home">Ressources de la marque</span>
        <span id="items-footer-home">Publicité</span>
        <span id="items-footer-home">Marketing</span>
        <span id="items-footer-home">Twitter pour les professionnels</span>
        <span id="items-footer-home">Développeurs</span>
        <span id="items-footer-home">Répertoire</span>
        <span id="items-footer-home">Paramètres</span>
        <span id="items-footer-home">© 2022 Twitter, Inc.</span>
      </div>
    </div>
  );
};

export default Home;
