
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
    return fetch('/retrieveTripID/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { // At this point, Flask has printed our JSON
  return response.text();
    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}




function plotEnergy(data){



    console.log(data)
   
    energy = []
    trip_id = []
  
    
    for(var i in data[0][0]){
         trip_id.push(data[0][0][i])
    }


    for(var i in data[0][1]){
          energy.push(data[0][1][i])
      }
      
    
      console.log(trip_id)
      console.log(energy)
      trip_id.shift()
      energy.shift()
      console.log(trip_id)
      console.log(energy)
      var data = [

        {
      
          x: trip_id,
      
          y: energy,
      
          type: 'bar'
      
        }
      
      ];
      
        
     var layout = {
     
      height: 300,
      
       yaxis: {
      
        title: {
      
          text: 'Energy_consumped',
      
        },
        xaxis: {
            title: { 
                text:'Per Trip',
                
  
  
        }}
      
      }};
      
      
      Plotly.newPlot('energy_plot', data,layout);
      
        
  
     
}

     

