
//openMenu()
//$("#switchscreen").load("bus");
//select("Bus_Dashboard")


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
    document.getElementById("Charging_Stations_title").innerHTML = "Charging Stations"
    document.getElementById("configuration_setting_title").innerHTML = "Configuration Setting"
    document.getElementById("Export_title").innerHTML = "Export"

    


}

function closeMenu(){

  document.getElementById("Energy_Consumption_Study_title").innerHTML = "";
  document.getElementById("Environmental_Impact_Study_title").innerHTML = "";
  document.getElementById("Bus_Dashboard_title").innerHTML = "";
  document.getElementById("Routes_title").innerHTML = "";
  document.getElementById("Financial_Impact_Study_title").innerHTML = "";
  document.getElementById("Charging_Stations_title").innerHTML = ""
  document.getElementById("configuration_setting_title").innerHTML = ""
  document.getElementById("Export_title").innerHTML = ""
  
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

function select(id){

  console.log("Hello select")
  var item_route = document.getElementById("Routes");
  var item_bus = document.getElementById("Bus_Dashboard");
  var item_energy = document.getElementById("Energy Consumption Study");
  var item_enviorment = document.getElementById("Environmental Impact Study");
  var item_financial = document.getElementById("Financial Impact Study");
  var item_charging = document.getElementById("Charging Stations");
  var item_scheduling = document.getElementById("Scheduling");
  var item_export = document.getElementById("Export");

  list = [item_route,item_bus,item_energy,item_enviorment,item_financial,item_charging,
    item_scheduling,item_export  ]

   

    for (var i = 0; i < list.length; i++) {
       list[i].classList.add("sidebar-item")
       list[i].classList.remove("sidebar-item-active")
     }

  var item = document.getElementById(id);
  item.classList.add("sidebar-item-active")
  item.classList.remove("sidebar-item")
  

}



$("#sidebar a").click(function() {
   
    var id = $(this).attr("id");
    var item = document.getElementById(id);
   
    console.log(item)
    console.log(id)

    if("Routes"== id.toString()){

       console.log("I am clicking Routes")      
       $("#switchscreen").load("routes");
       //window.location.pathname = "routes"; 
       select(id)


    }else if("Bus_Dashboard" == id.toString()){

       console.log("I am clicking dashboard")
      
       $("#switchscreen").load("bus");

       
       select(id)
   


    } else if("Configuration Setting" == id.toString()){
     
      console.log("I am clicking Configuration Setting ")
     // $("#switchscreen").html(optimization_config);
      $("#switchscreen").load("scheduling");

      select(id)

      
    } else if("Energy Consumption Study" == id.toString()){

      $("#switchscreen").load("energy_consumption_study");

      select(id)

    }else if("Environmental Impact Study" == id.toString()){

      $("#switchscreen").load("environmental_impact_study");
      console.log("I am clicking enviormental")
      select(id)

    }else if("Financial Impact Study" == id.toString()){
      console.log("I am clicking financial...")
      $("#switchscreen").load("financial_impact_study");

      select(id)

    }else if("Schedule Impact Study" == id.toString()){

      $("#switchscreen").load("schedule_impact_study");
       console.log("I am clicking schedule")

       select(id)

    }else if("Export" == id.toString()){
      
      $("#switchscreen").load("export");

      select(id)
      
    }else if ("Charging Stations" == id.toString()){

      $("#switchscreen").load("charging_stations");
      console.log("I am clicking charging station")
      select(id)
    }



});



console.log("sidebardfdsfdf")


console.log("end page")