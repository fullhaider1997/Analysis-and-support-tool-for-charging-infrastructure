console.log("connecting to travel conditions.js")

  


let byd = $('#BYD_K9_input').val();
let vlv = $('#Volvo_7900_input').val();
let pro = $('#Proterra_ZX5_input').val();

$("#BYD_K9_input").on("change",function(){
    

   var disel_buses_num = document.getElementById("disel_buses_output");
   var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");

   if($(this).val() > byd){
        //incrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - 1 

    }else{
       //decrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) + 1 
    }

    byd = $(this).val();
    console.log("byd_k9 value : " + value)

   /*
    console.log("clicking byd...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)
  
      console.log("nova: " + parseInt(disel_buses_num.innerHTML))
      console.log("byd: " + parseInt(num_byd_k9.value))
      console.log("proteraa: " + parseInt((proterra.value)))
      console.log("volvo: " + parseInt((volvo.value)))
      
      console.log("nova: " + parseInt(disel_buses_num.innerHTML))

     // disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - byd -  parseInt(proterra.value) - parseInt(volvo.value)
     
    */



    
});


$("#Volvo_7900_input").on("change",function(){
    
   var disel_buses_num = document.getElementById("disel_buses_output");
   var proterra = document.getElementById("Proterra_ZX5_input");
   var volvo = document.getElementById("Volvo_7900_input");
   var num_byd_k9 = document.getElementById("BYD_K9_input");


   if($(this).val() > vlv){
      //incrementing
      disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - 1 

  }else{
     //decrementing
      disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) + 1 
  }

   console.log("volv value : " + vlv)
   vlv = $(this).val();

/*
    console.log("clicking volv...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)

    //disel_buses_num.innerHTML = - vlv - parseInt(disel_buses_num.innerHTML) -parseInt(num_byd_k9.value)  -  parseInt(proterra.value) 

  */
    
   
    
});


$("#Proterra_ZX5_input").click(function(){
    
   
   var disel_buses_num = document.getElementById("disel_buses_output");
   var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");

   if($(this).val() > pro){
        //incrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) - 1 

    }else{
       //decrementing
        disel_buses_num.innerHTML = parseInt(disel_buses_num.innerHTML) + 1 
    }

    pro = $(this).val();
    console.log("byd_k9 value : " + pro)

    
   // disel_buses_num.innerHTML = - parseInt(volvo.value) - parseInt(disel_buses_num.innerHTML) - parseInt(num_byd_k9.value)  -  pro 

   
     
    
});