Meteor Leaderboard
==================

##[Live demo](http://legitimately-shippable-leaderboard-demo.meteor.com/)

Original leaderboard example from the [MeteorJS site](http://meteor.com/examples/leaderboard). It's startling how easy it is to get work done in Meteor; wouldn't be surprised if it's the next de facto Web framework. 

The new sort button, sans logic.
```
  <div class="controller">
    <button id="sort">Sort by {{sort_order}}</button>
  </div>
 ```

```javascript
  Template.leaderboard.sort_order = function () {
    // Passes a string back to the sort button based on the sort order.
    var order = "Score";
    if (Session.get("is_name_order")) {
      order = "Name";
    }
    return order;
  };
```

```javascript
    'click #sort': function () {
      // Our button switch
      Session.set("is_name_order", !Session.get("is_name_order"));
    }
```

```javascript
  Template.leaderboard.players = function () {
    // Ended up stealing this bit of code to get me started. 
    // Here is where we actually change the sort.
    var order = Session.get("is_name_order") ?
    {name: 1, score: -1} :
    {score: -1, name: 1};
    return Players.find({}, {sort: order});
	};
```