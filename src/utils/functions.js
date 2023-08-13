export const weekNumberOfDate = (dateString) => {
    const dateObj = new Date(dateString);
    const start = new Date(dateObj.getFullYear(), 0, 1);
    const diff = (dateObj - start + (start.getUTCDay() === 1 ? 0 : 86400000)) / 86400000;
    return Math.ceil(diff / 7);
}