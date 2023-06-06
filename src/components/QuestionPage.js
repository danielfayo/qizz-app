import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import QuestionBlock from './QuestionBlock'

export default function QuestionPage(props) {

    const [questions, setQuestions] = useState([])
    const [isSubmited, setIsSubmited] = useState(false)

    useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => {
                const question = data.results.map(result => {
                    const incorrectAnswer = result.incorrect_answers;
                    const correctAnswer = result.correct_answer;
                    return {
                        ...result, options: [...incorrectAnswer.map(each => ({value: each, isSelected: false, id: nanoid()})),{value: correctAnswer, isSelected: false, id: nanoid(), correct: true}].sort(() => Math.random() - 0.5)
                    }
                })
                setQuestions(question)
            })
    }, [])

    function handleSelectAnswer(questionIndex, optionIndex){
        const newArr = questions.map((question, questionIndx) => {
            return (questionIndex === questionIndx) ? {...question, options: question.options.map((option, optionIndx) => {
                return (optionIndex === optionIndx) ? {...option, isSelected: true} : {...option, isSelected: false} 
            } )} : question
        })
        setQuestions(newArr)
    }

    function checkIsCorrect(each){
        if (isSubmited && each.correct){
            return 'correct-answer'
        } else if (isSubmited && each.isSelected && !each.correct){
            return 'wrong-answer'
        } else if(each.isSelected){
            return 'clicked-button'
        } else {
            return 'default-button'
        }
    }

    const questionBlock = questions.map((question, questionIndex) => {
        const options = question.options.map((option, optionIndex) =>
            <button
                className={checkIsCorrect(option)}
                key={nanoid()}
                onClick={()=>handleSelectAnswer(questionIndex, optionIndex)}
            >
                {option.value}
            </button>
        )
        return <QuestionBlock
            key = {nanoid()}
            question = {question.question}
            options = {options}
        />
    })

    let count = 0;
    questions.map(question => question.options.find(each => {
        if (each.isSelected && each.correct){
            return count++
        }
    }))

    function submitAnswers(){
        if (!isSubmited){
            setIsSubmited(true)
        }
    }

    return (
        <div>
            {questionBlock}
            {isSubmited && <h4 className="score">You got {count}/{questions.length}</h4>}
            { isSubmited ? <button 
                className='submit-button'
                onClick={props.onClick}
            >
                Play again
            </button> :
            <button 
                className='submit-button'
                onClick={submitAnswers}
            >
                Check answer
            </button>}
        </div>
    )
}
