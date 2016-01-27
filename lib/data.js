var tools = require('./tools');

module.exports = {
    getData: function () {
        var teams = {
            home: {
                color: "red",
                name: "Olympiakos",
                coach: { fname: getRandomFirstName(), lname: getRandomLastName() },
                players: getRandomPlayers()
            },
            away: {
                color: "green",
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
            form: tools.getRandomInt(0,100), 
            attributes: getAttributes()
        };
    }
    
    return players;
}

function getRandomFirstName()
{
    var items = ['Panagiotis' , 'Stelios', 'Thodoris', 'Giannis', 'Giorgos', 'Makis', 'Aris', 'Periklis', 'Dionisis', 'Manolis', 'Stavros', 'Kostas', 'Vangelis'];
        
    return items[Math.floor(Math.random()*items.length)];
}

function getRandomLastName()
{
    var items = ['Athanasiou' , 'Papadopoulos', 'Iordanidis', 'Iatrou', 'Poultourtzidis', 'Gkegkas', 'Papagiannopoulos', 'Smith', 'Maldavousekis', 'Klyn'];
        
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
        rebound_def: tools.getRandomInt(5,20),
        rebound_off: tools.getRandomInt(5,20),
        experience: tools.getRandomInt(5,20)
    };
              
    return attributes;
}