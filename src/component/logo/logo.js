import React from 'react'
import logoImg from './logo.jpg'
import './logo.css';

class Logo extends React.Component{

    render(){
        return (
            <div className="logo-container">
                <img style={{width: 300}} src={logoImg} alt=""/>
            </div>
        )
    }
}

export default Logo