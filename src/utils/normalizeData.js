export const normalizeData = array => {
    return {
        byId: Object.fromEntries(array.map(item => [item.id, item])),
        allIds: array.map(item => item.id)
    };
};
