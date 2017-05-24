"use strict";
/**
 * Hackathon @ J On The Beach 2017
 * Settings module
 * @license MIT
 * @author Andres Ramirez <aramirez@itrsgroup.com>
 * @author Zuri Pabón <zpabon@itrsgroup.com>
 * @author Danilo Rossi <drossi@itrsgroup.com>
 * @author José Ángel Morell <ja2m_@hotmail.com>
 * @author (Each contributor append a line here)
 */
export const DEBUG = false;
export const HOST = {valoHost: "localhost", valoPort: 8888};
export const ICON_URL = 'http://localhost:8080/icons/'
export const TENANT = 'demo';
// VALO QUERIES
// export const QUERY_MOB_HAPPINESS = `
//   from /streams/demo/mobile/happiness
//   select timestamp, contributor.user.typeOfParticipant as typeOfParticipant, position, happiness
// `;

export const QUERY_MOB_HAPPINESS = `
  from /streams/demo/mobile/happiness
  select contributor, timestamp, contributor.user.typeOfParticipant as typeOfParticipant, position, contributor.user.gender as happiness, contributor.user.country as country
`;

export const HISTORICAL_QUERY_MOB_HAPPINESS = `
  from historical /streams/demo/mobile/happiness
  select timestamp, contributor.user.typeOfParticipant as typeOfParticipant, position, happiness
  order by timestamp
  take 10000
`;
export const QUERY_MOB_LOCATION = `
  from /streams/demo/mobile/location
  select timestamp, contributor.user.typeOfParticipant as typeOfParticipant, position
`;
export const HISTORICAL_QUERY_MOB_LOCATION = `
  from historical /streams/demo/mobile/location
  select timestamp, contributor.user.typeOfParticipant as typeOfParticipant, position
  order by timestamp
  take 10000
`;
export const QUERY_TEMP = `
  from /streams/demo/iot_board/temperature
  select timestamp, contributor, temperature, position
`;
export const HISTORICAL_QUERY_TEMP = `
  from historical /streams/demo/iot_board/temperature
  select timestamp, temperature, position
  take 10000
`;
export const QUERY_MOB_HAPPINESS_AVG = `
  from /streams/demo/mobile/happiness
  group by contributor.user.typeOfParticipant, timestamp window of 1 minute every 1 second
  select typeOfParticipant as TypeOfParticipant, 100 * avg( (happiness+1.0) / 2.0) as AverageHappiness
`;
export const HISTORICAL_QUERY_MOB_HAPPINESS_AVG = QUERY_MOB_HAPPINESS_AVG.replace('from ', 'from historical ');
export const QUERY_TWEETS = `
  from /streams/demo/twitter/tweets
  select tweet.text, tweet.user.name, tweet.user.screen_name, tweet.user.location, tweet.user.followers_count, tweet.user.profile_image_url_https, tweet.created_at
`;
export const HISTORICAL_QUERY_TWEETS = QUERY_TWEETS.replace('from ', 'from historical ');

// Emulates how many people is publishing data to Valo
export const MAP_CONTAINER_CSS_SELECTOR = '.map-container';
export const PEOPLE = 3;
// Use Record and Replay Version
// (to enable it, append the query search ?replay to the server url)
export const REPLAY = window.location.search.includes('replay');
export const REPLAY_INTERVAL = 50;
export const LA_TERMICA_COORDINATES = {
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
// export const ITRS_COORDINATES = {
//   lat: 36.734948
//   lon: -4.557490
//   radius: 80,
//   bounds:{
//     sw:{
//       lat: 36.734823
//       lon: -4.558412
//     },
//     ne: {
//       lat: 36.734634,
//       lon: -4.557071
//     }
//   }
// }
export const MAP_OPTIONS = {
    zoom: 20,
    disableDefaultUI: true,
    //backgroundColor: "#bbb",
    // backgroundColor: "#ffffff",    
    //draggable: false,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    minZoom: 18,
    maxZoom: 20,
    center: LA_TERMICA_COORDINATES,
    styles: 
    [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }]
};




