

function retrieveCO2EmissionData(path){
    return fetch('/retrieveCO2EmissionData/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"name": path})

}).then(function (response) { 
   return response.text();

    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}


function plotTrips(ts_trips){

  data =[]
  trip_name = []
  tsv_list_new = []
  ev_list_new = []
  console.log("Plotting in envi..")
  //console.log(ts_trips)



 //  console.log(tsv_list_new)
      for (var i in ts_trips){
           tsv_list_new.push([])
          for (var j in ts_trips[i]["co2_disel_emission"])
          {
            tsv_list_new[i].push(ts_trips[i]["co2_disel_emission"][j])
          }
    }

    for (var i in ts_trips){
          ev_list_new.push([])
     for (var j in ts_trips[i]["co2_eletrical_emission"])
     {
      ev_list_new[i].push(ts_trips[i]["co2_eletrical_emission"][j])
     }
}
  
    console.log(tsv_list_new)
    console.log(ev_list_new)

    trip_name = []
  for (var i in tsv_list_new){

    console.log("envi..")
    
   
    data.push({

      x: ['Trips with disel buses'],
    
      y: tsv_list_new[i],
      name: 'Disel Trip ' + i,
      type: 'bar'
    
    
    });

    data.push({

      x: ['Trips with electric buses'],
    
      y: ev_list_new[i],
      name: 'Electic Trip ' + i ,
      type: 'bar'
    
    
    });

  

  }
 // console.log(data)
   
 var layout = {barmode: 'group' ,

 yaxis: {

  title: {

    text: 'CO2 Emission [KG]',


  }

}};


//  console.log(data)
  
  Plotly.newPlot('Enviormental_map', data,layout);
}