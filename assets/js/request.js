export const getDatas = async (url) => {
    try {
        let { data } = await axios.get(url)
        return data;
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


export const postDatas = async (url, obj) => {
    try {
        let { data } = await axios.post(url, obj)
        return data;
    }
    catch (error) {
        console.log(error)
        throw error;
    }

}

export const deleteById = async (url, id) => {
    try {
        let { data } = await axios.delete(`${url}/${id}`)
        return data
    }
    catch (error) {
        console.log(error)
        throw error
    }
    
}
    export const patchById = async (url, obj, id) => {
        try {
            let { data } = await axios.patch(`${url}/${id}`, obj)
            return data
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }