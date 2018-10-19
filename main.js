$.getJSON('https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes?api_key=keyLvHnHrkGTXgLbx',
function(data){
    var html = [];
    $.each(data.records, function(_index, record) {
      var name = record.fields['Name'];
      var servings = record.fields['Servings'];
      var prepTime = record.fields['Prep Time'];
      html.push(`<h2>${name}</h2> <h3>${servings} servings, ${prepTime}</h3>`);
    });
    $('body').append(html);
  }
);