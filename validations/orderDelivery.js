const {checkSchema} = require("express-validator");

const orderDeliveryCreateValidation = checkSchema({
    description:{
        isString:{},
        errorMessage:"Description must be string type"
    },
    stuff_id:{
        isMongoId:{},
        errorMessage:"Invalid stuff_id"
    },
    order_id:{
        isMongoId:{},
        errorMessage:"Invalid order_id"
    }
});

const orderDeliveryUpdateValidation = checkSchema({
    description:{
        isString:{},
        optional:{},
        errorMessage:"Description must be string type"
    },
    stuff_id:{
        isMongoId:{},
        optional:{},
        errorMessage:"Invalid stuff_id"
    },
    order_id:{
        isMongoId:{},
        optional:{},
        errorMessage:"Invalid order_id"
    }
})

const queryValidation = checkSchema({
    stuff:{
        isMongoId:{},
        optional:{},
        errorMessage:"Invalid Mongo ID"
    },
    order:{
        isMongoId:{},
        optional:{},
        errorMessage:"Invalid Mongo id Order"
    }
})

module.exports = {orderDeliveryCreateValidation,orderDeliveryUpdateValidation,queryValidation}