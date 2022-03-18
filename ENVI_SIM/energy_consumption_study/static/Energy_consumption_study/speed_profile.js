

console.log("I am connected speed dashboard.js")



$("#routes_id li").click(function() {

    console.log("Clicking on selection of routes:speed")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)


    if(id == "Mainline 1"){

        console.log("Clicking on Maineline 2")
        trip_1 = retrieveTripID("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/Fall/TS_1_0.csv")
      
        trip_data =  retrieveSpeedData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/trip_data.csv")
        
      

        Promise.all([trip_data,trip_1]).then(function(data){
          plotSpeed(data)
          
        });
    }








});

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




  function plotSpeed(overalldata){

    console.log("first data")
    console.log(overalldata)
    console.log("after")

  
    trip_data = overalldata[0]
     overalldata.shift();
    only_trip_id = overalldata
    console.log("trip_data")
    console.log(trip_data)
    console.log("trip_id")
    console.log(trip_id)  
    
    console.log("each trip id")
    for(var index in  only_trip_id ){
        for (var j in  only_trip_id[index]){

              console.log( only_trip_id[index][j])
        }
    }
    

   
   
 
    var time = trip_data["arrival_time"]
    var speed = trip_data["speed"]
    var trip_id = trip_data["trip_id"]
    
    var group_data = {}
    var data = []
    console.log(time)
    console.log(speed)
    console.log(trip_id)
 
    var old_trip_id = trip_id[291]
    var index = 0

    
    for(var id in trip_id){
        data.push( {
            "trip_id": trip_id[id],
            "speed": speed[id],
            "time": time[id]
        })
    }
    console.log(data)
    const groupByCategory = data.reduce((group, product) => {
        const { trip_id } = product;
        group[trip_id] = group[trip_id] ?? [];
        group[trip_id].push(product);
        return group;
      }, {});


    console.log("------------------------------")
    console.log(groupByCategory)
    console.log("------------------------------")
    console.log("------------------------------")
    console.log(groupByCategory["135674:299591"])
    console.log("------------------------------")

    console.log("List of all micro trips...")

    var mainline1_trip_id = []
    var mainline1_speed = []
    var mainline1_time = []
    var mainline1 = []
    
    for(var index in only_trip_id ){
        
        for (var j in only_trip_id[index]){

              console.log(groupByCategory[only_trip_id[index][j]])
              mainline1.push(groupByCategory[only_trip_id[index][j]])
        }
         //console.log("micro trips: " + only_trip_id[index][j] )
         //console.log("micro trips: " + only_trip_id[index][j] )
         //console.log("micro trips: " + only_trip_id[index][j] )
    
        
    }


    console.log("--------------------------------")
     console.log(mainline1)
     console.log(mainline1[0])
     console.log("-------------------------------")
     console.log(mainline1[0][0]["trip_id"])
     console.log(mainline1[0][0]["speed"])
     console.log(mainline1[0][0]["time"])

     var sum = 0
     for(var i in mainline1){
        
        num = mainline1[i].length
        sum = sum + num

     }
     console.log("Sum is " + sum)



  for(var index in mainline1){
       console.log("--- ")
     //  mainline1_speed.push([])
      // mainline1_time.push([])
      // mainline1_trip_id.push([])
      for (var j in mainline1[index]){
       // console.log(mainline1[index][j])
        mainline1_speed.push(mainline1[index][j]["speed"])
        mainline1_time.push(mainline1[index][j]["time"])
        mainline1_trip_id.push(mainline1[index][j]["trip_id"])
      }
      
  }

   console.log("------------")
    console.log(mainline1_speed)
    console.log(mainline1_time)
    console.log(mainline1_trip_id)
   console.log("------------")


       
        data.push({
    
          x:  mainline1_time,
        
          y: mainline1_speed,
          name: 'micro-trips ' ,

          mode: 'lines',
          marker: {

            color: 'rgb(219, 64, 82)',
        
        
          }
        
        
        
        });
     
    

   
       
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


