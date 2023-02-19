const {paginationSchema} = require('./errors/schema')


function paginate(array, req) {
    const validation = paginationSchema(req.query)

    const { page, limit } = validation.value  //using the validated input from the paginationSchema
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let result = {}
    // designing result object structure
    const totalPages = () => {
        const operationResult = (array.length / limit)
        if (!Number.isInteger(operationResult)) {// if the division result is a float value
            return Math.ceil(operationResult)
        }
        return operationResult
    }

    result.totalPages = totalPages() //using the return value of the function
    if (startIndex > 0) { //if another page(s) exist before the current page        
        result.previousPage = page - 1
    }

    result.currentPage = page  //the present page that is being displayed

    if (endIndex < array.length) { // if we have more page(s) after the current page
        result.nextPage = page + 1
    }

    result.limit = limit //limit as specified in the request. The maximum number of items per page 

    result.usersList = array.slice(startIndex, endIndex)//returning the specified portion of the users array
    return result

}

module.exports = paginate