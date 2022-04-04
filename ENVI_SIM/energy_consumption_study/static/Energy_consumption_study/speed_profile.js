

console.log("I am connected speed dashboard.js")


path = "C:/Users/fullh/Desktop/charg-infra-project"



$("#routes_id li").click(function() {

    console.log("Clicking on selection of routes:speed")
        
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
  
 


  //speed_data_disel =  retrieveDataSet("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")
  //speed_data_mixfleet = retrieveSpeedData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")

  if(route_id== "Mainline 1" && service=="Service 1" ){
   
    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/1_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/1_0.csv")
 
    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
         
      plotSpeed(overalldata)
     
     
    });



   }else if(route_id== "Mainline 1" && service =="Service 2"){

    console.log("Clicking mainline 1 and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/1_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/1_1.csv")
 
    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
         
     plotSpeed(overalldata)
     
     
    });
       

   }else if(route_id== "Line 2" && service =="Service 1"){

    console.log("Clicking 2 Line and Service 1")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/2_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/2_0.csv")
 
    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
         
     plotSpeed(overalldata)
     
     
    });
       

   }else if(route_id== "Line 2" && service =="Service 2"){

    console.log("Clicking 2 Line and Service 2")

     speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/2_1.csv")
     speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/2_1.csv")
 
     Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
         
     plotSpeed(overalldata)
     
    });

   }else if(route_id== "3C Line" && service =="Service 1"){

    console.log("Clicking 2 Line and Service 2")

     speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/3C_0.csv")
     speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/3C_0.csv")
 
     Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
         
     plotSpeed(overalldata)
     
    });

   }else if(route_id== "3C Line" && service =="Service 2"){

       console.log("Clicking 2 Line and Service 2")
  
       speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/3C_1.csv")
       speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/3C_1.csv")
   
       Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
           
       plotSpeed(overalldata)
       
      });

  }else if(route_id== "3J Line" && service == "Service 1"){

    console.log("Clicking 3J Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/3J_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path +"/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/3J_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });



  }else if(route_id== "3J Line" && service =="Service 2"){

    console.log("Clicking 3J Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/3J_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/3J_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });



  }else if(route_id== "3M Line" && service =="Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/3M_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/3M_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });



  }else if(route_id== "3M Line" && service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path +"/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/3M_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path +"/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/3M_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });



  }else if(route_id== "4 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/4_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/4_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });



  }else if(route_id== "4 Line" && service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/4_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/4_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "5 Line" && service == "Service 1" || service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/5_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/5_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "6 Line" && service == "Service 1" || service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/6_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/6_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "7 Line" && service == "Service 1" || service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/7_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/7_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "8 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/8_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/8_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "8 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/8_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/8_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "9 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/9_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/9_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "9 Line" && service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/9_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/9_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "10 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/10_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/10_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "10 Line" && service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path +"/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/10_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/10_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "11 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/11_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/11_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }
  else if(route_id== "11 Line" && service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path +"/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/11_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/11_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "12 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 1")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/12_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/12_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "12 Line" && service == "Service 2" || service == "Service 1" ){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path +"/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/12_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/12_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "13 Line" && service == "Service 1" || "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path +"/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/10_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/10_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "14 Line" && service == "Service 1"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/14_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/14_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "14 Line" && service == "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path + "/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/14_1.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/14_1.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
   });

  }else if(route_id== "16 Line" && service == "Service 1" || "Service 2"){

    console.log("Clicking 3M Line and Service 2")

    speed_data_disel =  retrieveSpeedData(path +"/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/16_0.csv")
    speed_data_mixfleet = retrieveSpeedData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/speed_profiles/16_0.csv")

    Promise.all([speed_data_disel,speed_data_mixfleet]).then(function(overalldata){
        
    plotSpeed(overalldata)
    
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
     
       
      var trace2 = {
    
          x:  time_mixfleet,
        
          y: speed_mixfleet,
          name: 'Mix-Fleet ' ,

          mode: 'lines',
         
        
        
        };
     
      
        var data  = [trace1,trace2]

   
       
     var layout = {
     
    height: 300,
    
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

  


