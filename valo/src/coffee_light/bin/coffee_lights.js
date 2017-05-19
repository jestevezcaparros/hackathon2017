"use strict";
/**
 * Hackathon @ J On the Beach 2017
 * Example about how to use Philips Hue with Valo
 * Philips Hue API docs: https://www.developers.meethue.com/
 * With Philips Hue we can visualize Valo queries,
 *   by modulating intensity, hue, saturation of the bulbs. 
 *
 * @license MIT
 * @author Álvaro Santamaría Herrero <asantamaria@itrsgroup.com>
 * @author (Each contributor append a line here)
 */

// HTTP library for communicating with the Philips Hue REST API
import http from 'axios'; // 
// Our Valo mini-sdk for querying a Valo instance 
import {
    runSingleQuery
} from '../../lib_js/valo_sdk_js/index'; 

///////////////////////////////////////////////////////////////////////////////
// DEFINITIONS
///////////////////////////////////////////////////////////////////////////////
// 
// Philips Hue
//
const HUE_HOST = "192.168.0.133";
const HUE_USER = "Odw-QQ0AxXDObwFjoX5KpeocXORnk6jjNieUirFq";
const HUE_URI_PREFIX = `http://${HUE_HOST}`;
const BULB1 = '1';
const BULB2 = '2';
const BULB3 = '3';
//
// VALO
//
const LOCAL_VALO = {valoHost: "localhost", valoPort: 8888};
const TENANT = "demo";
const COLLECTION = "twitter";
const STREAM_NAME = "tweets";

const QUERIES = {
	MORE_COFFEE: 'from /streams/demo/twitter/tweets select tweet.text where contains( text, "#morecoffee" )',
	BRINGING_COFFEE: 'from /streams/demo/twitter/tweets select tweet.text where contains( text, "#bringingcoffee" )',
	COFFEE_REFILLED: 'from /streams/demo/twitter/tweets select tweet.text where contains( text, "#coffeerefilled" )'
}

///////////////////////////////////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////////////////////////////////
//
// Philips Hue
//
const HUE_MIN = 0;
const HUE_MAX = 65280;
const SAT_MIN = 0;
const SAT_MAX = 255;
const BRI_MIN = 0;
const BRI_MAX = 255;

const HUE_RED = 0;
const HUE_YELLOW = 12750;
const HUE_GREEN = 25500;
const HUE_BLUE = 46920;
const HUE_MAGENTA = 56100;

///////////////////////////////////////////////////////////////////////////////
// Main
///////////////////////////////////////////////////////////////////////////////
async function main() {

    try {

        // Build the bulbs's URIs
        const uriBulb1 =  `${HUE_URI_PREFIX}/api/${HUE_USER}/lights/${BULB1}/state`;
        const uriBulb2 =  `${HUE_URI_PREFIX}/api/${HUE_USER}/lights/${BULB2}/state`;
        const uriBulb3 =  `${HUE_URI_PREFIX}/api/${HUE_USER}/lights/${BULB3}/state`;

        // Procedures with bulbs
        async function bulbsOn() {
            // Make sure the bulbs are on and white
            console.log("> Switcing bulbs on ...!");
            await http.put(uriBulb1, {"on" : true, "sat" : SAT_MIN });
            await http.put(uriBulb2, {"on" : true, "sat" : SAT_MIN });
            await http.put(uriBulb3, {"on" : true, "sat" : SAT_MIN });
        }
        async function bulbsAlert() {
            // Check bulbs by sending an alert to each one
            await http.put(uriBulb1, {"alert" : "select" });
            await http.put(uriBulb2, {"alert" : "select" });
            await http.put(uriBulb3, {"alert" : "select" });
        }

        // Reset BULBS upon start
        await bulbsOn();
        await bulbsAlert()

        // Put lights to white when the process is interrupted
        // TODO: this might not work on Windows
        process.on('SIGINT', async () => {
            await bulbsOn();
            await bulbsAlert();
            // Exit!
            process.exit(1);
        });

	// COFFEE ran out -> turn bulbs magenta
        const {
            observable : morecoffee_observable,
            isHistorical : morecoffee_isHistorical,
            outputType : morecoffee_outputType,
        } = await runSingleQuery(LOCAL_VALO, TENANT, QUERIES['MORE_COFFEE']);

        morecoffee_observable.subscribe(
            async evt => {
                try {
                    console.log("MoreCoffee Event - Valo event: ", JSON.stringify(evt, null, 4));
            
                    const body1 = { "hue" : HUE_RED, "bri" : BRI_MAX, "sat" : SAT_MAX }; 
                    const body2 = {"alert": "select"};
    
                    console.log("> Command to Hue: ", uriBulb1, body1);
                    await http.put(uriBulb1, body1);
                    //console.log("> Command to Hue: ", uriBulb2, body2);
                    await http.put(uriBulb2, body2);
                } catch(e) {
                    console.error("Error in morecoffee observable subsription", e);
                }
            },
            err => {
                console.error("ERROR in ouput channel's SSE stream (query 1)", err);
            },
            () => {
                console.log("Valo output channel closed");
            }
        );


	// COFFEE is on the way! -> turn the bulbs yellow
        const {
            observable : bringingcoffee_observable,
            isHistorical : bringingcoffee_isHistorical,
            outputType : bringingcoffee_outputType,
        } = await runSingleQuery(LOCAL_VALO, TENANT, QUERIES['BRINGING_COFFEE']);

        bringingcoffee_observable.subscribe(
            async evt => {
                try {
                    console.log("BringingCoffee Event - Valo event: ", JSON.stringify(evt, null, 4));
            
                    const body1 = { "hue" : HUE_YELLOW, "bri" : BRI_MAX, "sat" : SAT_MAX }; 
                    const body2 = {"alert": "select"};
    
                    console.log("> Command to Hue: ", uriBulb1, body1);
                    await http.put(uriBulb1, body1);
                    //console.log("> Command to Hue: ", uriBulb2, body2);
                    await http.put(uriBulb2, body2);
                } catch(e) {
                    console.error("Error in bringingcoffee observable subsription", e);
                }
            },
            err => {
                console.error("ERROR in ouput channel's SSE stream (query 1)", err);
            },
            () => {
                console.log("Valo output channel closed");
            }
        );

	// COFFEE is refilled! -> turn the bulbs white
        const {
            observable : coffeerefilled_observable,
            isHistorical : coffeerefilled_isHistorical,
            outputType : coffeerefilled_outputType,
        } = await runSingleQuery(LOCAL_VALO, TENANT, QUERIES['COFFEE_REFILLED']);

        coffeerefilled_observable.subscribe(
            async evt => {
                try {
                    console.log("CoffeeRefilled Event - Valo event: ", JSON.stringify(evt, null, 4));
                    await bulbsOn();
                    await bulbsAlert();
                } catch(e) {
                    console.error("Error in bringingcoffee observable subsription", e);
                }
            },
            err => {
                console.error("ERROR in ouput channel's SSE stream (query 1)", err);
            },
            () => {
                console.log("Valo output channel closed");
            }
        );


    } catch(e) {
        console.error(e);
        console.error("There be errors!");
        throw e;
    }
}

///////////////////////////////////////////////////////////////////////////////
// RUN
///////////////////////////////////////////////////////////////////////////////
main();
