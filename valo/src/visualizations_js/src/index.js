"use strict";
/**
 * Hackathon @ J On The Beach 2017
 * Application entry point file
 * Path: valo/src/visualizations_js/src/index.js
 * @license MIT
 * @author Andres Ramirez <aramirez@itrsgroup.com>
 * @author Zuri Pabón <zpabon@itrsgroup.com>
 * @author Danilo Rossi <drossi@itrsgroup.com>
 */

import JotbMap from './components/map/';

import {
  MAP_CONTAINER_CSS_SELECTOR,
  MAP_OPTIONS
} from './settings'

// import DAOs
import * as MobileDAO from './dao/mobile';

// import VOs
import * as AttenderVO from './vo/attender_map_point';

import {
  printError,
  printLog
} from './utils';

(function init(){

  try {

    // track the average happiness bar charts
    let averageBars = new Map();

    // reference to the tweet visualization
    let tweetBoxComponent = null;

    // This creates a google Maps Api v3 instance rendering the map
    const map = JotbMap({
      domElement: document.querySelector(MAP_CONTAINER_CSS_SELECTOR),
      options: MAP_OPTIONS,
      points: {}
    });


    
    // utility function
    const getNextBarChartContainer = function() {
      var chartContainer = document.createElement('div');
      chartContainer.classList.add('avg-chart-container');
      document.querySelector('.avg-container').appendChild(chartContainer);
      return chartContainer;
    }

    document.querySelector('#top-menu-about').addEventListener('click', function(event) {
      $('.ui.basic.modal.about').modal('show');
    });


    // read events from Valo mob_happiness stream
    MobileDAO.readHappinesEvents((error, valoPayload) => {
      // Manage your error
      if(error) return printError(error);

      // convert Valo event to MapPoint, add it to the map
      console.log("ANTES DEL ADD")
      map.attenders.add(AttenderVO.createHappinessAttenderPoint(valoPayload));

      
    });


  }
  catch(e){
    printError(e);
  }

})();
