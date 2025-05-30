import styles from '../Theme.module.css'
import './AllStatCards.css';

function AllStatCards() {
  const theme : string = 'dark';
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;
  return (
    <div className={`${themeClass} all_cards`}>
        <div className="card card__total">
            <h2>00</h2>
            <p>Total Characters</p>
        </div>
        <div className="card card__word-count">
            <h2>00</h2>
            <p>Word Count</p>
        </div>
        <div className="card card__sentence-count">
            <h2>00</h2>
            <p>Sentence Count</p>
        </div>
    </div>
  )
}

export default AllStatCards