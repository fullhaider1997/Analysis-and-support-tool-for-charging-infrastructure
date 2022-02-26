fleet_report = `


<div id="back_ground">


 <div id="dash_board">
 <ul id="report_menu">
 <li id="Energy consumption" class="item-s"><a class="title_button-s">Energy consumption</a></li>
 <li id="Impact on schedule" class="item-s"><a class="title_button-s">Impact on schedule</a></li>
 <li id="Operational cost" class="item-s"><a class="title_button-s">Operational cost</a></li>
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
$("#Content_switch_screen").html(Energy_consumption);

</script>



<script>



$("#report_menu li").click(function() {

  var id = $(this).attr("id");
  console.log(id)

  var energy_consumption_tab = document.getElementById("Energy consumption");
  var Impact_on_schedule_tab = document.getElementById("Impact on schedule");
  var operational_cost_tab = document.getElementById("Operational cost");

  console.log(energy_consumption_tab)
  console.log(Impact_on_schedule_tab)
  console.log(operational_cost_tab)

  if("Energy consumption" == id.toString()){


    console.log("I am clicking Energy consumption")
    $("#Content_switch_screen").html(Energy_consumption );

     
    energy_consumption_tab.classList.remove("item-active-s")
    energy_consumption_tab.classList.add("item-s")

    Impact_on_schedule_tab.classList.remove("item-s")
    Impact_on_schedule_tab.classList.add("item-active-s")

    operational_cost_tab.classList.remove("item-s")
    operational_cost_tab.classList.add("item-active-s")




  } 

  if("Impact on schedule" == id.toString()){


    console.log("I am clicking Impact on schedule")

    $("#Content_switch_screen").html(Impact_on_schedule);


    Impact_on_schedule_tab.classList.remove("item-active-s")
    Impact_on_schedule_tab.classList.add("item-s")

    energy_consumption_tab.classList.remove("item-s")
    energy_consumption_tab.classList.add("item-active-s")

    operational_cost_tab.classList.remove("item-s")
    operational_cost_tab.classList.add("item-active-s")
   




  }

  if("Operational cost" == id.toString()){

    console.log("I am clicking operational cost")
    $("#Content_switch_screen").html(Operational_cost);

    operational_cost_tab.classList.remove("item-active-s")
    operational_cost_tab.classList.add("item-s")

    energy_consumption_tab.classList.remove("item-s")
    energy_consumption_tab.classList.add("item-active-s")

    energy_consumption_tab.classList.remove("item-s")
    energy_consumption_tab.classList.add("item-active-s")



  }


});

</script>




`





Impact_on_schedule = `

<div>

  <div id="Impact_on_schedule_title">
    Impact on schedule
  </div>



</div> 

</div>

</div>

<script>





</script>


`




Energy_consumption = `

<div> 

<div id="Energy_consumption_title">
    Energy consumption
</div>

 <div>

 



 

    
</div>
</div> 











</div>

<script>



</script>

`



Operational_cost = `

<div> 

<div id="Operational_cost_title ">
  Operational cost 
  </div>

 <div>

 



 

    
        </div>
      </div> 











</div>

<script>



</script>

`


console.log("Reached the report end")