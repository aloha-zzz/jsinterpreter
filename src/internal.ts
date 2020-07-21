/** js internal build in var and function */


const internalVar = {

}


const internalFunction = {
    console: {
        log: (...args) => console.log(...args)
    }
}




export const internal = {
    ...internalVar,
    ...internalFunction
}