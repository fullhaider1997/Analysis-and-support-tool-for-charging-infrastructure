
console.log("Is charging stations.js connected to map")


let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("charging-station-map"), {
      center: { lat: 48.3809, lng: -89.2477 },
      zoom: 12,
    });
  }
  
        
init_default_charging_locations()



//function initMap() {alert("ok");}






async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
}


      var index = 2;
$("#add-charger").click(function (index){

    console.log("I am clicking add charger 1")
    
  
    var array = ["Location","Intercity Shopping Centre, Thunder Bay","Lakehead University","Thunder Bay Regional Health Sciences Centre","Confederation College","Westfort/Brown Street"];
    var array2 = ["Swap","Fast", "slow"]
    var buttonEl = document.getElementById("append");
	var location_selector = document.createElement("select");
    var type_selector = document.createElement("select");
    var remove = document.createElement("img");

    console.log("I am clicking add charger 2")

    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
       location_selector.appendChild(option);
    }

    for (var i = 0; i < array2.length; i++) {
        var option = document.createElement("option");
        option.value = array2[i];
        option.text = array2[i];
        type_selector.appendChild(option);
    }
    console.log("I am clicking add charger 3")

    
    location_selector.style="float:left; width:115px;"
    type_selector.style="float:left; width:115px;"
    
    
    remove.src= "https://img.icons8.com/color/48/000000/minus.png";
    remove.style="float:left; height:20px;"
    
    
    location_selector.classList.add("location_id");

    console.log("I am clicking add charger 4")
    console.log("Name of class" +location_selector.className)
	buttonEl.appendChild(location_selector);
    buttonEl.appendChild(type_selector);

    buttonEl.appendChild(remove);
	document.getElementById(elementId).appendChild("append");
    index= index + 1;
    

});

$(document).on("click", ".remove", function() {
  
    var location = $('.location_id').find("id").text()
    console.log(location)

})




$(document).on("click", ".location_id", function() {

        console.log("Clicking on selection of charger location")
        var location = $('.location_id').find(":selected").text()
        var type = $('#type_id').find(":selected").text()
        var num = $('#num_id').find(":selected").text()
        var button = document.getElementById("dropdown_button_charger")
        var id = $(this).attr("value");
       
      //  console.log(id)
     //   button.innerHTML = id;
    
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyC7CIJd0Sk2ysCH_30GQnEHn9s2Jyu5rio'
       
       //data = fetch(url).then(data=>{return data.json()})
        data = fetchAsync(url)
        data.then(function(results){
            coordinates = results["results"][0]["geometry"]["location"]
            console.log(coordinates["lat"] + " " +coordinates["lng"])

            const image =
            "https://img.icons8.com/color/50/000000/car-charger.png";
        
           
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(coordinates["lat"],coordinates["lng"]),
                title:"City hall",
                icon: image
            });
            
            
            marker.setMap(map);

            map.setCenter(new google.maps.LatLng(coordinates["lat"],coordinates["lng"]));


            })
        
       

});


function init_default_charging_locations(){

    url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyC7CIJd0Sk2ysCH_30GQnEHn9s2Jyu5rio'
       
    //data = fetch(url).then(data=>{return data.json()})
     data = fetchAsync(url)
     data.then(function(results){
         
         const image =
         "https://img.icons8.com/color/50/000000/car-charger.png";
     
        
         var marker = new google.maps.Marker({
             position: new google.maps.LatLng(48.382540914587494,-89.24627431748044),
             title:"City hall",
             icon: image
         });

       
         var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(48.435959414014654,-89.21697904446354),
            title:"Waterfront-terminal",
            icon: image
        });
         
         marker.setMap(map);
         marker1.setMap(map)

         map.setCenter(map );


         })


}



