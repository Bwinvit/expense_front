export const screenSizes = {
    2560: "4k",
    1440: "QHD",
    1024: "Laptop",
    768: "Tablet",
    425: "MobileL",
    375: "MobileM",
    320: "MobileS",
};

export const getScreenType = (width) => {
    if (width >= 2560) return screenSizes["2560"];
    if (width >= 1440) return screenSizes["1440"];
    if (width >= 1024) return screenSizes["1024"];
    if (width >= 768) return screenSizes["768"];
    if (width >= 425) return screenSizes["425"];
    if (width >= 375) return screenSizes["375"];
    return screenSizes["320"];
};
