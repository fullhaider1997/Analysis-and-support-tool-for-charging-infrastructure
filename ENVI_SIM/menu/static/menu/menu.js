console.log("helloss")

const menu = document.getElementById("menu")
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")





let menuOpen = false;


function openMenu(){

    menuOpen = true
  
    sidebar.style.width="200px"
}

function closeMenu(){

    menuOpen = false
   
    sidebar.style.width="0px"
}




menu.addEventListener("click", function(){

   if(!menuOpen){
     openMenu()
   }else{
     closeMenu()
   }


})



$("#sidebar a").click(function() {
   
    var id = $(this).attr("id");


    if("Routes".toString(id)){

        console.log(id);
        var strMessage1 = document.getElementById("switchscreen");
       // strMessage1.innerHTML=  'test.html';
        //document.getElementById("switch-screen").innerHTML ='';
        
     //  $("#switchscreen").htmlSheet("menu/test.html")
       strMessage1.innerHTML = "Routes"

     
    
    }
    else if("Charging-stations".toString(id)){

      $("#switch-screen").load("<div> Charging stations </div>")
    console.log(id)
    }
    else if ("Report".toString(id)){

       $("#switch-screen").load("<div> Report</div>")
       console.log(id)
    }

});



console.log("sidebardfdsfdf")


console.log("end page")