export const POLYGON_1 = [
    {lat: 36.689026, lng: -4.444346},
    {lat: 36.688893, lng: -4.443849},
    {lat: 36.689431, lng: -4.443629},
    {lat: 36.689561, lng: -4.444127},
    {lat:36.68868686306769,lng:-4.444475322961807},
    {lat:36.68865460036606,lng:-4.44435328245163},
    {lat:36.688987980963645,lng:-4.4442205131053925}
]


export const POLYGON_2 = [
    {lat:36.689211398926226,lng:-4.444547072052956},
    {lat:36.68919446112509,lng:-4.444485045969486},
    {lat:36.68907105703276,lng:-4.44453701376915},
    {lat:36.68903583709208,lng:-4.4444092735648155},
    {lat:36.688961095485155,lng:-4.444441124796867},
    {lat:36.68899685316947,lng:-4.444575235247612},
    {lat:36.688965397162335,lng:-4.4445886462926865},
    {lat:36.688929370608456,lng:-4.44445688277483},
    {lat:36.68886699623644,lng:-4.444482363760471},
    {lat:36.68890060312419,lng:-4.444607086479664},
    {lat:36.688865383105444,lng:-4.4446225091814995},
    {lat:36.688832045057595,lng:-4.444497115910053},
    {lat:36.68877343458353,lng:-4.444521591067314},
    {lat:36.68880811693366,lng:-4.444648660719395},
    {lat:36.688590881490526,lng:-4.444740861654282},
    {lat:36.68860755056856,lng:-4.444802217185497},
    {lat:36.688821559700834,lng:-4.444712363183498},
    {lat:36.68883150734701,lng:-4.444748237729073},
    {lat:36.688894688313006,lng:-4.444721080362797},
    {lat:36.688894688313006,lng:-4.44472074508667},//
    {lat:36.68888366525461,lng:-4.44468017667532},
    {lat:36.688925068929244,lng:-4.444662407040596},
    {lat:36.688984485851975,lng:-4.444880001246929},
    {lat:36.68902965343673,lng:-4.444855861365795},
    {lat:36.68897211853247,lng:-4.44464061409235},
    {lat:36.68900706964766,lng:-4.444625526666641},
    {lat:36.689023200926236,lng:-4.444684870541096},
    {lat:36.689094985074846,lng:-4.444655030965805},
    {lat:36.68908100464668,lng:-4.444602392613888}
]

export const POLYGON_3 = [
    {lat:36.68931221909392,lng:-4.444845132529736},
    {lat:36.68928614028987,lng:-4.444748908281326},
    {"lat":36.6889207672498,"lng":-4.44490984082222},
    {"lat":36.68894388877397,"lng":-4.44499634206295},
    {"lat":36.68899228263932,"lng":-4.444975890219212},
    {"lat":36.689000617135285,"lng":-4.445007406175137},
    {"lat":36.68874439818538,"lng":-4.445115365087986},
    {"lat":36.688771821450594,"lng":-4.4452159479260445},
    {"lat":36.689022125507776,"lng":-4.445111006498337},
    {"lat":36.6890301911459,"lng":-4.445142522454262},
    {"lat":36.6889831415782,"lng":-4.445163309574127},
    {"lat":36.689008951630335,"lng":-4.445259869098663},
    {"lat":36.68905600118224,"lng":-4.445241093635559},
    {"lat":36.68906433567128,"lng":-4.445271268486977},
    {"lat":36.68913020498843,"lng":-4.445250146090984},
    {"lat":36.68911971967234,"lng":-4.445209912955761},
    {"lat":36.68938454067945,"lng":-4.445098266005516},
    {"lat":36.6893608815809,"lng":-4.445012100040913},
    {"lat":36.68909364080302,"lng":-4.445124752819538},
    {"lat":36.689083155481946,"lng":-4.44508720189333},
    {"lat":36.68914015259471,"lng":-4.445062726736069},
    {"lat":36.689113267169404,"lng":-4.444961808621883},
    {"lat":36.689059765145124,"lng":-4.444984272122383},
    {"lat":36.689051699510095,"lng":-4.444955438375473}

]

