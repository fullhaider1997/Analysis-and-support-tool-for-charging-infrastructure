

console.log("I am connected speed dashboard.js")



/

$("#routes_id li").click(function() {

    console.log("Clicking on selection of routes:speed")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)

    //speed_data_disel =  retrieveDataSet("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")
   // speed_data_mixfleet = retrieveSpeedData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/output/diesel_only_assignments/speed_profiles/")

    if(id == "Mainline 1"){

          
      list_tripset = ["Service 1","Service 2","Service 3","Service 4"]
      
      var dyn_trip_set1 = document.createElement("li");
      var dyn_trip_set2 = document.createElement("li");
      var dyn_trip_set3 = document.createElement("li");
      var dyn_trip_set4 = document.createElement("li");  
      dyn_trip_set1.classList.add("tripset");
      dyn_trip_set2.classList.add("tripset");
      dyn_trip_set3.classList.add("tripset");
      dyn_trip_set4.classList.add("tripset");
      dyn_trip_set1.innerHTML = "Service 1"
      dyn_trip_set2.innerHTML = "Service 2"
      dyn_trip_set3.innerHTML = `<li id="Mainline 2"><a>Mainline 2</a></li>`
      dyn_trip_set4.innerHTML = `<li id="Mainline 1"><a>Mainline 1</a></li>`
      document.getElementById("tripset_id").appendChild(dyn_trip_set1)
      document.getElementById("tripset_id").appendChild(dyn_trip_set2)
      document.getElementById("tripset_id").appendChild(dyn_trip_set3)
      document.getElementById("tripset_id").appendChild(dyn_trip_set4)
    



      }else if(id == "2 Line"){

        list_tripset = ["Service 1","Service 2","Service 3"]
       
  
        for(var trip in list_tripset){
          var dyn_trip_set = document.createElement("li");
          dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }

      } else if(id == "3C Line"){

        list_tripset = ["Service 1","Service 2","Service 3","Service 4"]
        
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }

      }else if(id == "3M Line"){

        list_tripset = ["Service 1","Service 2","Service 3","Service 4"]
        dyn_trip_set.classList.add("tripset");
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }



      }else if(id == "4 Line"){
        list_tripset = ["Service 1","Service 2","Service 3","Service 4","Service 5"]
        dyn_trip_set.classList.add("tripset");
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }


      }else if(id == "5 Line"){
        list_tripset = ["Service 1"]
        dyn_trip_set.classList.add("tripset");
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }

      } else if(id == "6 Line"){

        list_tripset = ["Service 1"]
        dyn_trip_set.classList.add("tripset");
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }


      } else if (id =="7 Line"){
        list_tripset = ["Service 1"]
       
  
        for(var trip in list_tripset){
           var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }

      } else if (id == "8 Line"){

        list_tripset =  ["Service 1","Service 2","Service 3"]
        
  
        for(var trip in list_tripset){
          var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }


      } else if (id =="9 Line"){

        list_tripset =  ["Service 1","Service 2","Service 3"]
        
  
        for(var trip in list_tripset){
          
           var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }


      } else if (id == "10 Line"){

        list_tripset =  ["Service 1","Service 2"]
        
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }


      }else if (id == "11 Line"){

        list_tripset =  ["Service 1"]
        
  
        for(var trip in list_tripset){
           var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }


      }else if (id == "12 Line"){

        list_tripset =  ["Service 1"]
        
  
        for(var trip in list_tripset){
           var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }
      }else if (id == "13 Line"){

        list_tripset =  ["Service 1"]
       
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }
      }else if (id == "14 Line"){

        list_tripset =  ["Service 1","Service 2"]
        dyn_trip_set.classList.add("tripset");
  
        for(var trip in list_tripset){
          
           var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }

      }else if (id == "17 Line"){

        list_tripset =  ["Service 1"]
       
  
        for(var trip in list_tripset){
            var dyn_trip_set = document.createElement("li");
            dyn_trip_set.classList.add("tripset");
            dyn_trip_set.innerHTML = list_tripset[trip]
            document.getElementById("tripset_id").appendChild(dyn_trip_set)
        }




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

  


