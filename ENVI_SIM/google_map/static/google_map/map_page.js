
console.log("Hello world outside")

// let cellValues = [];


function initMap() {
  
 const directionsService = new google.maps.DirectionsService();
 const directionsRenderer = new google.maps.DirectionsRenderer();

  console.log("Hello world inside 1")
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.416117, lng: -89.240345 },
    zoom: 12,
  });

  directionsRenderer.setMap(map);
  
  
  const onChangeHandler = function () {
  
    // calculateAndDisplayRoute(directionsService, directionsRenderer);
   

     $('#html-data-table tr').click( function(){
      
        console.log("I am clicking")
       calculateAndDisplayRoute(directionsService, directionsRenderer,this.rowIndex);
      })

  
  };

 
  
  

    

   document.getElementById("html-data-table").addEventListener('click',onChangeHandler)
 
  // document.getElementById("html-data-table").rows[1].cells[3].textContent.addEventListener('click',onChangeHandler)
  // document.getElementById("html-data-table").rows[1].cells[4].textContent.addEventListener('click',onChangeHandler)
  

 
}



Data = [

  {
    "Routes": "Line 2",
    "Name": "water front",
    "Stops": 13,
    "Start_loc ": "Confederation College",
    "Stop_loc": "Waterfront Terminal",
     
     "Trips times": 30,
     "Distance": 12,
     "Avg Serv. Speed":1.5,
     "Avg ECR":12,
     "Total EC":1200,
      
  },

   

]




function renderDataInTheTable( Data) {
  console.log("Algo started...")
  const mytable = document.getElementById("html-data-table")
  console.log(mytable)

  Data.forEach( routes => {
    print(routes)
    let newRow = document.createElement("tr")
    Object.values(routes).forEach((value) =>{
      let cell = document.createElement("td");
      cell.innerHTML = value;
      newRow.appendChild(cell)

    })
   
     mytable.appendChild(newRow)

    
  });
 
  
 
}

renderDataInTheTable( Data)








var btns = document.getElementsByClassName("btn-r");

for (var i = 0; i < btns.length; i++) {
  console.log(btns)
  btns[i].addEventListener("click", function() {

    for (var j = 0; j < btns.length; j++) {
      btns[j].dataset.active = "inactive";
      console.log(btns[j].dataset.active)
    }
    if (this.dataset.active == "active") {
      this.dataset.active = "inactive";
    } else {
      this.dataset.active = "active";
    }
  })
}


function calculateAndDisplayRoute(directionsService, directionsRenderer, rowIndex) {

   console.log(document.getElementById("html-data-table").rows[rowIndex].cells[3].textContent)
   console.log(document.getElementById("html-data-table").rows[rowIndex].cells[4].textContent)
   console.log("I am calcing the route...")

  directionsService
    .route({
      origin: {
        query:  document.getElementById("html-data-table").rows[rowIndex].cells[3].textContent
      },
      destination: {
        query:  document.getElementById("html-data-table").rows[rowIndex].cells[4].textContent
      },
      travelMode: google.maps.TravelMode.TRANSIT,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));

  }

 

    
/*
function addRowHandlers() {


   
  var rows = document.getElementById("html-data-table").rows;
  var start;
  for (i = 0; i < rows.length; i++) {

      rows[i].onclick = function(){ 

         return function(){
             var start = this.cells[3].innerHTML;
             var end = this.cells[4].innerHTML;
             
             const directionsService = new google.maps.DirectionsService();
             const directionsRenderer = new google.maps.DirectionsRenderer();

            //  cellValues = [start,end]
            calculateAndDisplayRoute(directionsService, directionsRenderer, start, end)
            

           console.log("hello")
          //  console.log(start)

            //  console.log(cellValues)
             
      };
    }(rows[i]);

  }

  
 
}


function addRowHandlers(){
  let cellValues = [];
  var rows = document.getElementById("html-data-table").rows;

  rows.forEach(row=> row.onclick =()=>{
     
    cellValues.append(this.cells[3].innerHTML)
    console.log("hAIDER")
    })

  console.log("cell values: " + cellValues)
}




window.onload = addRowHandlers();

*/