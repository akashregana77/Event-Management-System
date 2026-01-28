import React from 'react';
import '../styles/Skeleton.css';

const Skeleton = ({ width, height, borderRadius, style, className }) => {
    return (
        <div
            className={`skeleton ${className || ''}`}
            style={{
                width,
                height,
                borderRadius,
                ...style
            }}
        />
    );
};

export default Skeleton;
