"use strict";
/**
 * Hackathon @ J On the Beach 2017
 * Valo JS sdk main index
 *
 * @license MIT
 * @author Álvaro Santamaría Herrero <asantamaria@itrsgroup.com>
 * @author (Each contributor append a line here)
 */
export {
    getStream,
    createStream,
    setStreamRepository,
    publishEventToStream
} from './api/streams';
export {
    getContributorType,
    createContributorType,
    getContributorInstance,
    registerContributorInstance
} from './api/contributors';
export {
    runSingleQuery
} from './api/queries';

export {
    retryOnConflict
} from './util';
