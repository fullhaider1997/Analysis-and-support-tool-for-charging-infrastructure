console.log("connecting to travel conditions.js")



$("#BYD_K9_input").click(function(){
    
    console.log("clicking byd...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)

    disel_buses_num.innerHTML = parseInt(num_byd_k9.value) +  parseInt(proterra.value) + parseInt(volvo.value)
    
});


$("#Volvo_7900_input").click(function(){
    
    console.log("clicking volv...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)

    disel_buses_num.innerHTML = parseInt(num_byd_k9.value) +  parseInt(volvo.value) + parseInt(proterra.value)
    
});


$("#Proterra_ZX5_input").click(function(){
    
    console.log("clicking proterra...")
    var disel_buses_num = document.getElementById("disel_buses_output");
    var proterra = document.getElementById("Proterra_ZX5_input");
    var volvo = document.getElementById("Volvo_7900_input");
    var num_byd_k9 = document.getElementById("BYD_K9_input");
 
    console.log(num_byd_k9.value)
    console.log(disel_buses_num)
    console.log(proterra.value)
    console.log(volvo.value)

    disel_buses_num.innerHTML = parseInt(proterra.value) +  parseInt(volvo.value) + parseInt(num_byd_k9.value)
    
});