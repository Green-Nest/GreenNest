import { Link } from 'react-router-dom';

<li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="shopDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Shop
  </a>
  <ul className="dropdown-menu" aria-labelledby="shopDropdown">
    <li><Link className="dropdown-item" to="/indoor-plants">Indoor Plants</Link></li>
    <li><Link className="dropdown-item" to="/outdoor-plants">Outdoor Plants</Link></li>
    <li><Link className="dropdown-item" to="/planters-tools">Planters & Tools</Link></li>
  </ul>
</li>
