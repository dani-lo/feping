export const capitalise = (str: string) => {
    return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}

export const ellypse = (str: string, n: number) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str
}

export const boldify = (txt: string) => {
    if (txt.indexOf('_') === -1) {
        return txt
    }
    return txt.split('_').map((t, i) => {
        if (t.indexOf('#') !== -1) {
            return <span key={ i }  className="bolded">{ t.replace('#', '') }</span>
        }
        return <span key={ i }>{ t }</span>
    })
}