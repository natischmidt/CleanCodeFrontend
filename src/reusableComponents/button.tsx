import React, { MouseEvent } from 'react';

interface ButtonProps {
    text: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
