import { useState, useEffect } from "react";
import { getScreenType } from "configs/widthConfig/config";

const useWindowDimension = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        type: getScreenType(window.innerWidth),
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
                type: getScreenType(window.innerWidth),
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowDimensions;
};

export default useWindowDimension;
