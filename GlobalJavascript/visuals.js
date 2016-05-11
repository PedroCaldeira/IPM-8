function hide(){
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].style.display='none';
	}
}

function hideclass(id){
	$("."+id).hide();
}

function show(){
      for (var i = 0; i < arguments.length; i++)
		arguments[i].style.display='block';

}

function showclass(id){
	$("."+id).show();
}

function toggleVisible() {

    for (var i = 0; i < arguments.length; i++)
		$(arguments[i]).slideToggle(300);
  }

function changeImage(img, newimage, oldimage){


    if (img.src.split("/").pop()==newimage.split("/").pop()){
      img.src=oldimage;
    }
    else{
      img.src=newimage;
    }
  }

function enableblur(){
	for (var i = 0; i < arguments.length; i++){
		el=arguments[i];
		el.style.webkitFilter = "blur(20px)"
		el.style.pointerEvents="none";
	}

}
function disableblur(){

	for (var i = 0; i < arguments.length; i++){
		el=arguments[i];
		el.style.webkitFilter = "blur(0px)";
		el.style.pointerEvents="auto";
	}
}
