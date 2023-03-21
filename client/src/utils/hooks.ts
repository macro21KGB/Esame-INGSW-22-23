import { useState } from "react";

const useToggle = (initialState: boolean) => {
    const [toggleValue, setToggleValue] = useState(initialState);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
};

  export { useToggle}