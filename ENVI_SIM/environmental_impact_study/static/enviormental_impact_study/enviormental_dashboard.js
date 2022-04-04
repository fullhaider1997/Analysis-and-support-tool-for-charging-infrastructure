

path = "C:/Users/fullh/Desktop/charg-infra-project"
//Initalizating the map

//Plotly.newPlot('Enviormental_map', data=[] , layout = {height: 400,}) ;
function show_list() {

    var courses = document.getElementById("routes_id");
  
    if (courses.style.display == "block") {
        courses.style.display = "none";
    } else {
        courses.style.display = "block";
    }
  }
  
  window.onclick = function (event) {
    if (!event.target.matches('#dropdown_button')) {
        document.getElementById('routes_id').style.display = "none";
    }
  }  

  function show_list_tripset() {

    var courses = document.getElementById("tripset_id");
  
    if (courses.style.display == "block") {
        courses.style.display = "none";
    } else {
        courses.style.display = "block";
    }
  }
  
  window.onclick = function (event) {
    if (!event.target.matches('#dropdown_button_tripset')) {
        document.getElementById('tripset_id').style.display = "none";
    }
  }  
  
  
  
  

  $("#routes_id li").click(function() {

    console.log("Clicking on selection of routes:enviormental")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)
  
    
  
  });

  $("#tripset_id li").click(function(){

    console.log("Clicking on the tripset:speed")
    var button = document.getElementById("dropdown_button_tripset")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)
          
    var service = document.getElementById("dropdown_button_tripset").innerHTML
    var route_id = document.getElementById("dropdown_button").innerHTML


 

  if(route_id== "Mainline 1" && service=="Service 1" ){
   
    co2_disel =  retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/diesel_only_assignments/emission_profiles/1_0.csv")
    co2_mixfleet = retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/emission_profiles/1_0.csv")
 
    Promise.all([co2_disel,co2_mixfleet]).then(function(overalldata){
         
      plotEmission(overalldata)
     
    });


  }if(route_id== "Mainline 1" && service=="Service 2" ){
   
    co2_disel =  retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/diesel_only_assignments/emission_profiles/1_1.csv")
    co2_mixfleet = retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/emission_profiles/1_1.csv")
 
    Promise.all([co2_disel,co2_mixfleet]).then(function(overalldata){
         
      plotEmission(overalldata)
     
    });


  }if(route_id== "8 Line" && service=="Service 1" ){
   
    co2_disel =  retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/diesel_only_assignments/emission_profiles/8_0.csv")
    co2_mixfleet = retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/emission_profiles/8_0.csv")
 
    Promise.all([co2_disel,co2_mixfleet]).then(function(overalldata){
         
      plotEmission(overalldata)
     
    });


  }if(route_id== "8 Line" && service=="Service 2" ){
   
    co2_disel =  retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/diesel_only_assignments/emission_profiles/8_2.csv")
    co2_mixfleet = retrieveCO2EmissionData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/emission_profiles/8_2.csv")
 
    Promise.all([co2_disel,co2_mixfleet]).then(function(overalldata){
         
      plotEmission(overalldata)
     
    });
  }


});

  

function plotEmission(data){


  co2_emission_disel = []
  elec_emission_disel = []
  co2_trip_id = []
  elec_trip_id=  []
  
  console.log(data)
  console.log(data[0])
  
  for(var i in data[0][0]){
    co2_trip_id.push(data[0][0][i])
  }
  for(var i in data[1][0]){
    elec_trip_id.push(data[1][0][i])

  }


  for(var i in data[0][1]){
    co2_emission_disel.push(data[0][1][i])

  }

  for(var i in data[1][1]){
    elec_emission_disel.push(data[1][1][i])

  }

  console.log(elec_emission_disel)
  console.log(co2_emission_disel)
 

  var trace1 = {

    x: co2_trip_id,
  
    y: co2_emission_disel,
  
    name: 'Disel-fleet',
  
    type: 'bar'
  
  };
  
  
  var trace2 = {
  
    x: elec_trip_id,
  
    y: elec_emission_disel,
  
    name: 'Mix-fleet',
  
    type: 'bar'
  
  };
  
  
  var data = [trace1, trace2];
  
  
  var layout = {
    barmode: 'group',
    height: 300,
      
    yaxis: {
   
     title: {
   
       text: 'CO2 Emission (kg)',
   
     },
     xaxis: {
         title: { 
             text:'Per Trip',
             


     }}
   
   }
  };
  
  
  Plotly.newPlot('Enviormental_map', data, layout);

}