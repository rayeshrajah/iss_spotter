const {nextISSTimesForMyLocation} = require('./iss_promised');
const {printDate} = require('./index')

nextISSTimesForMyLocation()
    .then((passTime) => {
        printDate(passTime);
    }).catch((error) => {
       console.log('It didnt work: ', error.message);
    })

    