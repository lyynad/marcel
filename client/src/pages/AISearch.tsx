import { useState } from 'react'
import './AISearch.css'

function AISearch () {

  const handleTextAreaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height =  (e.target.style.minHeight + e.target.scrollHeight) + "px";
  }

  return (
    <>
      <div className='main-container'>

        <div className="split-top">
          <div className="list-container">
            <span>Choose the itch to scratch.</span>
            <div className="list-block"></div>
          </div>
        </div>

        <div className="divider-text">OR</div>
        
        <div className="split-bottom">
          <div className="input-container">

            <span className="input-text">Just describe it.</span>
            
            <div className="input-field-border">
              <textarea className="input-field" onChange={(e) => handleTextAreaHeight(e)} />
            </div>
          
          </div>
        </div>

      </div>
    </>
  )
}

export default AISearch;
