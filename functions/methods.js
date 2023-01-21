function getById(array, id) {
    const item = array.find(obj => obj.id === parseInt(id))
    return item
}

function getIndexById(array, id) {
    const index = array.findIndex(obj => obj.id === parseInt(id))
    return index
}

function getObjectByAny(array, key){
    const obj = array.find(obj => obj[key] === key)
    return obj
}

module.exports = {getById, getIndexById, getObjectByAny}