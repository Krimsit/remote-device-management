const getChange = (old_data: any, new_data: any) => {
    return JSON.stringify(old_data) !== JSON.stringify(new_data) ? true : false
}

export default getChange
