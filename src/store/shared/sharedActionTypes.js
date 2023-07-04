export const firstLoadingData = label => {
    return label + "/FIRST_LOAD_DATA";
};
export const updateData = label => {
    return label + "/UPDATE_DATA";
};
export const setLoading = label => {
    return label + "/SET_LOADING";
};

export const setLoaded = label => {
    return label + "/SET_LOADED";
};

export const setErrors = label => {
    return label + "/SET_ERRORS";
};

export const changeCurrentPage = label => {
    return label + "/CHANGE_CURRENT_PAGE";
};

export const resetPage = label => {
    return label + "/RESET_PAGE";
};

export const changeFormField = label => {
    return label + "/CHANGE_FORM_FIELD";
};
export const setLoadedResidents=label=>{return label +'/SET_LOADED_RESIDENTS'} 
export const setResetResidents=label=>{return label +'/SET_RESET_RESIDENTS'} 

export const getActionsTypesByLabel = label => {
    return [
        firstLoadingData(label),
        updateData(label),
        setLoading(label),
        setLoaded(label),
        setErrors(label),
        changeCurrentPage(label),
        resetPage(label),
        changeFormField(label),
      
    ];
};

export const getActionsTypesByLabelResidents = label =>{
    return [
        setLoadedResidents(label),
        setResetResidents(label)

    ]
}