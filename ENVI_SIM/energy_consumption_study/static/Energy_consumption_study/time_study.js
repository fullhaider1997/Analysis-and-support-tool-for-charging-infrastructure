//Change pace to your system dir

path = "C:/Users/fullh/Desktop/charg-infra-project/"
console.log("Connecting to time_study.js")


$("#routes_id li").click(function() {

    console.log("Clicking on selection of routes:energy consumped")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)

    

});

$("#tripset_id li").click(function() {

    console.log("Clicking on selection of routes:energy consumped")
        
    
    var button = document.getElementById("dropdown_button_tripset")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)
          
    var service = document.getElementById("dropdown_button_tripset").innerHTML
    var route_id = document.getElementById("dropdown_button").innerHTML


    if(route_id== "Mainline 1" && service=="Service 1" ){
   
   
        soc_mixfleet = retrieveEnergyData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/energy_consumption_profiles/1_0.csv")
     
        Promise.all([soc_mixfleet]).then(function(overalldata){
             
          plotEnergy(overalldata)
         
         
        });
    
    
    
       }else if(route_id== "Mainline 1" && service =="Service 2"){
    
        soc_mixfleet = retrieveEnergyData(path +"/ENVI_SIM/data/output/mixed_fleet_assignments/energy_consumption_profiles/1_1.csv")
     
        Promise.all([soc_mixfleet]).then(function(overalldata){
             
          plotEnergy(overalldata)
         
         
        });
    
      }else if(route_id== "Line 2" && service =="Service 1"){
    
    
      }else if(route_id== "Line 2" && service =="Service 2"){
    
      
    
      }else if(route_id== "3C Line" && service =="Service 1"){
      
        
    
      }else if(route_id== "3C Line" && service =="Service 2"){
    
     
    
      }else if(route_id== "3J Line" && service == "Service 1"){
    
       ;
    
      
      }else if(route_id== "3J Line" && service =="Service 2"){
    
      
    
      }else if(route_id== "3M Line" && service =="Service 1"){
    
    
       
    
    
      }else if(route_id== "3M Line" && service == "Service 2"){
    
       
      }else if(route_id== "8 Line" && service == "Service 1"){
    
        soc_mixfleet = retrieveEnergyData(path +"/ENVI_SIM/data/output/mixed_fleet_assignments/energy_consumption_profiles/8_0.csv")
     
        Promise.all([soc_mixfleet]).then(function(overalldata){
             
          plotEnergy(overalldata)
         
         
        });
    
      }else if(route_id== "8 Line" && service == "Service 2"){
      
        soc_mixfleet = retrieveEnergyData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/energy_consumption_profiles/8_1.csv")
     
        Promise.all([soc_mixfleet]).then(function(overalldata){
             
          plotEnergy(overalldata)
         
         
        });
      }



});