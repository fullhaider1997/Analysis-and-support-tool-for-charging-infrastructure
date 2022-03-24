console.log("Energy consumption is started")


var energy_consumption_s =[]
var time_s = []





$("#routes_id li").click(function() {

  console.log("Clicking on selection of routes:ssoc")
      
  var button = document.getElementById("dropdown_button")
  var id = $(this).attr("id");
  button.innerHTML = id;
  console.log(id)

  

});

$("#tripset_id li").click(function() {

  console.log("Clicking on selection of routes:soc")
      
  
  var button = document.getElementById("dropdown_button_tripset")
  var id = $(this).attr("id");
  button.innerHTML = id;
  console.log(id)
        
  var service = document.getElementById("dropdown_button_tripset").innerHTML
  var route_id = document.getElementById("dropdown_button").innerHTML



  if(route_id== "Mainline 1" && service=="Service 1" ){
   
   
    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/1_0.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
      plotSOC(overalldata)
     
     
    });



   }else if(route_id== "Mainline 1" && service =="Service 2"){

    console.log("Clicking mainline 1 and Service 2")

    
    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/1_1.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)
     
     
    });

  }else if(route_id== "Line 2" && service =="Service 1"){
    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/2_0.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }else if(route_id== "Line 2" && service =="Service 2"){

    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/2_1.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });


  }else if(route_id== "3C Line" && service =="Service 1"){
  
    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/3C_0.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }else if(route_id== "3C Line" && service =="Service 2"){

    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/3C_1.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }else if(route_id== "3J Line" && service == "Service 1"){

    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/3J_0.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  
  }else if(route_id== "3J Line" && service =="Service 2"){

    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/3J_1.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }else if(route_id== "3M Line" && service =="Service 1"){


    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/3M_0.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });


  }else if(route_id== "3M Line" && service == "Service 2"){

    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/3M_1.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }else if(route_id== "8 Line" && service == "Service 1"){

    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/8_0.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }else if(route_id== "8 Line" && service == "Service 2"){
    soc_mixfleet = retrieveSOC("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/mixed_fleet_assignments/soc_profiles/8_1.csv")
 
    Promise.all([soc_mixfleet]).then(function(overalldata){
         
     plotSOC(overalldata)

    });

  }




});




function retrieveSOC(path){
  return fetch('/retrieveSOC/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
return response.text();
  }).then(function (text) {

 return JSON.parse(text)

 
 }).then(data =>{
return data})
}



  




function plotSOC(data){

  console.log(data)

  soc = []
  time = []

  
       for(var i in data[0]["time"]){
            time.push(data[0]["time"][i])
       }
       for(var i in data[0]["soc"]){
             soc.push(data[0]["soc"][i])
        }
        
        

        var trace1 = {
    
          x:  time,
        
          y: soc,
          name: 'Disel fleet' ,

          mode: 'lines',
          
        
        
        
        };
     
     
     
      
        var data  = [trace1]

   
       
     var layout = {
     
    height: 300,
    
     yaxis: {
    
      title: {
    
        text: 'SOC(%)',
    
      },
      xaxis: {
          title: { 
              text:'Time(hrs)',
              


      }}
    
    }};
    
   
      Plotly.newPlot('soc_plot', data,layout);
  
  

}

