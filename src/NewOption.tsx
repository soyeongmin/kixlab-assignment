import React, { useState } from 'react';
import axios from 'axios';

type DataSend = {
    optionLabel: string;
    isAnswer: boolean;
    success: boolean;
}

type FuncProps = {
    addOption: (newOption: {
        optionLabel:string;
        isAnswer: boolean;
    }) => void;
}

const NewOption = ({addOption}:FuncProps) => {
    const [optionInput, setOptionInput] = useState<string>('');
    const [selectedRadio, setSelectedRadio] = useState<string>('answer');

    const submit = () => {
        const newOption = { optionLabel: optionInput, isAnswer: (selectedRadio == "answer") ? true : false}
        axios.post<DataSend>('http://kuiz.kixlab.org:8080/submitOption', newOption)
        .then(res => {
            if(res.data.success == true) addOption(newOption);
        })
        .catch(err => console.log(err));
    }

    const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setOptionInput(e.target.value);
    }

    const handleRadio = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSelectedRadio(e.target.value);
    }

    return (
        <div className='InputContainer'>
            <h4>Create a New Option</h4>
            <div className='HorContainer'>
                <input className='TextField' onChange={changeInput} placeholder='Type to create option...'></input>
                <div className='RadioContainer'>
                    <label className='radio_align'>
                        <input type='radio' value="answer" checked={selectedRadio=='answer'} onChange={handleRadio}/>Answer
                    </label>
                    <label className='radio_align'>
                        <input type='radio' value="distractor" checked={selectedRadio=='distractor'} onChange={handleRadio}/>Distractor
                    </label>
                </div>
            </div>
            <button onClick={submit} className='SubmitBtn'>Submit</button>
      </div>
    )
}

export default NewOption;