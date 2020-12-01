const TextButton = ({background, color, text, click}) => 
<button className={`transition duration-300 ease-in-out ${background || 'bg-lightGreen'} rounded-md px-3 py-3 shadow-lg ${color || 'text-white'}`} onClick={click}>{text}</button>


export {
    TextButton
}