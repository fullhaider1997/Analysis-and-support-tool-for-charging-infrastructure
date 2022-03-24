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
    // document.getElementById("dvCSV1").innerHTML="";
    // document.getElementById("dvCSV2").innerHTML="";
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



function combineTable(data,mydiv){
    var table = document.createElement("table");
    document.getElementById("dvCSV").innerHTML=""
    for(var i in data)
    {
        
        for( var j in data[i])
        {
            //console.log(data[i][j])
            var tr = table.insertRow(-1)
            if(i>0 && j==0)
            {
                j++;
            }
            var tabCell0=tr.insertCell(0)
            tabCell0.innerHTML=data[i][j][3]
            var tabCell1=tr.insertCell(1)
            tabCell1.innerHTML=data[i][j][4]
            var tabCell2=tr.insertCell(2)
            tabCell2.innerHTML=data[i][j][5]
            var tabCell3=tr.insertCell(3)
            tabCell3.innerHTML=data[i][j][6]


        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(mydiv);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}


function clearBox(elementID) {
    var div = document.getElementById(elementID);
      
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}