export const POLYGON_4 = [
    {"lat":36.68956978041546,"lng":-4.445544853806496},
    {"lat":36.68946439008335,"lng":-4.445151574909687},
    {"lat":36.6893544290982,"lng":-4.445197843015194},
    {"lat":36.68938158329254,"lng":-4.445298425853252},
    {"lat":36.68917107082216,"lng":-4.445387609302998},
    {"lat":36.68916004780335,"lng":-4.4453467056155205},
    {"lat":36.68921812027486,"lng":-4.445321895182133},
    {"lat":36.68919177258489,"lng":-4.445225335657597},
    {"lat":36.6886933156064,"lng":-4.445428848266602},
    {"lat":36.68880946121048,"lng":-4.445855990052223},
    {"lat":36.68888742922594,"lng":-4.4458238035440445},//
    {"lat":36.688803008681525,"lng":-4.445470422506332},
    {"lat":36.68904255845605,"lng":-4.4453902915120125},
    {"lat":36.689059765145124,"lng":-4.445468746125698},
    {"lat":36.68882182855615,"lng":-4.445549547672272},
    {"lat":36.68884414354438,"lng":-4.445641413331032},
    {"lat":36.68907159474164,"lng":-4.445554241538048},
    {"lat":36.689092027676786,"lng":-4.445635043084621},
    {"lat":36.68886403882961,"lng":-4.445722550153732},
    {"lat":36.68888984892172,"lng":-4.445822797715664},//
    {"lat":36.689298507558874,"lng":-4.445660524070263},
    {"lat":36.6892718910427,"lng":-4.445563293993473},
    {"lat":36.68921301204995,"lng":-4.445588104426861},
    {"lat":36.68920387101509,"lng":-4.445553235709667},
    {"lat":36.68941384568916,"lng":-4.445463716983795},
    {"lat":36.68945040972233,"lng":-4.445596821606159}
]


export const POLYGON_5 = [
    {"lat":36.6895391312011,"lng":-4.445698410272598},
    {"lat":36.68951547215011,"lng":-4.445612579584122},
    {"lat":36.68925118930155,"lng":-4.445722550153732},
    {"lat":36.689241241709645,"lng":-4.445684663951397},
    {"lat":36.68917591019577,"lng":-4.445711486041546},
    {"lat":36.68918343810966,"lng":-4.445738643407822},
    {"lat":36.68914015259471,"lng":-4.445756748318672},
    {"lat":36.68916623144824,"lng":-4.445852302014828},
    {"lat":36.68920897924058,"lng":-4.445834532380104},
    {"lat":36.68921489402759,"lng":-4.445854313671589},
    {"lat":36.688964859452696,"lng":-4.445959590375423},
    {"lat":36.68899013180151,"lng":-4.446054808795452},
    {"lat":36.68924204827119,"lng":-4.445949196815491},
    {"lat":36.68925360898587,"lng":-4.445989429950714},
    {"lat":36.68920575299293,"lng":-4.446009211242199},
    {"lat":36.689230218700914,"lng":-4.446099400520325},
    {"lat":36.68928264519177,"lng":-4.446077942848206},
    {"lat":36.6892901730952,"lng":-4.446105770766735},
    {"lat":36.689604731259,"lng":-4.445969983935356},
    {"lat":36.68957972796484,"lng":-4.445878118276596},
    {"lat":36.68932109126235,"lng":-4.445987083017826},
    {"lat":36.68930630431439,"lng":-4.445934109389782},
    {"lat":36.689362763554904,"lng":-4.445909634232521},
    {"lat":36.68933023228329,"lng":-4.44578692317009}
]

