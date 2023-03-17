import React, { useState, useEffect } from 'react';
import './topButton.css'

const TopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        const ShowButtonClick = () => {
            if (window.scrollY > 500) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }
        window.addEventListener("scroll", ShowButtonClick)
        return () => {
            window.removeEventListener("scroll", ShowButtonClick)
        }
    }, [])

    return (
        <>
        {
            showButton &&
            <div className='scroll_container'>
                <button onClick={scrollToTop}>Top</button>
            </div>
        }
        </>
    )
}

export default TopButton;