var io = null;

var match = {
    status: "pregame",
    timer: 0,
    possession: {
        team: null,
        player: null
    },
    score:{
        home : 0,
        away: 0
    },
    teams: null,
    log: []
};

//Settings
var PREGAME_DURATION = 30;
var INGAME1_DURATION = 150;
var INGAME2_DURATION = 150;
var HALFTIME_DURATION = 30;
var INGAME3_DURATION = 150;
var INGAME4_DURATION = 150;
var POSTGAME_DURATION = 30;

var data = require('./data');
var tools = require('./tools');

module.exports = {
    initialize: function (socket) {
        
        console.log("Initializing Socket...");
        io = socket;
        
        console.log("Getting Team Data...");
        match.teams = data.getData();
        
        console.log("Initializing Match...");
        setInterval(getUpdate, 1000);
        
        return 1;
    }
};


function getUpdate()
{
    //console.log(JSON.stringify(match, null, 4));
    
    if(match.status == "pregame")
    {
        //Do the pregame stuff here
        console.log("--- PREGAME - Game starts in " + (PREGAME_DURATION - match.timer) + " seconds");
        
        if(match.timer >= PREGAME_DURATION)
        {
            match.timer = 0;
            match.status = "ingame1";
        }
    }
    
    if(match.status == "ingame1")
    {
        //Do the ingame stuff here
        console.log("--- INGAME 1 - First quarter ends in " + (INGAME1_DURATION - match.timer) + " seconds");
        
        if(match.timer >= INGAME1_DURATION)
        {
            match.timer = 0;
            match.status = "ingame2";
        }
    }
    
    if(match.status == "ingame2")
    {
        //Do the ingame stuff here
        console.log("--- INGAME 2 - Second quarter ends in " + (INGAME2_DURATION - match.timer) + " seconds");
        
        if(match.timer >= INGAME2_DURATION)
        {
            match.timer = 0;
            match.status = "halftime";
        }
    }
    
    if(match.status == "halftime")
    {
        //Do the ingame stuff here
        console.log("--- Halftime - Halftime ends in " + (HALFTIME_DURATION - match.timer) + " seconds");
        
        if(match.timer >= HALFTIME_DURATION)
        {
            match.timer = 0;
            match.status = "ingame3";
        }
    }
    
    if(match.status == "ingame3")
    {
        //Do the ingame stuff here
        console.log("--- INGAME 3 - Third quarter ends in " + (INGAME3_DURATION - match.timer) + " seconds");
        
        if(match.timer >= INGAME3_DURATION)
        {
            match.timer = 0;
            match.status = "ingame4";
        }
    }
    
    if(match.status == "ingame4")
    {
        //Do the ingame stuff here
        console.log("--- INGAME 4 - First quarter ends in " + (INGAME4_DURATION - match.timer) + " seconds");
        
        if(match.timer >= INGAME4_DURATION)
        {
            match.timer = 0;
            match.status = "postgame";
        }
    }
    
    if(match.status == "postgame")
    {
        //Do the ingame stuff here
        console.log("--- POSTGAME - The game ended, the app will close in " + (POSTGAME_DURATION - match.timer) + " seconds");
        
        if(match.timer >= POSTGAME_DURATION)
        {
            console.log("Match Completed. Exiting...")
            process.exit()
        }
    }
    
    tick();
    io.emit('game', match);
    
    match.timer++;
    
    return 1;
}


function tick()
{
    var home = match.teams.home.players;
    var away = match.teams.home.players;
        
    var log = '';
    
    //Pre-game
    if(match.status == "pregame" && match.timer == 0) log = "Welcome to tonight's game";
    if(match.status == "pregame" && match.timer == 1) log = match.teams.home.name + " vs " + match.teams.away.name;
    if(match.status == "pregame" && match.timer == PREGAME_DURATION - 20) if(tools.getRandomInt(0,1)) log = "Let's hope that we will see a nice game between the two teams";
    if(match.status == "pregame" && match.timer == PREGAME_DURATION - 15) log = "The teams are moving into the field";
    if(match.status == "pregame" && match.timer == PREGAME_DURATION - 8) log = match.teams.home.players.C.lname + " and " + match.teams.away.players.C.lname + " are getting ready for the jump ball";
    if(match.status == "pregame" && match.timer == PREGAME_DURATION - 3) log = "The referee is holding his whistle";
    if(match.status == "pregame" && match.timer == PREGAME_DURATION) log = "The match starts...";
    
    
    
    //In-game
    if(match.status == "ingame1" && match.timer == 0) log = "The ball is in the air";
    
    //Check who wins the jump ball
    if(match.status == "ingame1" && match.timer == 2)
    {
        if(home.C.height >= away.C.height)
        {
            log = tools.getShortName(home.C.fname, home.C.lname) + " jumps higher and wins the jump ball";
            match.possession.team = "home";
        }
        else
        {
            log = tools.getShortName(away.C.fname, away.C.lname) + " jumps higher and wins the jump ball";
            match.possession.team = "away";
        }
    }
    
    //Check who gets the ball after the jump ball
    if(match.status == "ingame1" && match.timer == 4)
    {
        var possiblePlayers = ["PG", "SG", "PF", 'SF'];
        
        if(tools.getRandomInt(0,100) > 10) // 90% possibility that the team who won the jump ball will get the ball
        {
            match.possession.player = tools.getRandomItem(possiblePlayers);
        }
        else
        {
            if(match.possession.team == "home"){ match.possession.team = "away"; } else { match.possession.team = "home"; }
            match.possession.player = tools.getRandomItem(possiblePlayers);
        }
        
        log = tools.getShortName(match.teams[match.possession.team].players[match.possession.player].fname, match.teams[match.possession.team].players[match.possession.player].lname) + " gets the ball"
    }
    
    //Try to play game
    if(match.status == "ingame1" && match.timer > 4)
    {
        
    }
    
    if(log) 
    {
        console.log(log);
        match.log.push({text: log, status: match.status, timer: match.timer});
    }
    
    return 1;
}