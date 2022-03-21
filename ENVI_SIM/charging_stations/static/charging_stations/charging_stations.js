
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

var tracker = 0
$("#add-charger").click(function (index){

    console.log("I am clicking add charger 1")
    
  
    var array = ["Location","Intercity Shopping Centre","Lakehead University","Thunder Bay Regional Health Sciences Centre","Confederation College","Westfort/Brown Street"];
    var array2 = ["Type","Swap","Fast", "slow"]
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

    
    location_selector.style="float:left; width:115px; margin:1px;"
    type_selector.style="float:left; width:115px; margin:1px;"

    
    remove.src= "https://img.icons8.com/color/48/000000/minus.png";
    remove.style="float:left; height:20px;"

    var br = document.createElement("br")
    
    location_selector.classList.add("location_id");
    remove.classList.add("id","remove:"+tracker)
    location_selector.classList.add("id",tracker)
    type_selector.classList.add("id","type:"+tracker)
    br.classList.add("id","br:"+tracker)
    

    type_selector.setAttribute("onclick",`remove(${tracker},${0})`);
    location_selector.setAttribute("onclick",`remove(${tracker},${0})`);
    remove.setAttribute("onclick",`remove(${tracker},${1})`);
    br.setAttribute("onclick",`remove(${tracker},${0})`);
    
    


    console.log("tracker " +tracker)
    tracker = tracker + 1

    console.log("I am clicking add charger 4")
    console.log("Name of class" +location_selector.className)
	buttonEl.appendChild(location_selector);
    buttonEl.appendChild(type_selector);
    buttonEl.appendChild(remove);
    buttonEl.appendChild(br)
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
        console.log("The selected location: " + location)
       
      //  console.log(id)
     //   button.innerHTML = id;
    
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyC7CIJd0Sk2ysCH_30GQnEHn9s2Jyu5rio'
       
       //data = fetch(url).then(data=>{return data.json()})
        data = fetchAsync(url)
        data.then(function(results){
            console.log(results)
            coordinates = results["results"][0]["geometry"]["location"]
            console.log(coordinates["lat"] + " " +coordinates["lng"])

            const image =
            "https://img.icons8.com/color/50/000000/car-charger.png";
        
           
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(coordinates["lat"],coordinates["lng"]),
                title: location.value,
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


$(document).on("click", ".remove_id", function(e) {

    console.log("Clicking remove")
    var remove = document.getElementsByClassName("remove_id")
    var id = $(this).attr("id");
    console.log("id of remove click is " + id)
});



function remove(div,click) {

    console.log("click value is " + click)
    console.log("clicking remove..." )
    var d = document.getElementById("append");
    console.log(d)
    var olddiv = document.getElementsByClassName(div);
    var type = document.getElementsByClassName("type:"+div);
    var br = document.getElementsByClassName("br:"+div);
    var remove = document.getElementsByClassName("remove:"+div);
     console.log("type---")
     console.log(type)
   // console.log("location---")
   // console.log(location)
    console.log("remove---")
    console.log(remove)
    
   // var olddiv = document.getElementsByClassName("tracker"+ div);

  if(click ==1 ){

   for (var j = 0; j < olddiv.length ; j++) {
    
      console.log(olddiv[j].parentNode.removeChild(olddiv[j]));    
  } 
  
      
    for (var j = 0; j < type.length ; j++) {
    
       console.log(type[j].parentNode.removeChild(type[j]));    
     }    
    
    
        console.log(remove[0].parentNode.removeChild(remove[0]));    
        console.log(br[0].parentNode.removeChild(br[0]));
    }else{
        console.log("You either clicking type,location..")
    }
    
     
   
}


