"use strict";
/**
 * Hackathon @ J On The Beach 2017
 * Config file (temporary)
 *
 * Config should be better written (really?) in JSON files, which are parsed and joined.
 *   While we are experimenting, we will use this JS config file which is easier
 *   to load and modify.
 *
 * @license MIT
 * @author Álvaro Santamaría Herrero <asantamaria@itrsgroup.com>
 * @author Zuri Pabón <zpabon@itrsgroup.com>
 * @author José Ángel Morell <ja2m_@hotmail.com>
 * @author (Each contributor appends a line here)
 */
import {
    uniformGenerator,
    constantGenerator
} from '../../lib_js/util_js/random';
import {
    publishEventToStream
} from '../../lib_js/valo_sdk_js/index';
import {
  Borders
} from '../lib/map_borders';

///////////////////////////////////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////////////////////////////////
const LA_TERMICA_COORDINATES = {
  lat: 36.689150,
  lon: -4.445000,
  radius: 80,
  bounds:{
    sw:{
      lat: 36.688845,
      lon: -4.445961
    },
    ne: {
      lat: 36.689417,
      lon: -4.443649
    }
  }
};
const LA_TERMICA_BORDERS = Borders([
  [ 36.688839, -4.446547 ],
  [ 36.689908, -4.446453 ],
  [ 36.689564, -4.443819 ],
  [ 36.688394, -4.444114 ]
]);
// Imagine a grid on the map, with GRID_RESOLUTION square tiles of side SIZE long
const GRID_RESOLUTION = 1000;
const GRID_SIZE = LA_TERMICA_COORDINATES.bounds.ne.lon
    - LA_TERMICA_COORDINATES.bounds.sw.lon;
// Center
const ORIGIN_LON = LA_TERMICA_COORDINATES.lon;
const ORIGIN_LAT = LA_TERMICA_COORDINATES.lat;
const MIN_LON = LA_TERMICA_COORDINATES.bounds.sw.lon;
const MIN_LAT = LA_TERMICA_COORDINATES.bounds.sw.lat;
const MAX_LON = LA_TERMICA_COORDINATES.bounds.ne.lon;
const MAX_LAT = LA_TERMICA_COORDINATES.bounds.ne.lat;

///////////////////////////////////////////////////////////////////////////////
// VALO Clients config
///////////////////////////////////////////////////////////////////////////////
const valoClient = {
    host : 'localhost',
    port : 8888,
    tenant : 'demo'
};

///////////////////////////////////////////////////////////////////////////////
// WALKERS - Acceleration generators for walkers
///////////////////////////////////////////////////////////////////////////////
// Walker resolution
const TUNE_THIS = 6; // Tune this param to adjust the size of the steps
const WALKER_RESOLUTION = 0.000000001 * TUNE_THIS * 1 / GRID_RESOLUTION;

// Acceleration generators
const accGeneratorMobile = uniformGenerator(-1,1);
const accGeneratorIotBoard = constantGenerator(0,0); //Acceleration always 0

// Walker Data Configs
const walkerDataConfigs = {
    walkerMobileDefault : {
        resolution : WALKER_RESOLUTION,
        initPosVel : {
            initPosX : ORIGIN_LON,
            initPosY : ORIGIN_LAT,
            initVelX : 0,
            initVelY : 0
        },
        accRandomGenerator : accGeneratorMobile
    }
}


///////////////////////////////////////////////////////////////////////////////
// VALO CONTRIBUTORS
///////////////////////////////////////////////////////////////////////////////
const contributorTypes = {
    mobile_user : {
        name: "mobile_user",
        onTickFunction: onTickMobile,
        schema: {
            "type": "record",
            "properties": {
                "id": {
                    "type": "contributor"
                },
                "user": {
                    "type" : "record",
                    "properties" : {
                        "name" : {"type": "string"},
                        "typeOfParticipant" : {"type" : "string"},
                        "role" : {"type" : "string"},
                        "country" : {"type" : "string"},
                        "gender" : {"type" : "string"}
                    }
                }
            }
        }
    },
    iot_board : {
        name: "iot_board",
        onTickFunction: onTickIotBoard,
        schema: {
            "type": "record",
            "properties": {
                "id": {
                    "type": "contributor"
                },
                "model" : {"type" : "string"},
                "vendor" : {"type" : "string"}
            }
        }
    }
}

