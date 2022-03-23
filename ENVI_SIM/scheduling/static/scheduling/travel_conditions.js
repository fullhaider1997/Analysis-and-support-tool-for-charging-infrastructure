console.log("connecting to travel conditions.js")

  


let byd = $('#BYD_K9_input').val();
let vlv = $('#Volvo_7900_input').val();
let pro = $('#Proterra_ZX5_input').val();

$("#BYD_K9_input").on("change",function(){
    

   var disel_buses_num = document.getElementById("disel_buses_output");
   var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");

   if($(this).val() > byd){
        //incrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - 1 

    }else{
       //decrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) + 1 
    }

    byd = $(this).val();
    console.log("byd_k9 value : " + value)

   /*
    console.log("clicking byd...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)
  
      console.log("nova: " + parseInt(disel_buses_num.innerHTML))
      console.log("byd: " + parseInt(num_byd_k9.value))
      console.log("proteraa: " + parseInt((proterra.value)))
      console.log("volvo: " + parseInt((volvo.value)))
      
      console.log("nova: " + parseInt(disel_buses_num.innerHTML))

     // disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - byd -  parseInt(proterra.value) - parseInt(volvo.value)
     
    */



    
});


$("#Volvo_7900_input").on("change",function(){
    
   var disel_buses_num = document.getElementById("disel_buses_output");
   var proterra = document.getElementById("Proterra_ZX5_input");
   var volvo = document.getElementById("Volvo_7900_input");
   var num_byd_k9 = document.getElementById("BYD_K9_input");


   if($(this).val() > vlv){
      //incrementing
      disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - 1 

  }else{
     //decrementing
      disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) + 1 
  }

   console.log("volv value : " + vlv)
   vlv = $(this).val();

/*
    console.log("clicking volv...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)

    //disel_buses_num.innerHTML = - vlv - parseInt(disel_buses_num.innerHTML) -parseInt(num_byd_k9.value)  -  parseInt(proterra.value) 

  */
    
   
    
});


$("#Proterra_ZX5_input").on("change",function(){
    
   
   var disel_buses_num = document.getElementById("disel_buses_output");
   var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");

   if($(this).val() > pro){
        //incrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - 1 

    }else{
       //decrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) + 1 
    }

    pro = $(this).val();
    console.log("byd_k9 value : " + pro)

    
   // disel_buses_num.innerHTML = - parseInt(volvo.value) - parseInt(disel_buses_num.innerHTML) - parseInt(num_byd_k9.value)  -  pro 

   
   
});

