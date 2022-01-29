
console.log("Hello world outside")
function initMap() {
  console.log("Hello world inside 1")
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.416117, lng: -89.240345 },
    zoom: 12,
  });
  

}

Data = [

  {
    "Routes": "Line 2",
    "Name": "water front",
     "Stops": 13,
     "Trips times": 30,
     "Distance": 12,
     "Avg Serv. Speed":1.5,
     "Avg ECR":12,
     "Total EC":1200
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

$('[data-switch]').on('click', function (e) {
  console.log("I am clicking the button 1")
  var $page = $('#Report-content'),
      blockToShow = e.currentTarget.getAttribute('data-switch');
    
  console.log($page)
  console.log("I am clicking the button 1")
  // Hide all children.
  $page.children().hide();

  // And show the requested component.
  $page.children(blockToShow).show();
});







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