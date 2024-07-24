import React from 'react'
import { useNavigate } from 'react-router-dom'
import Subjectbox from './subject_box';

export default function Subject_box_wrapper() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/chapters');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="toc" />
                </div>
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="SE"/>
                </div>
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="FSD"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="toc" />
                </div>
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="SE"/>
                </div>
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="FSD"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="toc" />
                </div>
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="SE"/>
                </div>
                <div className="col-md-4 mb-4" onClick={handleClick}>
                    <Subjectbox title="FSD"/>
                </div>
            </div>
            {/* Repeat rows as needed */}
        </div>
    )
}
