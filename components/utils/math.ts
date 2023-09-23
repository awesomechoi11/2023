export const createScreenScale = (screenwidth: number) => (val: number) => {
    return (val / 1920) * screenwidth;
};

export const relativePercent = (num: number) => {
    return (num / 1920) * 100;
};