const contributors = [
    // IOT BOARDS
    {
        id : "fake-board-00001",
        contributorType: "iot_board",
        valoData: {
            "id" : "fake-board-00001",
            "model" : "fake-surfboard",
            "vendor" : "FAKE"
        },
        walkerData : {
            resolution : WALKER_RESOLUTION,
            initPosVel : {
                initPosX : -4.444078,
                initPosY : 36.689484,
                initVelX : 0,
                initVelY : 0
            },
            accRandomGenerator : accGeneratorIotBoard
        }
    },
    {
        id : "fake-board-00002",
        contributorType: "iot_board",
        valoData: {
            "id" : "fake-board-00002",
            "model" : "fake-surfboard",
            "vendor" : "FAKE"
        },
        walkerData : {
            resolution : WALKER_RESOLUTION,
            initPosVel : {
                initPosX : -4.444214,
                initPosY : 36.689181,
                initVelX : 0,
                initVelY : 0
            },
            accRandomGenerator : accGeneratorIotBoard
        }
    },
    {
        id : "fake-board-00003",
        contributorType: "iot_board",
        valoData: {
            "id" : "fake-board-00003",
            "model" : "fake-surfboard",
            "vendor" : "FAKE"
        },
        walkerData : {
            resolution : WALKER_RESOLUTION,
            initPosVel : {
                initPosX : -4.443800,
                initPosY : 36.689414,
                initVelX : 0,
                initVelY : 0
            },
            accRandomGenerator : accGeneratorIotBoard
        }
    },
    {
        id : "fake-board-00004",
        contributorType: "iot_board",
        valoData: {
            "id" : "fake-board-00004",
            "model" : "fake-surfboard",
            "vendor" : "FAKE"
        },
        walkerData : {
            resolution : WALKER_RESOLUTION,
            initPosVel : {
                initPosX : -4.443970,
                initPosY : 36.689100,
                initVelX : 0,
                initVelY : 0
            },
            accRandomGenerator : accGeneratorIotBoard
        }
    },

    // MOBILE USERS
    {
        id : "skill-user-00001",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-user-00001",
            "user" : {
                "name" : "skill-user-00001",
                "typeOfParticipant" : "organizer",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "gender" : "javascript"                               
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00002",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00002",
            "user" : {
                "name" : "skill-mobile-user-00002",
                "typeOfParticipant" : "speaker",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "gender" : "java"

            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00003",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00003",
            "user" : {
                "name" : "skill-mobile-user-00003",
                "typeOfParticipant" : "attendee",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "gender" : "python"                                         
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00004",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00004",
            "user" : {
                "name" : "skill-mobile-user-00004",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "gender" : "php"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00005",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00005",
            "user" : {
                "name" : "skill-mobile-user-00005",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "java"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00006",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00006",
            "user" : {
                "name" : "skill-mobile-user-00006",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "javascript"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00007",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00007",
            "user" : {
                "name" : "skill-mobile-user-00007",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "python"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00008",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00008",
            "user" : {
                "name" : "skill-mobile-user-00008",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "php"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },            
    {
        id : "skill-mobile-user-00009",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00009",
            "user" : {
                "name" : "skill-mobile-user-00009",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "java"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },            
    {
        id : "skill-mobile-user-00010",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00010",
            "user" : {
                "name" : "skill-mobile-user-00010",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "javascript"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },            
    {
        id : "skill-mobile-user-00011",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00011",
            "user" : {
                "name" : "skill-mobile-user-00011",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "python"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },            
    {
        id : "skill-mobile-user-00012",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00012",
            "user" : {
                "name" : "skill-mobile-user-00012",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "php"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },                        
    {
        id : "skill-mobile-user-00013",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00013",
            "user" : {
                "name" : "skill-mobile-user-00013",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "javascript"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00014",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00014",
            "user" : {
                "name" : "skill-mobile-user-00014",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "javascript"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00015",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00015",
            "user" : {
                "name" : "skill-mobile-user-00015",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "python"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    },
    {
        id : "skill-mobile-user-00016",
        contributorType: "mobile_user",
        valoData: {
            "id" : "skill-mobile-user-00016",
            "user" : {
                "name" : "skill-mobile-user-00016",
                "typeOfParticipant" : "gatecrasher",
                "company" : "VALO.io",
                "country" : "Spain",
                "role" : "Developer",
                "skill" : "Data Science" ,
                "gender" : "python"                                        
            }
        },
        walkerData : walkerDataConfigs.walkerMobileDefault
    }            




];


///////////////////////////////////////////////////////////////////////////////
// VALO STREAMS
// (We write the schemas as in JSON for convenience
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
// Export config object
///////////////////////////////////////////////////////////////////////////////
const config = {
    contributorTypes,
    contributors,
    valoClient,
    LA_TERMICA_BORDERS
};
export default config;

///////////////////////////////////////////////////////////////////////////////
// Contributor custom functions (onTick functions)
// Indexed by contributorType
///////////////////////////////////////////////////////////////////////////////
//
// Mobile users - Custom contributor's onTick() function
//
async function onTickMobile (
    contributorType, contributorId,
    valoHost, valoPort, valoTenant,
    position, state
) {
    const STREAM_COLLECTION = "mobile";
    const STREAM_NAME_LOCATION = "location";
    const STREAM_NAME_HAPPINESS = "happiness";
    const DEBOUNCE_TIME_LOCATION = 100000; //1000
    const DEBOUNCE_TIME_HAPPINESS = 500; //5000
    const LIKELIHOOD_PUBLISHING_HAPPINESS = 0.5

    // Intervals in milliseconds
    const elapsedIntervalLocationUpdate = state.timestampLastLocationUpdate ?
        Date.now() - state.timestampLastLocationUpdate: null;
    const elapsedIntervalHappinessUpdate = state.timestampLastHappinessUpdate ?
        Date.now() - state.timestampLastHappinessUpdate: null;

    //
    // Update Location in Valo if enough time has passed
    //
    if (
        elapsedIntervalLocationUpdate === null
        || elapsedIntervalLocationUpdate > DEBOUNCE_TIME_LOCATION
    ) {
       // Build location event
       const locationEvt = {
           "contributor" : contributorId,
           "timestamp" : new Date(),
           "position" : {
               "longitude" : position.x,
               "latitude" : position.y
           }
       };

       // Publish event(s) into Valo
       console.log(locationEvt);
       await publishEventToStream(
           { valoHost, valoPort },
           [valoTenant, STREAM_COLLECTION , STREAM_NAME_LOCATION],
           locationEvt
       );
       state.timestampLastLocationUpdate = Date.now();
    }

    //
    // Update Happiness in Valo if enough time has passed
    //
    if (
        elapsedIntervalHappinessUpdate === null
        || elapsedIntervalHappinessUpdate > DEBOUNCE_TIME_HAPPINESS
        && Math.random() < LIKELIHOOD_PUBLISHING_HAPPINESS
    ) {
       // Build location event
       const happinessEvt = {
           "contributor" : contributorId,
           "timestamp" : new Date(),
           "position" : {
               "longitude" : position.x,
               "latitude" : position.y
           },
           "happiness" :  Math.floor( 3 * Math.random() - 1 ) // Happiness interval is in [-1,0, +1]
       };

       // Publish event(s) into Valo
       console.log(happinessEvt);
       await publishEventToStream(
           { valoHost, valoPort },
           [valoTenant, STREAM_COLLECTION , STREAM_NAME_HAPPINESS],
           happinessEvt
       );
       state.timestampLastHappinessUpdate = Date.now();
    }
}
//
// Iot Boards - Custom contributor's onTick() function
//
async function onTickIotBoard(
    contributorType, contributorId,
    valoHost, valoPort, valoTenant,
    position, state
) {
    const STREAM_COLLECTION = "iot_board";
    const STREAM_NAME_LUMINANCE = "luminance";
    const STREAM_NAME_TEMPERATURE = "temperature";
    const STREAM_NAME_HUMIDITY = "humidity";
    const STREAM_NAME_ALCOHOL = "alcohol";
    const STREAM_NAME_DISTANCE = "distance";

    const DEBOUNCE_TIME = 1000 * 10;

    // Intervals in milliseconds
    const elapsedInterval = state.timestampLast ?
        Date.now() - state.timestampLast : null;

    //
    // Update in Valo only if enough time has passed
    //
    if (
        elapsedInterval === null
        || elapsedInterval > DEBOUNCE_TIME
    ) {
        //
        // Build events
        //
        const luminanceEvt = {
            "contributor" : contributorId,
            "timestamp" : new Date(),
            "position" : {
                "longitude" : position.x,
                "latitude" : position.y
            },
            "luminance" :  Math.random(), //TODO - Fix range
            "units" : "nit"
        };
        //console.log(luminanceEvt);
        const temperatureEvt = {
            "contributor" : contributorId,
            "timestamp" : new Date(),
            "position" : {
                "longitude" : position.x,
                "latitude" : position.y
            },
            "temperature" :  ~~(Math.random()*40), //TODO - Fix range
            "units" : "celsius"
        };
        console.log(temperatureEvt);
        const humidityEvt = {
            "contributor" : contributorId,
            "timestamp" : new Date(),
            "position" : {
                "longitude" : position.x,
                "latitude" : position.y
            },
            "humidity" :  Math.random(), //TODO - Fix range
            "units" : "%"
        };
        //console.log(humidityEvt);
        const alcoholEvt = {
            "contributor" : contributorId,
            "timestamp" : new Date(),
            "position" : {
                "longitude" : position.x,
                "latitude" : position.y
            },
            "alcohol" :  Math.random(), //TODO - Fix range
            "units" : "%"
        };
        //console.log(alcoholEvt);
        const distanceEvt = {
            "contributor" : contributorId,
            "timestamp" : new Date(),
            "position" : {
                "longitude" : position.x,
                "latitude" : position.y
            },
            "distance" :  Math.random(), //TODO - Fix range
            "units" : "cm"
        };
        //console.log(distanceEvt);

        // Publish event(s) into Valo
        await publishEventToStream(
            { valoHost, valoPort },
            [valoTenant, STREAM_COLLECTION , STREAM_NAME_TEMPERATURE],
            temperatureEvt
        );

        // Update timestampLast
        state.timestampLast = Date.now();
    }
}
