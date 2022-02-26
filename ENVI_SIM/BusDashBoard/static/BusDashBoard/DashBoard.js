



DashBoard = `



<div id="back_ground">


 <div id="dash_board">
 <ul id="bus_menu">
 <li id="Electrical-buses" class="item"><a class="title_button">Electical buses</a></li>
 <li id="liquid-fuel-buses" class="item"><a class="title_button">liquid-fuel buses</a></li>
 </ul>   

   <div id="switchscreenbus">  
    
     <div id="Content_switch_screen"> 
     
    </div>
   
   </div>

   
 
 </div>

</div>

<script>

console.log("I am active")

var element = document.getElementById("liquid-fuel-buses");
console.log("Here..")
console.log(element)
element.classList.remove("item")
element.classList.add("item-active")
$("#Content_switch_screen").html(Electrical_bus_board);

</script>



<script>



$("#bus_menu li").click(function() {

  var fuel_buses = document.getElementById("liquid-fuel-buses");
  var elect_buses = document.getElementById("Electrical-buses");

  console.log(this)
  var id = $(this).attr("id");
  
  if("Electrical-buses" == id.toString())
   {
     console.log("Electrical bus")

     $("#Content_switch_screen").html(Electrical_bus_board);

     elect_buses.classList.remove("item-active")
     elect_buses.classList.add("item")
 
     fuel_buses.classList.remove("item")
     fuel_buses.classList.add("item-active")

     
   }

  else if ("liquid-fuel-buses" == id.toString())
  {
    console.log("fuel bus")
   
    $("#Content_switch_screen").html(Fuel_bus_board);

  
    fuel_buses.classList.remove("item-active")
    fuel_buses.classList.add("item")

    elect_buses.classList.remove("item")
    elect_buses.classList.add("item-active")
    

    
  }


});

</script>


<script>
 


        function show_list() {
            var courses = document.getElementById("buses_id");
  
            
            if (courses.style.display == "block") {
                courses.style.display = "none";
            } else {
                courses.style.display = "block";
            }
        }

        window.onclick = function (event) {
            if (!event.target.matches('#dropdown_button')) {
                document.getElementById('buses_id').style.display = "none";
            }
        }  

    </script>

`

Fuel_bus_board = `

<div>

  <div id="Fuel_bus_title">
    Fuel-Bus DashBoard
  </div>


<div class="split left">

<ul id="liquid-fuel-input">

<li>
  <label id="title_input">Disel Cost</label>
  <input class = "my_input" type="text">
</li>
<li>
  <label id="title_input">Es. CO2 emission</label>
  <input class = "my_input" type="text" value="0.707 per kwh">
</li>
</ul>



</div>
</div>

<div class="split right">
<img id="Fuel-Bus-icon" src="https://www.thunderbay.ca/en/city-hall/resources/Images/History-Heritage-and-Records/Web-Exhibits/NewBus2013b.jpg" >

</div>
</div> 



</div>`



var bus_info = {
  
   "BYD K9":{
    Battery_capacity :"324 kWh",
    Max_passengers: "37",
    Max_speed: "100.584 km/h",
    Weight: "43,431 lbs",
    Charging_Time : "2-3 hrs"
   },
   "Volvo 7900 12m":{
    Battery_capacity :"470 kWh",
    Max_passengers: "38",
    Max_speed: "50 kw/h",
    Weight: "41,887.83 lbs",
    Charging_Time : "2-3 hrs"
   },
   "Proterra ZX5":{

    Battery_capacity :"220 kWh",
    Max_passengers: "40",
    Max_speed: "104.6 kw/h",
    Weight: "26,649 lbs",
    Charging_Time : "2.9 hrs"
   }



}

Electrical_bus_board = `

<div> 

<div id="Elec_bus_title">
    Electrical Bus Dashboard
  </div>

 <div>

        <div id="dropdown_list">
            <button id="dropdown_button" 
                onclick="show_list()">
                select EV bus
            </button>
  
            <div id="buses_id" class="buses">
                <li id="BYD K9"><a >BYD K9</a></li>
                <li id="Volvo 7900"><a >Volvo 7900</a></li>
                <li id="Proterra ZX5"><a >Proterra ZX5</a></li>
            </div>
        </div>



 

    
        <div class="split left">
          
        <ul>
        <li>
            <label id="title_input">Battery Capacity</label>
            <input class = "my_input-d" type="text" readonly>
        </li>
         <li>
            <label id="title_input">Max Passengers</label>
            <input class = "my_input-d" type="text" readonly>
        </li>
         <li>
            <label id="title_input">Max speed</label>
            <input class = "my_input-d" type="text" readonly>
        </li>
         <li>
            <label id="title_input">Weight</label>
            <input class = "my_input-d" type="text" readonly>
        </li>
        <li>
            <label id="title_input">Time to charge</label>
            <input class = "my_input-d" type="text" readonly>
        </li>
        
       </ul>

        </div>

      

      </div>

     
    
      <div class="split right">
        <img id="Bus-icon" src= "https://www.seekpng.com/png/full/248-2489608_bus-comments-bus-icon-white-png.png" >
        
        </div>
      </div> 











</div>

<script>

$("#buses_id li").click(function() {
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;


   console.log("Filling the textfields")
    var id = $(this).attr("id");
    console.log(id)

    var input = document.getElementsByClassName('my_input-d')
    console.log(input)

    if(id.toString() == "BYD K9") {
      input[0].value = "324 Kwh"
      input[1].value = "37"
      input[2].value = "100.84 km/h"
      input[3].value = " 43,431 Ibs"
      input[4].value = "2-3 hrs"

      
      document.getElementById("Bus-icon").src = 
      "https://www.electrive.com/wp-content/uploads/2018/08/byd-k9-electric-bus-elektrobus-usa-canada.png"

    } else if(id.toString() == "Volvo 7900")
    {
      input[0].value = "470 kwh"
      input[1].value = "38"
      input[2].value = "50 kw/h"
      input[3].value = "41, 887.83 Ibs"
      input[4].value = "2-3 hrs"

      document.getElementById("Bus-icon").src = "https://electriccarsreport.com/wp-content/uploads/2015/09/Volvo-7900-Electric.jpg"


    } else if(id.toString() == "Proterra ZX5"){

      input[0].value = "220kwh"
      input[1].value = "40"
      input[2].value = "104.6 kw/h"
      input[3].value = "26,649 Ibs"
      input[4].value = "2.9 hrs"

      
      document.getElementById("Bus-icon").src = "https://www.sustainable-bus.com/wp-content/uploads/2020/09/ZX5_40_PRODUCT-PAGE.jpg"

    }


    
    
    




 });


</script>

`


console.log("Reached the dashboard end")