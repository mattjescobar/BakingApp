var button = function(name){
  return `<button type="button" class="btn btn-secondary btn-sm"><h6>${name}</h6></button>`;
}; //Use the single tilde dash thing [`] (note it's sideways). Do not use single quote ['].

$.getJSON("https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes?api_key=keyLvHnHrkGTXgLbx",
  function(data) {
      var html = [];

      html.push(`<div class="row">`);
    $.each(data.records, function(_index, record) {
        var id = record.id;
        var fields = record.fields;
      var name = fields["Name"];
      var type = fields["Meal Type"];
      var servings = fields["Servings"];
      var prepTime = fields["Prep Time"];
      var images = fields["Food Image"] ? fields["Food Image"][0].url : "";
      var buttonName = button(name);

      html.push(
        `<div class="col-md-4"><img src="${images}"> <br>
         ${buttonName}<br>
        <h5>${servings} servings, ${prepTime}</h5></div>`
        
      ); /* html.push is pushing the array titled html (defined in line 3). 'Push' pushes arrays. To have something push to somewhere else, I declare a new array (var mealtype = [];), fill that array ($.each(data.records, function(_index, record)) and then push to that array (mealtype.push('the rest of the commands'))*/
    });
    console.log(html);
   html.push('</div>') //don't have to push this, array will auto close. Why???
    $(".recipes").append(html.join("")); /* You're sending it to the '.recipes' class. You need the dot. */
    }
);

