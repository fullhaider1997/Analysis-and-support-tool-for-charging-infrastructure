console.log("Is charging stations.js connected to map")


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("charging-station-map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 13,
  });
}

console.log("Is charging stations.js end")


function show_list() {
    
    var courses = document.getElementById("chargers_id");
    
              
              if (courses.style.display == "block") {
                  courses.style.display = "none";
              } else {
                  courses.style.display = "block";
              }
          }
  



          window.onclick = function (event) {
              if (!event.target.matches('#dropdown_button')) {
                  document.getElementById('chargers_id').style.display = "none";
              }
    } 
 
  

    async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
      }

$("#chargers_id option").click(function() {

        console.log("Clicking on selection of buses")
            
        var button = document.getElementById("dropdown_button")
        var id = $(this).attr("id");
        console.log(id)
        button.innerHTML = id;
    
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+id+'&key=AIzaSyC7CIJd0Sk2ysCH_30GQnEHn9s2Jyu5rio'
       
       //data = fetch(url).then(data=>{return data.json()})
        data = fetchAsync(url)
        data.then(function(results){
            coordinates = results["results"][0]["geometry"]["location"]
            console.log(coordinates["lat"] + " " +coordinates["lng"])

            const image =
            "https://img.icons8.com/color/50/000000/car-charger.png";
        
           
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(coordinates["lat"],coordinates["lng"]),
                title:"Hello World!",
                icon: image
            });
            
            marker.setMap(map);

            map.setCenter(new google.maps.LatLng(coordinates["lat"],coordinates["lng"]));


            })
        
       // console.log(data)
        

});




fetch(url).then(data=>{return data.json()}).then(res=>{console.log(res)})


