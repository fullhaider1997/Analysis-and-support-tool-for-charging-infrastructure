
console.log("I am active")


var element = document.getElementById("SOC Study");
console.log("Here..")
console.log(element)
element.classList.remove("unpressed")
element.classList.add("pressed")
$("#Content_switch_screen").load("soc_study");

initSocGraph()

console.log("I am connected to energy_board_study.js")





$(".energy_study_menu a").click(function() {


  var soc_study = document.getElementById("SOC Study");  
  var speed_profile = document.getElementById("Speed Profile"); 
  var time_bus_study = document.getElementById("Time vs Bus Study"); 
  var id = $(this).attr("id");
  //console.log(id)

  
  
  if("SOC Study" == id.toString())
   {
     console.log("SOC study screen")

      $("#Content_switch_screen").load("soc_study");

       soc_study.classList.remove("unpressed")
       soc_study.classList.add("pressed")
 
       speed_profile.classList.remove("pressed")
       speed_profile.classList.add("unpressed")

       time_bus_study.classList.remove("pressed")
       time_bus_study.classList.add("unpressed")

     
   }

  else if ("Speed Profile" == id.toString())
  {
    console.log("speed profile screen")
   
     $("#Content_switch_screen").load("speed_study");

      speed_profile.classList.remove("unpressed")
      speed_profile.classList.add("pressed")

      time_bus_study.classList.remove("pressed")
      time_bus_study.classList.add("unpressed")

      soc_study.classList.remove("pressed")
      soc_study.classList.add("unpressed")
    
  
  }else if("Time vs Bus Study" == id.toString()){

    console.log("Time vs bus study screen")
    $("#Content_switch_screen").load("time_study");
   

     time_bus_study.classList.remove("unpressed")
     time_bus_study.classList.add("pressed")

      soc_study.classList.remove("pressed")
      soc_study.classList.add("unpressed")

      speed_profile.classList.remove("pressed")
      speed_profile.classList.add("unpressed")



  }

  

});
