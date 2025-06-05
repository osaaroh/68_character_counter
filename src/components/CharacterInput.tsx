import './CharacterInput.css'
import styles from '../Theme.module.css'
import { useGlobalContext } from '../contextAPI/context';
import { useState } from 'react';
function CharacterInput() {
    const {theme} = useGlobalContext();
    const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme ;
    const {characterLimit, characterLimitValue, characterCount, excludeSpaces, readTime, storeAllText,storeCharacterLimitValue, toggleCharacterLimit, toggleExcludeSpaces } = useGlobalContext();

    //state to check that the textLength of the text area when spaces excluded
    //is equal to the character limit
    const [textAreaLengthReached, setTextAreaLengthReached] = useState(false);
  return (
    <>
      <div className={`${themeClass} character_textarea--container`}>
        <textarea className={`character_textarea ${characterLimit && characterLimitValue>0 && characterCount>characterLimitValue && 'character_textarea_error'}`} id="" maxLength={characterLimit&&characterLimitValue>0?characterLimitValue+1:undefined} placeholder='Start typing here… (or paste your text)'onChange={(e)=>{
          storeAllText(e.target.value);
          
          //use textLength to fix error class issue when excluding spaces
          if(excludeSpaces&&characterLimit&&characterLimitValue>0&&characterLimitValue+1==e.target.textLength){
            e.target.classList.add('character_textarea_error');
            setTextAreaLengthReached(true)
          }else{
            e.target.classList.remove('character_textarea_error');
            setTextAreaLengthReached(false);
          }
          
        }
        }></textarea>
        {characterLimit && characterLimitValue>0 && characterCount>characterLimitValue || textAreaLengthReached &&<p className='limit_error_text'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none" viewBox="0 0 14 15"><path fill="#FE8159" d="M7 1.344A5.899 5.899 0 0 0 1.094 7.25 5.882 5.882 0 0 0 7 13.156a5.899 5.899 0 0 0 5.906-5.906c0-3.254-2.68-5.906-5.906-5.906Zm0-.875c3.719 0 6.781 3.062 6.781 6.781 0 3.746-3.062 6.781-6.781 6.781A6.78 6.78 0 0 1 .219 7.25C.219 3.531 3.254.469 7 .469Zm-.984 9.406h.328V6.594h-.328a.316.316 0 0 1-.329-.328v-.22c0-.163.137-.327.329-.327h1.312c.164 0 .328.164.328.328v3.828h.328c.164 0 .329.164.329.328v.219a.332.332 0 0 1-.329.328H6.016a.316.316 0 0 1-.329-.328v-.219c0-.164.137-.328.329-.328ZM7 3.312a.9.9 0 0 1 .875.876c0 .492-.41.875-.875.875a.864.864 0 0 1-.875-.875c0-.465.383-.875.875-.875Z"/></svg>Limit reached! Your text exceeds {characterLimitValue} character(s).</p>}
        <div className="character_textarea--options">
          <div className="character_textarea--options--checks">
            <div className="input__group input__group-spaces">
              <input type="checkbox" name="spaces" id="spaces" onChange={()=>{
                  toggleExcludeSpaces();
                  }} />
              <label htmlFor="spaces">
                Exclude Spaces
              </label>
            </div>
            
            <div className="input__group input__group-spaces">
                <input type="checkbox" name="limit" id="limit" onChange={()=>{
                  toggleCharacterLimit()
                  }} 
                  />
              <label htmlFor="limit" className='character_limit_label'>Set Character Limit</label>
              {characterLimit?<input type="number" name="limitnum" id="limitnum" onChange={(e)=>{
                  storeCharacterLimitValue(Number(e.target.value));
                  }}/>:''}
              
            </div>
            
          </div>
          <div className="reading_time">
            <p>Approx. reading time: {readTime}</p>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default CharacterInput