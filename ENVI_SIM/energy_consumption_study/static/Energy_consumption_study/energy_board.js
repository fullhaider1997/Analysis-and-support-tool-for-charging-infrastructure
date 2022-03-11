console.log("Energy consumption is started")
var energy_consumption_s =[]
var time_s =[]
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

$("#routes_id li").click(function() {

  console.log("Clicking on selection of routes")
      
  var button = document.getElementById("dropdown_button")
  var id = $(this).attr("id");
  button.innerHTML = id;
  console.log(id)

  if(id == "Mainline 1"){
    console.log("Clicking on Maineline 2")
    data = getData("C:/Users/fullh/Downloads/TS_1_0.csv")
    data1 = getData("C:/Users/fullh/Downloads/TS_1_1.csv")
    data2 = getData("C:/Users/fullh/Downloads/TS_1_2.csv")
    data3 = getData("C:/Users/fullh/Downloads/TS_1_3.csv")
    Promise.all([data,data1,data2,data3]).then(function(results){
      plot(results)
      
      
    });
    

  } else if(id == "Line 2"){
    console.log("Clicking on line 2")
    data= getData("C:/Users/fullh/Downloads/TS_2_0.csv")
    data1= getData("C:/Users/fullh/Downloads/TS_2_1.csv")
    data2= getData("C:/Users/fullh/Downloads/TS_2_2.csv")
    Promise.all([data,data1,data2]).then(function(results){
      plot(results)
      
    });
    

  } else if(id == "3M Line"){

    console.log("Clicking on 3M")
    data= getData("C:/Users/fullh/Downloads/TS_3M_0.csv")
    data1= getData("C:/Users/fullh/Downloads/TS_3M_1.csv")
    data2= getData("C:/Users/fullh/Downloads/TS_3M_2.csv")
    data3= getData("C:/Users/fullh/Downloads/TS_3M_3.csv")
    Promise.all([data,data1,data2,data3]).then(function(results){
      plot(results)
      
    });

  }

   
});

function getData(path){
    return fetch('/hello/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
  return response.text();
    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}



function plot(results){

       // data = JSON.parse(results)
       var list_time = []
       var list_time_new = []
       var list_consumption = []
       var list_consumption_new = []
       var data =[]
       /*
       console.log(results[0])
       console.log(results[1])
    
        console.log(results[0][4])
       console.log(results[1][4])
      console.log("First output")
         console.log(results[0][8])
        console.log(results[1][8])
        console.log("First output")
           */
       

        for (var i in results){
          console.log("here too:" + i)
          console.log(i)
          list_time.push(results[i][4])

          list_consumption.push(results[i][8])
          console.log(results[i][8])
        }

        console.log("time: ")
        console.log(list_time[0])
        console.log(list_time[1])
        console.log(list_time)
        console.log("consumption: ")
        console.log(list_consumption[0])
        console.log(list_consumption[1])
 
     for(var i in list_time) {
    
      //  console.log(list_time[i]) 
        list_time_new.push([]) 
        
        
        for (var j in list_time[i]){
          console.log(list_time[i][j])
          split = list_time[i][j].split("->")
         // console.log(split)
          list_time_new[i].push(split[0])

        }
        
      }
      console.log("New time here: ")
      console.log(list_time_new)
      console.log("old consumption here: ")
      console.log(list_consumption[1])
      console.log(list_consumption[0])


/*
      
     for(var i in list_consumption) {
    
      console.log(list_consumption[i]) 
     
      
    }



      console.log(list_time_new[0])
      console.log(list_time_new[1])

      /*
      console.log("flag3")
      console.log(list_time_new)
       
        for (var key in energy_consumption ){
          console.log (energy_consumption[key])
          split = energy_consumption[key].split("->")
          console.log(split[0])
          energy_consumption_s.push(split[0])
        }
        

        var data = [ ];
        console.log(list_consumption_new[0])
        console.log(list_consumption_new[1])

        
     */
        console.log("Consumption in details..")
      //  list_consumption=JSON.parse(list_consumption);
      for(var i in list_consumption) {
    
        //  console.log(list_time[i]) 
        list_consumption_new.push([]) 
          for (var j in list_consumption[i]){
           console.log(list_consumption[i][j])
           list_consumption_new[i].push(list_consumption[i][j])
            
          
  
          }
        }
        for (var i in list_consumption_new){

          console.log("Consumption..")
          console.log(list_consumption_new[i])
          

          data.push({

            x: [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
          
            y: list_consumption_new[i],
          
            type: 'scatter',
            mode: 'marker',
            name: 'Trip ' + i
          
          });

        }
        
       console.log(data)
    


        var layout = {
          

          height: 350,
          
        
          title:'Consumption vs time',
          xaxis: {
            title: 'Time (hrs)',
            tick0: 6,
            dtick: .50,
            ticklen: 22
        
          },
          yaxis: {
            title: 'Energy consumption (kw/h)',
            
        
          },
 
         
          
          
        
        };
        Plotly.newPlot('plot', data,layout);

     

      }

  

console.log("data: " + data)



/*

var trace2 = {

  x: [2, 3, 4, 5],

  y: [16, 5, 11, 9],

  mode: 'scatter',

  name: 'Trip 2'

};


var trace3 = {

  x: [1, 2, 3, 4],

  y: [12, 9, 15, 12],

  mode: 'scatter',

  name: 'Trip 3'

};
*/




