export const load = (key: string) => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        return stored == null ? undefined : JSON.parse(stored);
    }

}

export const store = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
        const str = JSON.stringify(value)
        localStorage.setItem(key, str.trim());
    }
}

