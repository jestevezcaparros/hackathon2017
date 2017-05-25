"use strict";
/**
 * Hackathon @ J On the Beach 2017
 * Async utilities
 *
 * @license MIT
 * @author Álvaro Santamaría Herrero <asantamaria@itrsgroup.com>
 * @author (Each contributor appends a line here)
 */

/**
 * Generates uniform random distribution between min and max
 *
 * @returns {Promise}
 * @param Number - Delay in milliseconds
 */
export function sleep(millisecs) {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, millisecs);
    });
}
