"use strict";
/**
* Hackathon @ J On The Beach 2017
* Map module
* @license MIT
* @author Andres Ramirez <aramirez@itrsgroup.com>
* @author Zuri Pabón <zpabon@itrsgroup.com>
* @author (Each contributor append a line here)
*/

import {getIcon, plotPoint,polygonStore} from '../../../utils';




const OverlayView = window.google.maps.OverlayView;

export default class AttendersOverlayView extends OverlayView {

    /**
    * AttendersOverlayView constructor function
    * Adds the overlay view to the map
    *
    * @param {Map} map A google.maps.Map instance
    * @return AttendersOverlayView instance
    */
    constructor(map){
      super();
      this.points = [];
      this.map = map;



      this.mapsize = document.body.getBoundingClientRect();
      this.setMap(map);
    }

    /**
    * AttendersOverlayView constructor function
    * Adds the overlay view to the map
    *
    * @param {string} type The HTMLElement tag to add to the overlay
    * @param {string} id The HTMLElement id
    * @return AttendersOverlayView instance
    */
    createOverlayElement(type, id){
      if(!id || this[id]) throw Error(`${id} element already exists`);
      this[id] = document.createElement(type);
      this[id].id = id;
      this[id].className = "overlay";
      this[id].height = this.mapsize.height;
      this[id].width = this.mapsize.width;
      this.getPanes().overlayLayer.appendChild(this[id]);
      return this;
    }

    /**
    * Called once the overlay is added to the map
    * It is used to add the required DOM elements to the map
    * @return AttendersOverlayView instance
    */
    onAdd() {

      this.createOverlayElement('canvas', 'main');      
      this.createOverlayElement('canvas', 'opacity');
      this.mainContext = this.main.getContext("2d");
      this.opacityContext = this.opacity.getContext('2d');
      return this;
    }

    /**
    * Called every time a draw is required
    * @return AttendersOverlayView instance
    */
    draw(points) {
      //console.log("DRAW POINTS")
        if(!this.mainContext || !this.opacityContext) return this;
        const projection = this.getProjection();
        this.mainContext.save();
        this.mainContext.clearRect(0, 0, this.mapsize.width, this.mapsize.height);
        this.mainContext.globalAlpha = 0.8;
        // this.mainContext.drawImage(this.opacity, 0, 0);
        this.mainContext.globalAlpha = 1;
        // this.mainContext.fillStyle = 'blue';
        //console.log("this.points = "+JSON.stringify(this.points))

        for (var i=0;i<polygonStore.length;i++){
          polygonStore[i].java=0;
          polygonStore[i].javascript=0;
          polygonStore[i].python=0;
          polygonStore[i].php=0;                                      
          for(var p in points) {
            if (google.maps.geometry.poly.containsLocation(points[p].geo, polygonStore[i])){
                if (points[p].skill==="java"){
                  polygonStore[i].java++;
                  console.log(polygonStore[i].java)
                }else if (points[p].skill==="javascript"){
                  polygonStore[i].javascript++;
                  console.log(polygonStore[i].javascript)
                }else if (points[p].skill==="python"){
                  polygonStore[i].python++;
                  console.log(polygonStore[i].python)
                }else if (points[p].skill==="php"){
                  polygonStore[i].php++;
                  console.log(polygonStore[i].php)
                }
            }                               
          }
          let java=polygonStore[i].java;
          let js=polygonStore[i].javascript;
          let python=polygonStore[i].python;
          let php=polygonStore[i].php;
          let total=java+js+python+php;
          if (java>js && java>python && java>php){
            polygonStore[i].setOptions({strokeWeight: 2.0, fillColor: '#FFC400', fillOpacity: java/total});
          }else if (js>java && js>python && js>php){
            polygonStore[i].setOptions({strokeWeight: 2.0, fillColor: '#DEFF00', fillOpacity: js/total});
          }else if (python>java && python>js && python>php){
            polygonStore[i].setOptions({strokeWeight: 2.0, fillColor: '#FF00FF', fillOpacity: python/total});
          }else if (php>java && php>js && php>python){
            polygonStore[i].setOptions({strokeWeight: 2.0, fillColor: '#0033FF', fillOpacity: php/total});
          }else {
            polygonStore[i].setOptions({strokeWeight: 2.0, fillColor: '#FFFFFF', fillOpacity: 1});            
          }

        }        


        for(var p in points) {
          console.log(JSON.stringify(points[p]))
          plotPoint(this.mainContext, points[p], projection, this.map.getZoom(),p)
        }


       // this.points.forEach(point => plotPoint(this.mainContext, point, projection, this.map.getZoom()))
        this.mainContext.restore();
        this.opacityContext.clearRect(0, 0, this.mapsize.width, this.mapsize.height);
        this.opacityContext.drawImage(this.main, 0, 0);
        return this;
    }


    /**
    * This adds new points to the overlay.
    * @param {AttenderPoint} || {Array<AttenderPoint>} points a list AttenderPoint
    * @return AttendersOverlayView instance
    */
    add(points) {
      // console.log("VAMOS A AÑADIR PUNTOS "+JSON.stringify(points))
      //   this.points = (Array.isArray(points) ? points : [points])
      //     .map(d => ({
      //       geo: new window.google.maps.LatLng(d.latitude, d.longitude),
      //       icon:d.icon
      //     }));

        this.map.points=points;
        for(var p in points) {
          points[p].geo=new window.google.maps.LatLng(points[p].latitude,points[p].longitude)
        }
        this.draw(points);
    }
}
