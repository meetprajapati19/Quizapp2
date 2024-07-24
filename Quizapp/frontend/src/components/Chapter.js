import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Chapter() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/quiz');
    }

    return (
        <div className='container my-4'>
            <button type="button" className="btn btn-danger my-3 text-start" style={{ width: '100%', borderRadius: '30px' }} onClick={handleClick}>
                1. nfa dfa
            </button>
            {/* Repeat buttons as needed */}
        </div>
    )
}
