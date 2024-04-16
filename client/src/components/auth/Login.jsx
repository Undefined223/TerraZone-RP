import React from 'react'
import '../styles/Auth.css'

const Login = () => {
    return (
        <div>

            <form className="form">
                <div className="form-title"><span>sign in to your</span></div>
                <div className="title-2"><span>SPACE</span></div>


                <section className="bg-stars">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                </section>


                <button type="submit" className="submit">
                    <span className="sign-text">Lg in</span>
                </button>



            </form>



        </div>
    )
}

export default Login