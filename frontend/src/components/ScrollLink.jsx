import React from 'react';
import { Link } from "react-router-dom";

const ScrollLink = ({to, children}) => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    

    return (
        <Link className="link" to={to} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default ScrollLink