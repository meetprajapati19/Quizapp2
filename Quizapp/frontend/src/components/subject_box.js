import React from 'react'
import './subject_box.css'
export default function subjectbox(props) {
    return (
        <div className="my-4 box_wrapper" >
            <div className="back" style={{ width: '418px' , height:'5rem'}}></div>
            <button type="button" className="btn" style={{ width: '418px' , height:'10rem'}}>{props.title}</button>
        </div>
    )
}
