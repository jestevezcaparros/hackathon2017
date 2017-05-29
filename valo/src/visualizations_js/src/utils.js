"use strict";
/**
 * Hackathon @ J On The Beach 2017
 * Utils module
 * @license MIT
 * @author Andres Ramirez <aramirez@itrsgroup.com>
 * @author Zuri Pabón <zpabon@itrsgroup.com>
 * @author José Ángel Morell <ja2m_@hotmail.comy>
 * @author (Each contributor append a line here)
 */

import {
  POLYGON_1,
  POLYGON_2,
  POLYGON_3,
  POLYGON_4,
  POLYGON_5,
  POLYGON_6,    
  AUDITORIO_POLYGON,
  POLYGON_ROOM_STYLE,
  MOLLETE_POLYGON,
  PITUFO_POLYGON,
  ENTRANCE_POLYGON,
  POLYGON_BATHROOM_STYLE,
  BATHROOM_POLYGON,
  ITRS_COORDINATES,
  ICON_URL
} from './settings'

let iconStore = new Map();
export let polygonStore = new Array();
let markerStore = new Array();



export function getIcon(src){
  if(iconStore.has(src)) return iconStore.get(src);
  const iconImg = new Image();
  iconImg.src = src;
  iconStore.set(src, iconImg);
  return iconImg;
}

export function printError(...args){
  console.error(...args);
}

export function printLog(...args){
  console.log(...args);
}

function iconSizeFromZoomLevel(zoomLevel){
  switch(zoomLevel){
    case 18: return 14;
    case 19: return 17;
    case 20: return 20;
    default: return 30;
  }
}

var infowindows={}
export function plotPoint(context, point, projection, zoomLevel=20,id) {

     if (infowindows[id]!=null)infowindows[id].setPosition(point.geo);
    context.drawImage(
      getIcon(point.icon),
      projection.fromLatLngToDivPixel(point.geo).x-iconSizeFromZoomLevel(zoomLevel)/2,
      projection.fromLatLngToDivPixel(point.geo).y-iconSizeFromZoomLevel(zoomLevel)/2,
      iconSizeFromZoomLevel(zoomLevel),
      iconSizeFromZoomLevel(zoomLevel));
}


       function convertPoint(latLng,map) { 
                  var 
          topRight=map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast()); 
                  var 
          bottomLeft=map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest()); 
                  var scale=Math.pow(2,map.getZoom()); 
                  var worldPoint=map.getProjection().fromLatLngToPoint(latLng); 
                  return new google.maps.Point((worldPoint.x- 
          bottomLeft.x)*scale,(worldPoint.y-topRight.y)*scale); 
       } 

 /**
 *
 * @param {*} google
 * @param {*} container
 * @param {*} coordinates
 */
export function createMap({domElement, options}) {
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(options.center.bounds.sw.lat, options.center.bounds.sw.lon),
      new window.google.maps.LatLng(options.center.bounds.ne.lat, options.center.bounds.ne.lon));
    options.center = new window.google.maps.LatLng(options.center.lat, options.center.lon);
    const map = new window.google.maps.Map(domElement, options);
    window.google.maps.event.addListener(map, "dragend", () => updateMap(map));
    window.google.maps.event.addListener(map, "zoom_changed", () => updateMap(map));
    window.google.maps.event.addListener(map, "resize", () => updateMap(map));
    window.google.maps.event.addListener(map, "bounds_changed", () => updateMap(map));
    window.google.maps.event.addListener(map, "tilesloaded", () => updateMap(map));
    window.google.maps.event.addListener(map, "projection_changed", () => updateMap(map));
    window.addEventListener('resize', ()=> map.fitBounds(bounds));
    drawRooms(map);
    map.fitBounds(bounds)


    
    map.points={};
    google.maps.event.addListener(map, 'click', function(evt) {
        let eventPoint=  convertPoint(evt.latLng,map);
        console.log("evt = "+JSON.stringify(evt))
        for(var p in map.points) {
         let attenderPoint=convertPoint(map.points[p].geo,map);
		     let width=iconSizeFromZoomLevel(map.getZoom());
         let height=iconSizeFromZoomLevel(map.getZoom());         
         if (eventPoint.x>=(attenderPoint.x-width/2) && ((attenderPoint.x-width/2)+width) &&
            eventPoint.y>=(attenderPoint.y-width/2) && eventPoint.y<((attenderPoint.y-height/2)+height)
         ){
            if (infowindows[p]==null){
              let infowindow = new google.maps.InfoWindow({
                content: "<p>"+p+"</p>"+
                         "<p>"+map.points[p].skill+"</p>"+
                         "<p>"+map.points[p].country+"</p>", 
                position: evt.latLng
              });
              infowindows[p]=infowindow;
            }
             infowindows[p].open(map);
             return;
         }       
        }        
    });
    return map;
}

function updateMap(map) {
  const zoom = map.getZoom();
  resetPolygons();
  resetMarkers();
  drawRooms(map);
  if(zoom == 20) {
    drawMarkers(map);
  }
  map.setCenter(map.getCenter());
};

function drawRooms(map){
  // CREATE LA TERMICA ROOMS POLYGON
  addPolygon(map, POLYGON_1, POLYGON_ROOM_STYLE,"POLYGON_1");  
  addPolygon(map, POLYGON_2, POLYGON_ROOM_STYLE,"POLYGON_2");  
  addPolygon(map, POLYGON_3, POLYGON_ROOM_STYLE,"POLYGON_3");   
  addPolygon(map, POLYGON_4, POLYGON_ROOM_STYLE,"POLYGON_4");   
  addPolygon(map, POLYGON_5, POLYGON_ROOM_STYLE,"POLYGON_5");        
  addPolygon(map, POLYGON_6, POLYGON_ROOM_STYLE,"POLYGON_6");    
  //addPolygon(map, AUDITORIO_POLYGON, POLYGON_ROOM_STYLE);
  //addPolygon(map, MOLLETE_POLYGON, POLYGON_ROOM_STYLE);
  //addPolygon(map, PITUFO_POLYGON, POLYGON_ROOM_STYLE);
  //addPolygon(map, ENTRANCE_POLYGON, POLYGON_ROOM_STYLE);
 // addPolygon(map, BATHROOM_POLYGON, POLYGON_BATHROOM_STYLE);
}

function drawMarkers(map){
  // // Add Icons
  // addMarker(map,
  //     `${ICON_URL}campero.svg`, {
  //     latitude: 36.689040,
  //     longitude: -4.444238
  // });
  // addMarker(map,
  //     `${ICON_URL}pitufo.svg`, {
  //     latitude: 36.688839,
  //     longitude: -4.445384
  // });
  // addMarker(map,
  //     `${ICON_URL}mollete.svg`, {
  //     latitude: 36.689175,
  //     longitude: -4.445105
  // });
}

function resetPolygons(){
  polygonStore.forEach(polygon => polygon.setMap(null));
  polygonStore = [];
  return true;
}

function resetMarkers(){
  markerStore.forEach(marker => marker.setMap(null));
  markerStore = [];
  return true;
}

function addPolygon(map, coords, options = {},id) {
    const opt = Object.assign(options, {path: coords, clickable: false});
    const polygon = new google.maps.Polygon(opt);
    polygon.setMap(map);
    polygon.id=id;
    polygonStore.push(polygon);
}

function addMarker(map, icon, position) {
    const LatLng = new google.maps.LatLng(
        position.latitude,
        position.longitude
    );
    const marker = new google.maps.Marker({
        position: LatLng,
        icon: icon,
        map: map
    });
    markerStore.push(marker);
}
