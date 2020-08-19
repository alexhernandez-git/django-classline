import React from "react";
import "../../../static/assets/styles/components/Layout/Footer.scss";

const Footer = () => {
  return (
    <footer className="bg-success text-white m-0">
      <div className="container">
        <section className="mas-info">
          <p>
            Para contactar con nosotros{" "}
            <a
              href="mailto:support@classlineacademy.com"
              style={{ fontWeight: "bold" }}
            >
              support@classlineacademy.com
            </a>
          </p>

          <p>
            Copyright &copy; 2020 ClassLine Academy. Todos los derechos
            reservados.
          </p>
          <nav className="nav-footer">
            <ul>
              <li>
                <a href="#">Política de privacidad</a>
              </li>
              <li>
                <a href="#">Uso de cookies</a>
              </li>
              <li>
                <a href="#">Condiciones de uso</a>
              </li>
              <li>
                <a href="#">Ventas y reembolsos</a>
              </li>
              <li>
                <a href="#">Avisos legales</a>
              </li>
              <li>
                <a href="#">Mapa del sitio</a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
