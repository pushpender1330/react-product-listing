import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 500) => {

    const [input,setInput] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setInput(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value]);

    return {
        input
    }


}
export default useDebounce;