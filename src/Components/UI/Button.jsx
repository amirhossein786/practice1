const Button = ({children, className, onClick, type}) => {
    return (
            <button
                className={`bg-first-blue rounded-lg duration-300 hover:bg-hover-blue hover:text-gray-700 px-8 md:px-16 py-1.5 text-white
                ${className}`} onClick={onClick} type={type}>
                {children}
            </button>
    );
};

export default Button;