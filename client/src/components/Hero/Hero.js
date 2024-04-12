import styles from './Hero.module.css';
import videoContent from '../../assets/videos/background.mp4';

function Hero() {
    return(
        <div className={styles.hero}>
            <video autoPlay muted loop className={styles.video}>
                <source src={videoContent} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles.overlay}>
                <p className={styles.heading}><span>Stock</span>flix</p>
                <p className={styles.tagline}>Stream through stocks</p>
                <p className={styles.desc}>StockFlix offers a comprehensive platform for accessing live stock data and real-time prices. Dive into insightful infographics that simplify complex market trends. Explore and search for specific stocks to stay informed and make informed investment decisions. StockFlix is your one-stop destination for all things stock market, designed to empower investors with valuable insights and analysis.</p>
            </div>
        </div>
    );
}

export default Hero;