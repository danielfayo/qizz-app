import React from 'react'

export default function LauchPage({ onClick }) {
    return (
        <main className='launch-page'>
            <h1 className='launch-heading'>Quizzical</h1>
            <h5 className='launch-p'>Some description if needed</h5>
            <button className='launch-button' onClick={onClick}>Start quiz</button>
        </main>
    )
}
