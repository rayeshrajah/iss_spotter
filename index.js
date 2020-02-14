const { fetchISSFlyOverTimes } = require("./iss");
// const { fetchCoordsByIp } = require("./iss");
// // const { fetchMyIP } = require('./iss');
// // fetchMyIP((error, ip) => {
// //   if (error) {
// //     console.log("It didn't work!" , error);
// //     return;
// //   }
// //   console.log('It worked! Returned IP:' , ip);
// // });

// fetchCoordsByIp("67.71.216.6", (error, data) => {
//   if (error) {
//     console.log("Error fetch details:", error);
//   } else {
//     console.log(data);
//   }
// });

// fetchISSFlyOverTimes(
//   { latitude: "43.63190", longitude: "-79.37160" },
//   (error, time) => {
//     if (error) {
//       console.log("Error fetch details: ", error);
//     } else {
//       console.log(time);
//     }
//   }
// );

const { nextISSTimesForMyLocation } = require('./iss');

const printDate = function(passTimes){
    for(const pass of passTimes){
        const datetime = new Date(1);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`)
    }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printDate(passTimes);
});

module.exports = {printDate};