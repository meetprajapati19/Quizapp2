import React from 'react'

export default function InputSelection(props) {
    return (

        <div className="col-md-6 mb-3">
            <div className="input-group">
                <select className="form-select custom-width" id="inputGroupSelect01">
                    <option selected>{props.name}</option>
                    <option value="1">5CSE2</option>
                </select>
                <label className="input-group-text" htmlFor="inputGroupSelect01">Class</label>
            </div>
        </div>

    )
}
