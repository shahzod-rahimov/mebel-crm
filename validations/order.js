const {checkSchema} = require("express-validator")

const orderCreateValidation = checkSchema({
    full_name:{
        isString:{},
        errorMessage:"Full_name need to be string"
    },
    address:{
        isString:{},
        errorMessage:"Address must be string"
    },
    target_address:{
        isString:{},
        errorMessage:"target_adress must be string"
    },
    status:{
        isNumber:{},
        errorMessage:"status need to be number"
    },
    description:{
        isString:{},
        errorMessage:"description need to be string"
    }
})

const orderUpdateValidation = checkSchema({
    full_name:{
        isString:{},
        optional:{},
        errorMessage:"Full_name need to be string"
    },
    address:{
        isString:{},
        optional:{},
        errorMessage:"Address must be string"
    },
    target_address:{
        isString:{},
        optional:{},
        errorMessage:"target_adress must be string"
    },
    status:{
        isNumber:{},
        optional:{},
        errorMessage:"status need to be number"
    },
    description:{
        isString:{},
        optional:{},
        errorMessage:"description need to be string"
    }  
})


const queryValidation = checkSchema({
    product: {
        isMongoId: {},
        optional: {},
        errorMessage: "Invalid ID",
    },
    staff: {
        isMongoId: {},
        optional: {},
        errorMessage: "Invalid ID",
    },
    contact: {
        isMongoId: {},
        optional: {},
        errorMessage: "Invalid ID",
    },
})

module.exports = {
    orderCreateValidation,
    orderUpdateValidation,
    queryValidation
}