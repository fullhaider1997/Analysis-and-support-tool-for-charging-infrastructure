
DashBoard = `



<div id="back_ground">


 <div id="dash_board">
 <ul id="bus_menu">
 <li id="Electrical-buses" class="w"><a id="item-active">Electical buses</a></li>
 <li id="liquid-fuel-buses"class ="w"><a id="item" >liquid-fuel buses</a></li>
 </ul>   

   <div id="switchscreenbus">  
    
     <div id="Content_switch_screen"> 
     
    </div>
   
   </div>

   





 
 </div>

</div>

<script>



$("#bus_menu li").click(function() {

 
  console.log(this)
  var id = $(this).attr("id");
  
  if("Electrical-buses" == id.toString())
   {
     console.log("Electrical bus")

     $("#Content_switch_screen").html(Electrical_bus_board);

     


   }

  else if ("liquid-fuel-buses" == id.toString())
  {
    console.log("fuel bus")
   
    $("#Content_switch_screen").html(Fuel_bus_board);

    var but =  document.getElementById("item-active")
    

    
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




</div>`


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
                <li id="AB Volvo"><a >AB Volvo</a></li>
                <li id="Proterra"><a >Proterra ZX5</a></li>
            </div>
        </div>
 

    
        <div class="split left">
          
        <ul>
        <li>
            <label id="title_input">Battery Capacity</label>
            <input id = "my_input" type="text"/>
        </li>
         <li>
            <label id="title_input">Max Passengers</label>
            <input id = "my_input" type="text" />
        </li>
         <li>
            <label id="title_input">Max speed</label>
            <input id = "my_input" type="text" />
        </li>
         <li>
            <label id="title_input">Weight</label>
            <input id = "my_input" type="text" />
        </li>
        <li>
            <label id="title_input">Operational Cost</label>
            <input id = "my_input" type="text" />
        </li>
    </ul>



        </div>
      </div>
    
      <div class="split right">
        <img src="{% static 'BusDashBoard/busicon.png' %} ">
        
        </div>
      </div> 











</div>

<script>
$("#buses_id li").click(function() {
 

  var button = document.getElementById("dropdown_button")
  
  var id = $(this).attr("id");

  console.log(id)

  button.innerHTML = id;

});

</script>

`


console.log("Reached the dashboard end")