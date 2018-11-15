function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Template that generates the HTML for one item in our list view, given the parameters passed in
var listView = function (id, name, images, servings, cooktime) {
  return `<div class="col-sm-3">
    <div class="card mb-4 box-shadow">
      <a href="index.html?id=${id}"><img class="card-img-top" src="${images}"></a>
      <div class="card-body">
        <h4><a href="index.html?id=${id}">${name}</a></h4>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${servings} Servings</small>
          <small class="text-muted">total cooktime: ${cooktime}</small>
          </div>
      </div>
    </div>
  </div>`;
};

var getAllRecords = function(){
$.getJSON("https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes?api_key=keyLvHnHrkGTXgLbx",
  function (data) {
    var html = [];

    html.push(`<div class="row">`);
    $.each(data.records, function (_index, record) {
      var id = record.id;
      console.log(id);
      var fields = record.fields;
      var name = fields["Name"];
      var type = fields["Meal Type"];
      var servings = fields["Servings"];
      var cooktime = fields["Meal Time"];
      var images = fields["Food Image"] ? fields["Food Image"][0].url : "";
      /*var buttonName = button(name);*/

      var itemHTML = listView(id, name, images, servings, cooktime);
      html.push(itemHTML);


    });
    html.push('</div>')
    $(".recipes").append(html.join("")); /* You're sending it to the '.recipes' class. You need the dot. */
  }
)};

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function (name, images, servings, website, instructions, cooktime) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${images}">
      <div class="card-body">
        <h2>${name}</h2>
        <p class="card-text">Serves ${servings} Done in ${cooktime}</p>
        <p class="card-text">${instructions}</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
        <p class="card-text"> Sourced from ${website ? `<a href="${website}">${website}</a>` : ``}</p>
      </div>
    </div>
  </div>`;
};

var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes/${id}?api_key=keyLvHnHrkGTXgLbx`,
    function(record){
      var html = [];
      var fields = record.fields;
      var name = fields["Name"];
      var images = fields["Food Image"] ? fields["Food Image"][0].url : "";
      var servings = fields["Servings"];
      var website = fields["sourced From"];
      var cooktime = fields["Meal Time"];
      var instructions = fields["Instructions"].replace(/(?:\r\n|\r|\n)/g, '<br>');

      html.push(detailView(name, images, servings, website, instructions, cooktime));
      $('body').append(html);
    }
  );
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}