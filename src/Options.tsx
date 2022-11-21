import React from 'react';

interface optionProps {
    title: string;
    list: string[];
  }

const Options = (props: optionProps) => {

    return (
        <div>
            <h3>{props.title}</h3>
            {props.list.map(v => {
                return <div className='textView'>{v}</div>
            })}
        </div>
    )
}

export default Options;