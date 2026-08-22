async function rockets(){
  try{
    const r=await fetch('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json',{headers:{accept:'application/json','user-agent':'Mozilla/5.0','referer':'https://www.nba.com/','origin':'https://www.nba.com'}});if(!r.ok)throw Error('NBA '+r.status);
    const j=await r.json(),events=[];
    for(const d of j?.leagueSchedule?.gameDates||[])for(const g of d.games||[]){
      const home=g.homeTeam?.teamTricode||'';if(String(home).toUpperCase()!=='HOU')continue;
      const dt=new Date(g.gameDateTimeUTC||g.gameDateTimeEst||g.gameDateTime||d.gameDate);if(Number.isNaN(dt.getTime())||dt.getTime()<Date.now()-3600000)continue;
      events.push({id:'Rockets:'+g.gameId,title:'Houston Rockets vs '+(g.awayTeam?.teamName||g.awayTeam?.teamCity||g.awayTeam?.teamTricode||'Opponent'),source:'Houston Rockets',date:dt.toISOString(),area:'Downtown',venue:g.arenaName||'Toyota Center',address:'1510 Polk St, Houston, TX 77002',price:null,url:'https://www.nba.com/rockets/schedule',description:'Houston Rockets home game.',image:'',lat:29.7508,lng:-95.3621,sourceMode:'official NBA schedule',sport:'Basketball',home:true});
    }
    return events;
  }catch{return[]}
}
const T={
  dynamo:{source:'Houston Dynamo FC',venue:'Shell Energy Stadium',address:'2200 Texas Ave, Houston, TX 77003',area:'Downtown',url:'https://www.houstondynamofc.com/tickets/single-game'},
  dash:{source:'Houston Dash',venue:'Shell Energy Stadium',address:'2200 Texas Ave, Houston, TX 77003',area:'Downtown',url:'https://www.houstondynamofc.com/houstondash/schedule/'},
  dynamo2:{source:'Houston Dynamo 2',venue:'Shell Energy Stadium',address:'2200 Texas Ave, Houston, TX 77003',area:'Downtown',url:'https://www.houstondynamofc.com/dynamo2/news/houston-dynamo-2-and-mls-next-pro-announce-2026-regular-season-schedule'},
  uh:{source:'University of Houston Athletics',venue:'TDECU Stadium',address:'3875 Holman St, Houston, TX 77004',area:'Greater Houston',url:'https://uhcougars.com/sports/football/schedule'},
  rice:{source:'Rice Athletics',venue:'Rice Stadium',address:'6100 Main St, Houston, TX 77005',area:'Greater Houston',url:'https://riceowls.com/sports/football/schedule'},
  tsu:{source:'Texas Southern Athletics',venue:'W.W. Thorne Stadium',address:'1865 Aldine Bender Rd, Houston, TX 77032',area:'Greater Houston',url:'https://tsusports.com/sports/football/schedule'}
};
function e(team,id,title,date,extra={}){const t=T[team];return{id:`sports:${team}:${id}`,title,date,source:t.source,sourceMode:'official published 2026 schedule',venue:extra.venue||t.venue,address:extra.address||t.address,area:t.area,url:t.url,description:extra.description||'Official Houston home-game schedule.',price:null,priceMin:null,priceMax:null,priceLabel:'See official tickets',image:'',sport:extra.sport||'Sports',home:true,timeTBA:!!extra.timeTBA};}
const published=[
 e('dynamo','0829-sj','Houston Dynamo FC vs. San Jose Earthquakes','2026-08-29T19:30:00-05:00',{sport:'Soccer',description:'Kick Cancer Night at Shell Energy Stadium.'}),
 e('dynamo','0909-rsl','Houston Dynamo FC vs. Real Salt Lake','2026-09-09T19:30:00-05:00',{sport:'Soccer'}),
 e('dynamo','0919-cin','Houston Dynamo FC vs. FC Cincinnati','2026-09-19T19:30:00-05:00',{sport:'Soccer',description:'Noche Latina at Shell Energy Stadium.'}),
 e('dynamo','0926-skc','Houston Dynamo FC vs. Sporting Kansas City','2026-09-26T19:30:00-05:00',{sport:'Soccer',description:'Noche de México at Shell Energy Stadium.'}),
 e('dynamo','1017-dal','Houston Dynamo FC vs. FC Dallas','2026-10-17T19:30:00-05:00',{sport:'Soccer'}),
 e('dynamo','1024-min','Houston Dynamo FC vs. Minnesota United FC','2026-10-24T19:30:00-05:00',{sport:'Soccer'}),
 e('dynamo','1107-stl','Houston Dynamo FC vs. St. Louis CITY SC','2026-11-07T18:00:00-06:00',{sport:'Soccer',description:'Fan Appreciation Night at Shell Energy Stadium.'}),
 e('dash','0912-utah','Houston Dash vs. Utah Royals FC','2026-09-12T19:45:00-05:00',{sport:'Soccer'}),
 e('dash','1004-was','Houston Dash vs. Washington Spirit','2026-10-04T18:00:00-05:00',{sport:'Soccer'}),
 e('dash','1018-orl','Houston Dash vs. Orlando Pride','2026-10-18T12:00:00-05:00',{sport:'Soccer'}),
 e('dash','1101-por','Houston Dash vs. Portland Thorns FC','2026-11-01T16:00:00-06:00',{sport:'Soccer'}),
 e('dynamo2','0830-min','Houston Dynamo 2 vs. MNUFC2','2026-08-30T18:00:00-05:00',{sport:'Soccer'}),
 e('dynamo2','0904-atx','Houston Dynamo 2 vs. Austin FC II','2026-09-04T18:00:00-05:00',{sport:'Soccer'}),
 e('dynamo2','0920-skc','Houston Dynamo 2 vs. Sporting KC II','2026-09-20T16:00:00-05:00',{sport:'Soccer'}),
 e('uh','0905-osu','Houston Cougars Football vs. Oregon State','2026-09-05T11:00:00-05:00',{sport:'College Football'}),
 e('uh','0912-southern','Houston Cougars Football vs. Southern','2026-09-12T18:00:00-05:00',{sport:'College Football'}),
 e('uh','1003-ucf','Houston Cougars Football vs. UCF','2026-10-03T12:00:00-05:00',{sport:'College Football',timeTBA:true}),
 e('uh','1017-osu','Houston Cougars Football vs. Oklahoma State','2026-10-17T12:00:00-05:00',{sport:'College Football',timeTBA:true}),
 e('uh','1107-cin','Houston Cougars Football vs. Cincinnati','2026-11-07T12:00:00-06:00',{sport:'College Football',timeTBA:true}),
 e('uh','1128-baylor','Houston Cougars Football vs. Baylor','2026-11-28T12:00:00-06:00',{sport:'College Football',timeTBA:true}),
 e('rice','0905-hcu','Rice Owls Football vs. HCU','2026-09-05T18:00:00-05:00',{sport:'College Football'}),
 e('rice','0919-wmu','Rice Owls Football vs. Western Michigan','2026-09-19T18:00:00-05:00',{sport:'College Football'}),
 e('rice','1003-utsa','Rice Owls Football vs. UTSA','2026-10-03T12:00:00-05:00',{sport:'College Football',timeTBA:true}),
 e('rice','1017-tulsa','Rice Owls Football vs. Tulsa','2026-10-17T12:00:00-05:00',{sport:'College Football',timeTBA:true}),
 e('rice','1114-tulane','Rice Owls Football vs. Tulane','2026-11-14T12:00:00-06:00',{sport:'College Football',timeTBA:true,description:'Homecoming & Alumni Weekend at Rice Stadium.'}),
 e('rice','1128-army','Rice Owls Football vs. Army','2026-11-28T12:00:00-06:00',{sport:'College Football',timeTBA:true}),
 e('tsu','0829-nccu','Texas Southern Tigers Football vs. N.C. Central','2026-08-29T18:00:00-05:00',{sport:'College Football'}),
 e('tsu','1010-mvsu','Texas Southern Tigers Football vs. Mississippi Valley State','2026-10-10T14:00:00-05:00',{sport:'College Football'}),
 e('tsu','1024-southern','Texas Southern Tigers Football vs. Southern University','2026-10-24T14:00:00-05:00',{sport:'College Football',venue:'NRG Stadium',address:'NRG Pkwy, Houston, TX 77054',description:'Texas Southern Homecoming.'}),
 e('tsu','1031-grambling','Texas Southern Tigers Football vs. Grambling State','2026-10-31T19:30:00-05:00',{sport:'College Football'}),
 e('tsu','1107-alstate','Texas Southern Tigers Football vs. Alabama State','2026-11-07T14:00:00-06:00',{sport:'College Football'}),
 e('tsu','1121-uapb','Texas Southern Tigers Football vs. Arkansas-Pine Bluff','2026-11-21T15:00:00-06:00',{sport:'College Football'})
];
module.exports=async(req,res)=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Cache-Control','s-maxage=1800, stale-while-revalidate=7200');const current=published.filter(x=>new Date(x.date).getTime()>Date.now()-3600000),r=await rockets();const events=[...current,...r].sort((a,b)=>new Date(a.date)-new Date(b.date));res.json({generatedAt:new Date().toISOString(),events,statuses:[{source:'Houston Sports',mode:'official team and league schedules',status:'live',count:events.length},{source:'Houston Rockets',mode:'official NBA schedule',status:r.length?'live':'season-not-loaded',count:r.length}]});};