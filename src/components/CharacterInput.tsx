import './CharacterInput.css'
function CharacterInput() {
    let limit  : boolean = false;
  return (
    <>
      <div className='character_textarea--container'>
        <textarea className="character_textarea" name="" id="" placeholder='Start typing here… (or paste your text)'></textarea>
        <div className="character_textarea--options">
          <div className="character_textarea--options--checks">
            <div className="input__group input__group-spaces">
              <input type="checkbox" name="spaces" id="spaces" />
              <label htmlFor="spaces">
                Exclude Spaces
              </label>
            </div>
            
            <div className="input__group input__group-spaces">
                <input type="checkbox" name="limit" id="limit" onChange={(e)=>{
                  e.target.checked?limit=true:limit=false;
                  }} 
                  />
              <label htmlFor="limit">Set Character Limit</label>
              {limit?<input type="text" name="limitnum" id="limitnum" />:''}
              
            </div>
            
          </div>
          <div className="reading_time">
            <p>Approx. reading time: {'<'} 0 minute</p>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default CharacterInput