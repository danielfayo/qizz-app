import React from 'react'

export default function QuestionBlock(props) {
    return (
        <div className='question-block'>
            <p className='question-text'>
                {props.question}
            </p>
            <div className='options'>
                {props.options}
            </div>
            <hr className='div-line'/>
        </div>
    )
}
