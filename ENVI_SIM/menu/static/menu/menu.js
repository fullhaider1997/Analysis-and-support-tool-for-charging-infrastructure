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

    if("Routes"== id.toString()){

      console.log("I am clicking Routes")
       // console.log(id);
        var strMessage1 = document.getElementById("switchscreen");
       // strMessage1.innerHTML=  'test.html';
        //document.getElementById("switch-screen").innerHTML ='';
        
      //  $("#switchscreen").load("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/menu/templates/menu/test.html")

     //   $( "#switchscreen" ).load("/ENVI_SIM/menu/templates/menu/test.html", function() {
      //    alert( "Load was performed." );
      //  });
    


       $("#switchscreen").html(Routes);

     
    
    }
    if("Bus_Dashboard" == id.toString()){

      console.log("I am clicking dashboard")
      $("#switchscreen").html(DashBoard);


    console.log(id)
    }

    if ("Report" == id.toString()){

      console.log("I am clicking Report")
      $("#switchscreen").html(DashBoard);


      
    }



});



console.log("sidebardfdsfdf")


console.log("end page")