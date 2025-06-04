import { useGlobalContext } from '../contextAPI/context';
import './LetterDensityChart.css'

function LetterDensityChart() {
    const theme : string = 'dark';
    const arrowColor = theme === 'dark' ? '#E4E4EF' : '#12131A'; //color based on theme
    const {letterDensity} = useGlobalContext();
  return (
    <>
        <h3>Letter Density</h3>
        {
          letterDensity.length<=0?
          <p className="empty-field-message">No Characters found. Start typing to see letter density.</p>:
        <div className="letter-list">
          {
            letterDensity.map((letter, index)=>{
                return (<div className="letter-density-item" key={index}>
            <span>{letter.key}</span>
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: letter.percentage+"%" }}></div>
            </div>
            <span className="letter-density-item--value">{letter.value}</span>
            <span>({letter.percentage})%</span>
          </div>)
            })
          }
          
          <p className='letter-list--more'>See more <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 448 512"><path fill={arrowColor} d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></p>
        </div>}
    </>
  )
}

export default LetterDensityChart