var tools = require('./tools');

module.exports = {
    getData: function () {
        var teams = {
            home: {
                color: "#ff0000",
                name: "Olympiakos",
                coach: { fname: getRandomFirstName(), lname: getRandomLastName() },
                players: getRandomPlayers()
            },
            away: {
                color: "#00ff00",
                name: "Panathinaikos",
                players: getRandomPlayers()
            }
        }
        
        return teams;
    }
};


function getRandomPlayers()
{
    var players = {};
    
    var positions = ['PG', 'SG', 'SF', 'PF', 'C', 'SUB1', 'SUB2', 'SUB3', 'SUB4', 'SUB5', 'SUB6', 'SUB7'];
    
    for( var i = 0; i < positions.length ; i++)
    {
        players[positions[i]] = { 
            fname: getRandomFirstName(), 
            lname: getRandomLastName(), 
            age: tools.getRandomInt(18,38), 
            height: tools.getRandomInt(175,225), 
            morale: tools.getRandomInt(0,100), 
            form: tools.getRandomInt(60,100), 
            attributes: getAttributes(),
            stats: getStats()
        };
    }
    
    return players;
}

function getRandomFirstName()
{
    var items = ['Panagiotis' , 'Stelios', 'Thodoris', 'Giannis', 'Stefanos', 'Giorgos', 'Makis', 'Aris', 'Kyriakos', 'Periklis', 'Dionisis', 'Manolis', 'Stavros', 'Kostas', 'Vangelis'];
        
    return items[Math.floor(Math.random()*items.length)];
}

function getRandomLastName()
{
    var items = ['Athanasiou', 'Papaioannou' , 'Papadopoulos', 'Igoumenidis', 'Ntafitsas', 'Tzortzis', 'Iordanidis', 'Iatrou', 'Poultourtzidis', 'Gkegkas', 'Papagiannopoulos', 'Smith', 'Maldavousekis', 'Klyn'];
        
    return items[Math.floor(Math.random()*items.length)];
}

function getAttributes()
{
    var attributes = {
        jumping: tools.getRandomInt(5,20),
        speed: tools.getRandomInt(5,20),
        power: tools.getRandomInt(5,20),
        stamina: tools.getRandomInt(5,20),
        shooting3: tools.getRandomInt(5,20),
        shooting2: tools.getRandomInt(5,20),
        free_throws: tools.getRandomInt(5,20),
        passing: tools.getRandomInt(5,20),
        marking: tools.getRandomInt(5,20),
        stealing: tools.getRandomInt(5,20),
        blocking: tools.getRandomInt(5,20),
        ball_handling: tools.getRandomInt(5,20),
        rebound_def: tools.getRandomInt(5,20),
        rebound_off: tools.getRandomInt(5,20),
        experience: tools.getRandomInt(5,20)
    };
              
    return attributes;
}

function getStats()
{
    var stats = {
        points: 0,
        points_3:{
            success: 0,
            total: 0
        },
        points_2:{
            success: 0,
            total: 0
        },
        ft: {
            success: 0,
            total: 0
        },
        assists: 0,
        steals: 0,
        blocks: 0,
        def_rebounds: 0,
        off_rebounds: 0,
        mistakes: 0,
        playtime: 0,
        fouls: 0
    }
    
    return stats;
}