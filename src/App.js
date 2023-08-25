import { useState, useEffect } from 'react';
import './App.css';
import './Responsive.css';

function App() {

  const apiKey = process.env.REACT_APP_API_NINJAS_KEY;

  const [bucketlist, setBucketList] = useState(''); // useState for storing bucket list item
  const [generateIdea, setGenerateIdea] = useState(false); // useState for click event
  const [generateHere, setGenerateHere] = useState(true);

  function handleClick(event){
    // console.log(event);
    setGenerateIdea(true);
    setGenerateHere(false);
    const clickText = event.target;
    clickText.innerText = 'Click again!';
  }

  useEffect(() => {
    if (generateIdea){
      fetch('https://api.api-ninjas.com/v1/bucketlist', {
        headers:{'X-API-Key' : apiKey},
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setBucketList(data);

        setGenerateIdea(false);
        setGenerateHere(false);
      })
      .catch((error) => {
        console.error("Error fetching from API Ninjas:", error);
      })
    }
  }, [generateIdea, apiKey]);



  return (
    <div className="container">
      <img className='logo' src='images/logo.png' alt='logo'/>
      <div className='instructions'>
        <h3 style={{textDecoration: 'underline', textUnderlineOffset: '0.2em', fontWeight: '400', marginLeft: '2.5em'}}>How to use <span style={{fontSize: '0.7em'}}>(it's simple!)</span></h3>
        <ol style={{lineHeight: '1.5'}}>
          <li style={{listStyleType: 'none'}}> 1. Click the red button below</li>
          <li style={{listStyleType: 'none'}}>2. Generate an idea for your bucket list</li>
          <li style={{listStyleType: 'none'}}>3. Click the button as many times as you want to generate unique and innovative bucket list ideas!</li>
        </ol>
      </div>

      {/* GENERATE BUTTON */}
      <div onClick={handleClick} className='click-btn'>Click me!</div>


      {/* GENERATE IDEA */}
      <div className='idea-wrapper'>
        <p className='idea-text'>{bucketlist.item}</p>
        {generateHere && (<p className='generate-here-txt'>Your idea will generate here!</p>)}


      </div>

      <footer>© Nicole Moncrieffe 2023</footer>
    </div>
  );
}

export default App;
