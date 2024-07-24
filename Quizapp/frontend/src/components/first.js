import React from 'react'
import InputSelection from './inputSelection'

export default function First() {
    return (
        <div className="container my-5">
            <div className="row">
                <InputSelection name="6CSE1" />
                <InputSelection />
            </div>
            <div className="row">
                <InputSelection />
                <InputSelection />
            </div>
        </div>
    )
}
