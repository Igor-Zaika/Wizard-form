export const changeLastUpdate = (value) => {
    const newUpdate = {...value}
    newUpdate.update = Date.now();
    return newUpdate;
}