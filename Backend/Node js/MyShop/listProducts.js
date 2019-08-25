var faker = require("faker");


function products(num) {
    for(var i=0; i<num; i++) {
        console.log(faker.name.findName() + " " + faker.finance.amount());
    }    
}

products(5);