$("#submit_paramter").click(function(results){

   console.log("I am clicking submitting button")

   var off_peak = document.getElementById("off_peak")
   var mid_peak = document.getElementById("mid_peak")
   var on_peak = document.getElementById("on_peak")
   var fuel_cost = document.getElementById("fuel_cost")
   var behavior_id = $('#behavior_id').find(":selected").text()
 


   var road_condition_id = $('#road_condition_id').find(":selected").text()
   var people_density_id = $('#people_density_id').find(":selected").text()
   var season_id = $('#season_id').find(":selected").text()

   var soc_upper_limit = document.getElementById("soc_upper_limit")
   var soc_lower_limit = document.getElementById("soc_lower_limit")
   var BYD_K9_input = document.getElementById("BYD_K9_input")
   var Proterra_ZX5_input = document.getElementById("Proterra_ZX5_input")
   var Volvo_7900_input = document.getElementById("Volvo_7900_input")
   var disel_buses_output = document.getElementById("disel_buses_output")
   var maintenace_id = document.getElementById("maintenace_id")
   var operational_id = document.getElementById("operational_id")

   var location_1 = localStorage.getItem("location-1")
   var location_2= localStorage.getItem("location-2")
   var location_3 = localStorage.getItem("location-3")
   var location_4= localStorage.getItem("location-4")
   
   
   var type_1 = localStorage.getItem("type-1")
   var type_2 = localStorage.getItem("type-2")
   var type_3 = localStorage.getItem("type-3")
   var type_4 = localStorage.getItem("type-4")
  
     
   if(road_condition_id == "Good(dry)"){
      road_condition_id = 1
   }else if(road_condition_id == "Fair(wet)"){
      road_condition_id = 2
   }else if (road_condition_id == "Poor(slushy)"){
      road_condition_id = 3
   }

   if(behavior_id == "Slow"){
      behavior_id = 1
   }else if(behavior_id == "Normal"){
      behavior_id = 2
   }else if (behavior_id == "Aggressive"){
      behavior_id = 3
   }

   if(people_density_id == "Full"){
      people_density_id = 1
   }else if(people_density_id == "Half-full"){
      people_density_id = 2
   }else if (people_density_id == "Regular"){
      people_density_id = 3
   } else if (people_density_id == "Scarce"){
      people_density_id = 8
   } 

   if(season_id == "Spring"){
      season_id = 1
   }else if(season_id == "Summer"){
      season_id = 2
   }else if (season_id == "Fall"){
      season_id = 3
   } else if (season_id == "Winter"){
      season_id = 4
   } 



   console.log(off_peak.value)
   console.log(mid_peak.value) 
   console.log(on_peak.value)
   console.log(fuel_cost.value)
   console.log(behavior_id)
   console.log(road_condition_id)
   console.log(people_density_id)
   console.log(season_id)
   console.log(soc_upper_limit.value)
   console.log(soc_lower_limit.value)
   console.log(BYD_K9_input.value)
   console.log(Proterra_ZX5_input.value)
   console.log(Volvo_7900_input.value)
   console.log(disel_buses_output.value)
   console.log(maintenace_id.value)
   console.log(operational_id.value)
   console.log(location_1)
   console.log(location_2)
   console.log(location_3)
   console.log(location_4)
   console.log(type_1)
   console.log(type_2)
   console.log(type_3)
   console.log(type_4)

   sendUserSimulationParamters(off_peak.value,mid_peak.value,on_peak.value,fuel_cost.value,
      behavior_id,road_condition_id,people_density_id,season_id,soc_upper_limit.value,
      soc_lower_limit.value,BYD_K9_input.value,Proterra_ZX5_input.value,Volvo_7900_input.value,disel_buses_output.value,maintenace_id.value,
      operational_id.value,location_1,location_2,location_3,location_4,type_1,type_2,type_3,type_4)

   

   

   

});

function sendUserSimulationParamters(off_peak,mid_peak,on_peak,fuel_cost,behavior_id,road_condition_id,people_density_id,season_id,
                                    soc_upper_limit,soc_lower_limit,BYD_K9_input,Volvo_7900_input,Proterra_ZX5_input ,disel_buses_output,
                                    maintenace_id,operational_id,location_1,location_2,location_3,location_4,type_1,type_2,type_3,type_4){
   return fetch('/sendUserSimulationParamters/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: 
   JSON.stringify({"off_peak": off_peak,"mid_peak":mid_peak, "on_peak": on_peak, "fuel_cost":fuel_cost,
                   "behavior_id": behavior_id,"road_condition_id":road_condition_id,"people_density_id":people_density_id,
                    "season_id":season_id,"soc_upper_limit":soc_upper_limit,"soc_lower_limit":soc_lower_limit,
                    "BYD_K9_input":BYD_K9_input,"Proterra_ZX5_input":Proterra_ZX5_input,"Volvo_7900_input":Volvo_7900_input,
                    "disel_buses_output":disel_buses_output,"maintenace_id":maintenace_id,"operational_id":operational_id,
                    "location_1":location_1,"location_2":location_2,"location_3":location_3,"location_4":location_4,
                     "type_1":type_1,"type_2":type_2,"type_3":type_3,"type_4":type_4}
   
   
   
   
   
   
   )

}).then(function (response) { // At this point, Flask has printed our JSON
 return response.text();
   }).then(function (text) {

  return JSON.parse(text)

  
  }).then(data =>{
 return data})
}
