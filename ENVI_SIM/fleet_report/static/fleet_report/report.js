fleet_report = `


<div id="back_ground">


 <div id="dash_board">
 <ul id="bus_menu">
 <li id="Energy consumption" class="item-s"><a class="title_button-s">Energy consumption</a></li>
 <li id="Impact on schedule" class="item-s"><a class="title_button-s">Impact on schedule</a></li>
 <li id="Impact on schedule" class="item-s"><a class="title_button-s">Operational cost</a></li>
 </ul>   

   <div id="switchscreenbus">  
    
     <div id="Content_switch_screen"> 
     
    </div>
   
   </div>

   
 
 </div>

</div>

<script>

console.log("I am active")

var element = document.getElementById("Energy consumption");
console.log("Here..")
console.log(element)
element.classList.remove("item")
element.classList.add("item-active-s")
$("#Content_switch_screen").html(Energy_consumption );

</script>



<script>



$("#bus_menu li").click(function() {

  


});

</script>




`





Fuel_bus_board = `

<div>

  <div id="Fuel_bus_title">
    Fuel-Bus DashBoard
  </div>



</div> 



</div>`




Energy_consumption = `

<div> 

<div id="Elec_bus_title">
    Energy consumption
  </div>

 <div>

 



 

    
        </div>
      </div> 











</div>

<script>



</script>

`


console.log("Reached the report end")