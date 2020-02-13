/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */




 const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      callback(error, data.ip);
    }
  });
};



const fetchCoordsByIp = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      let objectCoords = {};
      objectCoords["latitude"] = data.data.latitude;
      objectCoords["longitude"] = data.data.longitude;
      callback(error, objectCoords);
    }
  });
};




const request = require("request");
const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      } else if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
      } else {
        const data = JSON.parse(body);
        let dataPassOver = data.response;
        callback(error, dataPassOver);
      }
    }
  );
};



const nextISSTimesForMyLocation  = function (callback){
    fetchMyIP((error, ip) => {
        if(error){
            return callback(error, null);
        }
        fetchCoordsByIp(ip, (error, loc) => {
            if(error){
                return callback(error, null);
            }
            fetchISSFlyOverTimes(loc, (error, nextPasses) => {
                if(error){
                    return callback(error, null);
                }
                callback(null, nextPasses);
            })
        })
    })

} 

module.exports = { nextISSTimesForMyLocation };
