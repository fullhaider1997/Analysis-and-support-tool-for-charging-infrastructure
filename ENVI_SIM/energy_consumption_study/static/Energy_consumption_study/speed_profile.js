

console.log("I am connected speed dashboard.js")



/

$("#routes_id li").click(function() {

    console.log("Clicking on selection of routes:speed")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)

   // speed_data_disel =  retrieveSpeedData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")
   // speed_data_mixfleet = retrieveSpeedData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")

    if(id == "Mainline 1"){

        console.log("Clicking on Maineline 2")
      
        speed_data_disel =  retrieveSpeedData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")
    
        Promise.all([speed_data_disel,trip_data_electrical]).then(function(data){
          plotSpeed(data)
          
        });
    }








});

  
  
 




  function plotSpeed(overalldata){

    console.log("first data")
    console.log(overalldata)
    console.log("after")

    time_mixfleet = []
    speed_disel = []
    speed_mixfleet = []
    time_disel = []
                             

   

    for(var i in overalldata[0]["speed"]){
         speed_disel.push(overalldata[0]["speed"][i])
    }
    for(var j in overalldata[1]["speed"]){
       speed_mixfleet.push(overalldata[1]["speed"][j])
   }
     for(var i in overalldata[0]["arrival_time"]){
        time_disel.push(overalldata[0]["arrival_time"][i])
    }
    for(var j in overalldata[1]["arrival_time"]){
       time_mixfleet.push(overalldata[1]["arrival_time"][j])
     
  }
  

  

  console.log(time_mixfleet)
  console.log(time_disel)


 
  
   console.log("------------")

 
      
        var trace1 = {
    
          x:  time_disel,
        
          y: speed_disel,
          name: 'Disel fleet' ,

          mode: 'lines',
          
        
        
        
        };
     
         /*
      var trace2 = {
    
          x:  time_mixfleet,
        
          y: speed_mixfleet,
          name: 'Mix-Fleet ' ,

          mode: 'lines',
         
        
        
        };
     
      */
        var data  = [trace1]

   
       
     var layout = {
     
    height: 400,
    
     yaxis: {
    
      title: {
    
        text: 'Speed(Km/hr)',
    
    
      },
      xaxis: {
          title: { 
              text:'Time(hrs)',
              


      }}
    
    }};
    
   
      Plotly.newPlot('speed_plot', data,layout);
  
    


  
  

  }

  


