/*var button = function(name){
  return `<button type="button" class="btn btn-secondary btn-sm"><h4>${name}</h4></button>`;
};*/ //Use the single tilde dash thing [`] (note it's sideways). Do not use single quote ['].

var favoriteButton = function (id, favorite) {
  return `
    <button
    class="star btn btn-light"
    data-favorite="${favorite}"
    data-id="${id}"
    title="${favorite == 'Yes' ? `Remove from Favorites` : `Add to Favorites`}"
    >
    ${favorite == 'Yes' ? '★' : '☆'}
    </button>
  `
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

$.getJSON("https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes?api_key=keyLvHnHrkGTXgLbx",

  function (data) {
    var html = [];

    html.push(`<div class="row">`);
    $.each(data.records, function (_index, record) {
      var id = record.id;
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
);

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function (id, name, images, servings, cooktime, instructions, website, favorite) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      ${favoriteButton(id, favorite)}
      <img class="card-img-top" src="${images}">
      <div class="card-body">
        <h2>${name}</h2>
        <p class="card-text">Serves ${servings} Done in ${cooktime}</p>
        <p class="card-text">${instructions}</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
        ${website ? `<a href="${website}">${website}</a>` : ``}
      </div>
    </div>
  </div>`;
};

// Get and display the data for one item based on on the ID
var getDataForId = function (id) {
  $.getJSON(`https://api.airtable.com/v0/appRgPBG5cZYXh0C4/Recipes/${id}?api_key=${api_key}`,
    function (record) {
      // console.log(data);
      var html = [];
      html.push(`<div class="row">`);
      // console.log(record)
      var id = record.id;
      var fields = record.fields;

      var name = fields["Name"];
      var images = fields["Food Image"] ? fields["Food Image"][0].url : "";
      var type = fields["Meal Type"];
      var servings = fields["Servings"];
      var website = fields["sourced From"];
      var instructions = fields["Instructions"]; //
      var type = fields["Meal Type"]; //mine
      var favorite = fields["Favorite"]; //eh

      // Pass all fields into the Detail Template
      var itemHTML = detailView(id, name, images, servings, cooktime, instructions, website, favorite);
      html.push(itemHTML);
      html.push(`</div>`);
      $(".detail-view").append(html.join(""));
    },
  );
};

// Do we have an ID in the URL?
var id = getParameterByName("id");

// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}

// Listener to update favorites
$(document).on('click', '.star', function (e) {
  var id = $(this).data('id');
  console.log($(this).data('favorite'))
  var fields = {
    "Favorite": $(this).data('favorite') == 'Yes' ? 'No' : 'Yes'
  }
  $.ajax({
    url: `https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=${api_key}`,
    method: 'PATCH',
    data: {
      "fields": fields
    },
    success: function (data) {
      location.reload();
    }
  })

})