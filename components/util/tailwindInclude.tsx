export const TailwindIncludeComponent = () => {

    const cname = `
        text-2xl 
        text-xl 
        text-md 
        text-sm 
        text-xs
        font-bold
        text-white
        bg-black
        rounded-sm
        text-gray-800
        bold
    `
    return <span className={ cname } style={{ display: 'none' }}></span>
}