import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";
const Punctuation = () => {
    return (
        <IconContext.Provider
            value={{
                className: "global-class-name text-warning",
                size: '20px'
            }}>
            <div className="punctuation">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
            </div>
        </IconContext.Provider>
    );
}

export default Punctuation;
<IconContext.Provider
    value={{
        className: "global-class-name text-warning",
        size: '20px'
    }}>
    <div className="punctuation">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
    </div>
</IconContext.Provider>