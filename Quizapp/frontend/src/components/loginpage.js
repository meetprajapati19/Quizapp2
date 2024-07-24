import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Loginpage() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form validation logic here
        navigate('/subjects');
    }

    return (
        <div className="container col-3 border border-2 p-4 shadow" style={{ marginTop: '100px' }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <div className="d-flex">
                        <div className="form-check me-3">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                STUDENT
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                TEACHER
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    )
}
