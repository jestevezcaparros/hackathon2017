"use strict";
/**
 * Hackathon @ J On The Beach 2017
 * VOS (Value ObjectS) file
 * Path: valo/src/visualizations_js/src/vo/map_point.js
 * @license MIT
 * @author Danilo Rossi <drossi@itrsgroup.com>
 * @author Andres Ramirez <aramirez@itrsgroup.com>
 * @author Zuri Pabón <zpabon@itrsgroup.com>
 */

import MapPoint from './map_point';

 // icons base folder
 import {
   ICON_URL
 } from '../settings'

 /**
  * Represents an attender point for google maps
  */
 class AttenderPoint extends MapPoint {
   constructor(id,latitude, longitude, icon) {
     super(latitude, longitude);
     this.id=id;
     this.icon = `${ICON_URL}${icon}.svg`;
     this.skill=icon;
   }  
 }


var attenders={};

 /**
  * Create a valid MapPoint given an event from Valo mobile happiness stream
  * @method createHappinessMapPoint
  * @param  {Object}                valoPayload   A mob_happiness Valo stream event
  * @return {AttenderPoint}                            A valid AttenderPoint
  */
 export function createHappinessAttenderPoint(valoPayload){
   let id = valoPayload.contributor;
   if (attenders[id]==null){
      attenders[id]=new AttenderPoint(
        valoPayload.id,
        valoPayload.position.latitude,
        valoPayload.position.longitude,
        valoPayload.happiness
      );
      attenders[id].country=valoPayload.country;
      attenders[id].typeOfParticipant=valoPayload.typeOfParticipant;
   //   return attenders[id];
  }else {
    attenders[id].latitude=valoPayload.position.latitude;
    attenders[id].longitude=valoPayload.position.longitude;    
   //   return attenders[id];
  }

  //  console.log("VAMOS A DEVOLVER "+JSON.stringify(attenders))
   return attenders;
 }
