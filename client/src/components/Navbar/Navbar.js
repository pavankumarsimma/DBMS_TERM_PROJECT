import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <p><span>Stock</span>flix</p>
            <ul>
                <li className={styles.links}>
                    <Link to="/">Home</Link>
                </li>
                <li className={styles.links}>
                    <Link to="/explore">Explore</Link>
                </li>
                <li className={styles.links}>
                    <Link to="/search">Search</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
