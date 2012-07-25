// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players."

Players = new Meteor.Collection("players");

if (Meteor.is_client) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };
 

  Template.leaderboard.sort_order = function () {
    // Passes a string back to the sort button based on the sort order.
    var order = "Score";
    if (Session.get("is_name_order")) {
      order = "Name";
    }
    return order;
  };

  Template.leaderboard.events = {  
    'click input.inc': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click #sort': function () {
      // Our button switch
      Session.set("is_name_order", !Session.get("is_name_order"));
    }
  };

  Template.player.events = {
    'click': function () {
      Session.set("selected_player", this._id);
    }
  };

  Template.leaderboard.players = function () {
    // Ended up stealing this bit of code to get me started. 
    // Here is where we actually change the sort.
    var order = Session.get("is_name_order") ?
    {name: 1, score: -1} :
    {score: -1, name: 1};
    return Players.find({}, {sort: order});
};

}

// On server startup, create some players if the database is empty.
if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Math.random()*10)*5});
    }
  });
}
