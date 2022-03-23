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
    var table = document.createElement("table");
    for(var i in data){
        var tr= table.insertRow(i)
        for(var j in data[i])
        {
            var tabCell= tr.insertCell(j);
            tabCell.innerHTML= data[i][j];
           
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("dvCSV");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);



}