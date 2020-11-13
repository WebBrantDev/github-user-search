function getResults(userName, maxResults = 10) {
  const searchUrl = `https://api.github.com/users/${userName}/repos`;
  console.log(searchUrl, maxResults);
  const params = {
    per_page: maxResults,
  };

  const url = searchUrl + "?per_page=" + maxResults;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => displayResults(responseJson))
    .catch((error) => alert("broke"));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(
      `<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3></li>`
    );
    console.log(responseJson[i].html_url);
  }

  $("h2").removeClass("hidden");
}

function searchSubmitListener() {
  $("#search-form").submit((event) => {
    event.preventDefault();
    const userName = $("#search-input").val();
    const maxResults = $("#max-results").val();
    getResults(userName, maxResults);
    $("#search-input").val("");
  });
}

function handler() {
  searchSubmitListener();
}

$(handler);
