
console.log("helloss")

const menu = document.getElementById("menu")
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")





let menuOpen = false;


function openMenu(){

   
  
  menuOpen = true
  
  
    sidebar.style.width="300px"
    sidebar.style.borderStyle="solid";
    sidebar.style.borderWidth="2.5px";
    sidebar.style.display = "block";
    document.getElementById("Bus_Dashboard_title").innerHTML = "Bus Dashboard"
    document.getElementById("Routes_title").innerHTML = "Routes"
    document.getElementById("Energy_Consumption_Study_title").innerHTML = "Energy Consumption Study"
    document.getElementById("Environmental_Impact_Study_title").innerHTML = "Environmental Impact Study"
    document.getElementById("Financial_Impact_Study_title").innerHTML = "Financial Impact Study";
    document.getElementById("Schedule_Impact_Study_title").innerHTML = "Schedule Impact Study"
    document.getElementById("Charging_Stations_title").innerHTML = "Charging Stations"
    document.getElementById("Scheduling_title").innerHTML = "Scheduling"
    document.getElementById("Export_title").innerHTML = "Export"

    


}

function closeMenu(){

  document.getElementById("Energy_Consumption_Study_title").innerHTML = "";
  document.getElementById("Environmental_Impact_Study_title").innerHTML = "";
  document.getElementById("Bus_Dashboard_title").innerHTML = "";
  document.getElementById("Routes_title").innerHTML = "";
  document.getElementById("Financial_Impact_Study_title").innerHTML = "";
  document.getElementById("Schedule_Impact_Study_title").innerHTML = ""
  document.getElementById("Charging_Stations_title").innerHTML = ""
  document.getElementById("Scheduling_title").innerHTML = ""
  document.getElementById("Export_title").innerHTML = ""

  Export_title

  Scheduling_title


  
  // document.getElementById("Bus_Dashboard_title").innerHTML = ""
  // document.getElementById("Bus_Dashboard_title").innerHTML = ""
  // document.getElementById("Bus_Dashboard_title").innerHTML = ""
   
  
    menuOpen = false
   
    sidebar.style.width="70px"
    sidebar.style.border.width="10px";
    sidebar.style.border.radius="10px";
    //sidebar.style.borderStyle="none";
   // sidebar.style.display = "none";
}




menu.addEventListener("click", function(){

   if(!menuOpen){
     openMenu()
   }else{
     closeMenu()
   }


})



$("#sidebar a").click(function() {
   
    var id = $(this).attr("id");
    console.log(id)

    if("Routes"== id.toString()){

       console.log("I am clicking Routes")      
       $("#switchscreen").html(Routes_n_map);

    }else if("Bus_Dashboard" == id.toString()){

       console.log("I am clicking dashboard")
       //$("#switchscreen").html(DashBoard);
       $("#switchscreen").load("bus");

    } else if("Scheduling" == id.toString()){
     
      console.log("I am clicking Scheduling ")
     // $("#switchscreen").html(optimization_config);
      $("#switchscreen").load("scheduling");
      
    } else if("Energy Consumption Study" == id.toString()){

      $("#switchscreen").load("energy_consumption_study");

    }else if("Environmental Impact Study" == id.toString()){

      $("#switchscreen").load("environmental_impact_study");
      console.log("I am clicking enviormental")

    }else if("Financial Impact Study" == id.toString()){
      console.log("I am clicking financial...")
      $("#switchscreen").load("financial_impact_study");


    }else if("Schedule Impact Study" == id.toString()){

      $("#switchscreen").load("schedule_impact_study");
       console.log("I am clicking schedule")

    }else if("Export" == id.toString()){
      
      $("#switchscreen").load("export");
      
    }else if ("Charging Stations" == id.toString()){

      $("#switchscreen").load("charging_stations");
      console.log("I am clicking charging station")
    }



});



console.log("sidebardfdsfdf")


console.log("end page")