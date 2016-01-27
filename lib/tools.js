module.exports = {
    getRandomInt: function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    },
    getShortName: function(fname, lname)
    {
        return fname.substring(0,1) + "." + lname;
    },
    getRandomItem: function(items)
    {
        return items[Math.floor(Math.random()*items.length)];
    }
};