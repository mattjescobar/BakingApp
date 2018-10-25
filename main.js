$.getJSON(
  "https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes?api_key=keyLvHnHrkGTXgLbx",
  function(data) {
    var html = [];
    
    $.each(data.records, function(_index, record) {
      var name = record.fields["Name"];
      var type = record.fields["Meal Type"];
      var servings = record.fields["Servings"];
      var prepTime = record.fields["Prep Time"];
      var image = record.fields["Food Image"];
      html.push(
        `<img :src="${image}"> <br><h2>${name}</h2> <h3>${servings} servings, ${prepTime}</h3>`
      ); /* html.push is pushing the array titled html (defined in line 3). 'Push' pushes arrays. To have something push to somewhere else, I declare a new array (var mealtype = [];), fill that array ($.each(data.records, function(_index, record)) and then push to that array (mealtype.push('the rest of the commands'))*/
    });
    $(".recipes").append(
      html
    ); /* You're sending it to the '.recipes' class. You need the dot. */
  }
);
