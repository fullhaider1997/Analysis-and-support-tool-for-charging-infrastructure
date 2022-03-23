function routeTable(path){
    return fetch('/routeTable/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
  return response.text();
    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}


function makeTable(data){
    console.log("start table" + data);
    
  var col = [];
  for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
          console.log(key);
      }
  }
  /* var table = document.createElement("table");
  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                   // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < data.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][col[j]];
      }
  }

  console.log("reached end of make table");

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("dvCSV");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
 */

}