import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="site-header">
      <span className="site-header__logo">Vuln Harness</span>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/walkthrough">Walkthrough</NavLink>
        <NavLink to="/glossary">Glossary</NavLink>
      </nav>
    </header>
  );
}