export const POLYGON_6 = [
    {"lat":36.68962140011725,"lng":-4.446246586740017},
    {"lat":36.689605268964165,"lng":-4.446184895932674},
    {"lat":36.68949019997397,"lng":-4.446235857903957},
    {"lat":36.689476219617625,"lng":-4.446190260350704},
    {"lat":36.68942675064404,"lng":-4.446211718022823},
    {"lat":36.68943858018409,"lng":-4.446254633367062},
    {"lat":36.68939529481275,"lng":-4.446272403001785},
    {"lat":36.68934421266617,"lng":-4.446083642542362},
    {"lat":36.689290710802574,"lng":-4.446106776595116},
    {"lat":36.689341255277704,"lng":-4.446294866502285},
    {"lat":36.68930415348538,"lng":-4.446311295032501},
    {"lat":36.689286409143584,"lng":-4.446247927844524},
    {"lat":36.68918397581777,"lng":-4.446291513741016},
    {"lat":36.68912912957147,"lng":-4.446108788251877},
    {"lat":36.68904766669228,"lng":-4.4461460039019585},
    {"lat":36.68910116872498,"lng":-4.446323700249195},
    {"lat":36.68913208696811,"lng":-4.446439370512962},
    {"lat":36.68923828431721,"lng":-4.44639477878809},
    {"lat":36.68927484843387,"lng":-4.446529224514961},
    {"lat":36.689348245468445,"lng":-4.44649837911129},
    {"lat":36.68931329450833,"lng":-4.446367286145687},
    {"lat":36.68934743890802,"lng":-4.446352533996105},
    {"lat":36.68938400297274,"lng":-4.4464873149991035},
    {"lat":36.6894399244499,"lng":-4.446463845670223},
    {"lat":36.68940470467816,"lng":-4.446334093809128},
    {"lat":36.68944691463168,"lng":-4.44631565362215},
    {"lat":36.6894829409431,"lng":-4.4464460760355},
    {"lat":36.68954773449058,"lng":-4.446418918669224},
    {"lat":36.689514396738545,"lng":-4.446293525397778}

]


export const AUDITORIO_POLYGON = [
    {lat: 36.689026, lng: -4.444346},
    {lat: 36.688893, lng: -4.443849},
    {lat: 36.689431, lng: -4.443629},
    {lat: 36.689561, lng: -4.444127},
    {lat:36.68868686306769,lng:-4.444475322961807},
    {lat:36.68865460036606,lng:-4.44435328245163},
    {lat:36.688987980963645,lng:-4.4442205131053925}
]

export const MOLLETE_POLYGON = [
    {lat: 36.689386, lng: -4.445099},
    {lat: 36.689362, lng: -4.445013},
    {lat: 36.689093, lng: -4.445118},
    {lat: 36.689121, lng: -4.445215}
]

export const PITUFO_POLYGON = [
    {lat: 36.689041, lng: -4.445392},
    {lat: 36.689020, lng: -4.445292},
    {lat: 36.688786, lng: -4.445391},
    {lat: 36.688804, lng: -4.445473}
]

export const ENTRANCE_POLYGON = [
    {lat: 36.689497, lng: -4.445576},
    {lat: 36.689401, lng: -4.445177},
    {lat: 36.689353, lng: -4.445199},
    {lat: 36.689451, lng: -4.445598}
]

export const BATHROOM_POLYGON = [
    {lat: 36.689141, lng: -4.445064},
    {lat: 36.689114, lng: -4.444961},
    {lat: 36.689060, lng: -4.444985},
    {lat: 36.689084, lng: -4.445088}
]

export const POLYGON_ROOM_STYLE = {
    strokeColor: 'rgba(27, 217, 221, 0)',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#FFFFFF',
    fillOpacity: 1
}

export const POLYGON_BATHROOM_STYLE = {
    strokeColor: '#343c30',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#343c30',
    fillOpacity: 1
}
