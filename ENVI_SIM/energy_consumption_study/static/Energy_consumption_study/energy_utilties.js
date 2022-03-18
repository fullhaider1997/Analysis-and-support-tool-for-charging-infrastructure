
START_TIME = 5
END_TIME = 6
FINAL_SOC = 11
INI_SOC = 10

function retrieveEnergyData(path){
    return fetch('/retrieveEnergyData/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
  return response.text();
    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}


function retrieveSpeedData(path){
    return fetch('/retrieveSpeedData/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
  return response.text();
    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}

function retrieveTripID(path){
    return fetch('//', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
  return response.text();
    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}




function plotEnergy(trips_data){

    
    var list_time = []
    var list_time_new = []
    var list_consumption = []
    var list_consumption_new = []
    var data = []

    var start_time = []
    var end_time = []
    var final_soc =[]
    var start_soc = []
    var time = [[]]
    var soc = [[]]
   
    

    console.log(trips_data)
    start_time = getValues(trips_data, START_TIME)
    end_time = getValues(trips_data, END_TIME)
    final_soc = getValues(trips_data, FINAL_SOC)
    start_soc = getValues(trips_data, INI_SOC)
  
  
    start_time.forEach((start_time_array, index_arr)=>{
        var end_time_array = end_time[index_arr]
        console.log((start_time_array,end_time_array))
        time.push([])
        console.log(time)
        start_time_array.forEach((start_time_element, index_arr_2) =>{
               var  end_time_element = end_time_array[index_arr_2]
                 console.log(end_time_element, start_time_element)
                 time[index_arr].push(start_time_element,end_time_element)

        });


    });

    start_soc.forEach((start_soc_array, index_arr)=>{
        var final_soc_array = final_soc[index_arr]
        console.log((start_soc_array,final_soc_array))
        soc.push([])
        console.log(soc)
        start_soc_array.forEach((start_soc_element, index_arr_2) =>{
               var  final_soc_element = final_soc_array[index_arr_2]
                 console.log(final_soc_element, start_soc_element)
                 soc[index_arr].push(start_soc_element,final_soc_element)

        });

    });



    console.log(time)
    console.log(soc)

    sync_time = []

    for(var i =6; i<23; i++){
        sync_time.push(i)
    }
 
    
     for(var i= 0; i < time.length; i++) {
       
        data.push({
    
          x: sync_time,
        
          y: soc[i],
          name: 'eBus ' + i,
          type: 'scatter'
        
        
        });
     }
      
    
     
   
       
     var layout = {
     
    height: 340,
    
     yaxis: {
    
      title: {
    
        text: 'SOC(%)',
    
    
      },
      xaxis: {
          title: { 
              text:'Time',
              showgrid: true,
              tick0: 6,
              dtick: 0.10,
              autotick: true,

             ticklen: 23,


      }}
    
    }};
    
   
      Plotly.newPlot('energy_plot', data,layout);
    
        
  
     
   }


   function getValues(json_array,element_index){
   
    new_list = []
    for (var i in json_array){
        new_list.push([])
        for (var j in json_array[i][element_index])
            {
              new_list[i].push(json_array[i][element_index][j])
            }

            //Remove the first element: Its the name of column
            new_list[i].shift();
      }

     

     return new_list
   }