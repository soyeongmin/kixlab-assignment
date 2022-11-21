import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Options from './Options';
import NewOption from './NewOption';

interface OptionType {
  optionLabel:string;
  isAnswer: boolean;
}

function App() {
  // Get the data from server in the first time
  useEffect(() => dataGet(), []);
  const [optionLists, setOptionLists] = useState<{'answers':string[], 'distractors': string[]}>({
    'answers':[],
    'distractors':[]
  });

  const dataGet = () => {
    axios.get(`http://kuiz.kixlab.org:8080/getOptions`)
    .then(res => setOptionLists(res.data))
    .catch(err => console.log(err));
  }

  // if the summit btn is pressed, the new option is added
  function addOption(opt: OptionType) {
    if (opt.isAnswer) {
      setOptionLists({'answers':optionLists.answers.concat(opt.optionLabel), 'distractors': optionLists.distractors})
      console.log(optionLists)
    }
    else {
      setOptionLists({'answers':optionLists.answers, 'distractors': optionLists.distractors.concat(opt.optionLabel)})
    }
  }

  return (
    <div className="App">
      <div className='Container'>
        <Options title="Answers" list={optionLists.answers}/>
        <hr className="divider"></hr>
        <Options title="Distractors" list={optionLists.distractors}/>
      </div>
        <NewOption addOption={addOption}/>
    </div>
  );
}

export default App;
