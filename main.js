console.log("hello")

$.getJSON('https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes?api_key=keyLvHnHrkGTXgLbx',
function(data){
    var html = [];
    $.each(data.records, function(index, record) {
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      html.push(`<h2>${name}, ${address}, ${rating}</h2>`);
    });
    $('body').append(html);
  }
);