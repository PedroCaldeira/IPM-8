function addToTicket2(identity, nome, price){
		for(var i=0;i<price;i++)
			document.getElementById("Total").innerHTML++;
        if($("#TicketProducts").children("div").length==0){

		    BotaoCheckout.style.pointerEvents="auto";
            BotaoCheckout.style.opacity=1
            applyfilter.style.display="inline-block"

        }


	if ( $("#"+identity+"ticket").parent("#TicketProducts").length == 1 ){
		$("#"+identity+"ticket").find("input[id="+identity+"Value]")[0].value++;
        for(var i=0;i<price;i++)
            $("#"+identity+"ticket").find("span[id="+identity+"Price]")[0].innerHTML++;
	}
	else{
        var div=$('<div class="TicketIcon" id="'+identity+'ticket" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px">'+nome+'</span><div class="input-group" style="width: 130px;display: inline-table; "><span class="input-group-btn"><button type="button" class="btn btn-danger btn-number"  data-type="minus" data-field="quant[2]" onclick="removeFromTicket2('+"'"+identity+"'"+');" ><span class="glyphicon glyphicon-minus"></span></button></span><input id="'+identity+'Value"type="text" name="quant[2]" class="form-control input-number" value="1" min="-1000000" max="100"><span class="input-group-btn"><button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quant[2]" onclick="addToTicket('+"'"+identity+"'"+','+price+')"><span class="glyphicon  glyphicon-plus"></span></button></span></div> <p style="text-align:right; margin-top: 20px"><span id="'+identity+'Price" class ="TicketPrice" data-price="'+price+'">'+price+'</span> <span class="Euro">€</span><img class="redcross"src="./FoodImages/redcross.png" onclick="cleanTicketIcon('+"'"+identity+"'"+')"/></p></div>')
		$(div).insertBefore("#applyfilter");
	}
}
function addToTicket(identity,price){

	var id=identity.replace(" ","_")
	addToTicket2(id, identity,price);
}

function removeFromTicket2(id){
	var price = $("#"+id+"ticket").find("span[id="+id+"Price]")[0].getAttribute("data-price");
	for(var i=0;i<price;i++)
			document.getElementById("Total").innerHTML--;
    if ($("#"+id+"ticket").find("input[id="+id+"Value]")[0].value > 1 ){
       	$("#"+id+"ticket").find("input[id="+id+"Value]")[0].value--;

        for(var i=0;i<price;i++)
            $("#"+id+"ticket").find("span[id="+id+"Price]")[0].innerHTML--;
    }
	else{
	   	$("#"+id+"ticket").remove();
    }
    if($("#TicketProducts").children("div").length==0){
			 BotaoCheckout.style.pointerEvents="none";
             BotaoCheckout.style.opacity=0.3
             applyfilter.style.display='none'
    }
}

function cleanTicket(){
	var array= $("#TicketProducts").find("div[class^=TicketIcon]")
	for (var i = 0; i < array.length; i++){
        array.remove();
	}
	document.getElementById("Total").innerHTML=0;
    BotaoCheckout.style.pointerEvents="none";
            BotaoCheckout.style.opacity=0.3
    applyfilter.style.display='none'

}
 function cleanTicketIcon(id){
     while($("#"+id+"ticket").find("span[id="+id+"Price]")[0].innerHTML!=0){
        removeFromTicket2(id);
     }
 }


$(document).ready(function() {
        $('ul.Listagem>li').click(function() {
        	var str=$(this).find("p")[0].textContent
            var price=this.getAttribute("data-price");
        	if (str=="Criar Bebida"||str=="Criar Pizza"||str=="Menu Pizza"||str=="Menu Hamburguer"||str=="Menu Pasta"){
        		return
        	}
            addToTicket(str,price);

            adicionarPedido(str);
        });
    });

function deactivateTab(id){
    
    id.style.color="white";
    id.style.height="106px";
    if (id.id=="shoppingcart"){
        changeImage(paperticket, "./FoodImages/paperticket.png", "./FoodImages/paperticket.png")
        changeImage(arrow, "./FoodImages/down.png", "./FoodImages/down.png")
        id.style.backgroundColor='rgb(0, 162, 232)';
    }
    else if (id.id=="filterbtn"){
        changeImage(arrow1, "./FoodImages/down.png", "./FoodImages/down.png")
        id.style.backgroundColor='rgb(0, 162, 232)';
    }
    else if (id.id=="shoppingcartmusic"){
        changeImage(musicArrow, "./FoodImages/down.png", "./FoodImages/down.png");
        id.style.backgroundColor='rgb(255, 102, 102)';
        changeImage(paperticketmusic, "./MusicImages/whitequeue.png", "./MusicImages/whitequeue.png");



    }
}


function activateTab(id){
    id.style.backgroundColor="white";
    id.style.color="rgb(51,51,51)";
    id.style.height="110px";
    if (id.id=="shoppingcart"){
        changeImage(paperticket, "./FoodImages/paperticket.ico", "./FoodImages/paperticket.ico")
        changeImage(arrow, "./FoodImages/up.png", "./FoodImages/up.png")
    }
    else if (id.id=="filterbtn")
        changeImage(arrow1, "./FoodImages/up.png", "./FoodImages/up.png")
    else if (id.id=="shoppingcartmusic"){
        changeImage(musicArrow, "./FoodImages/up.png", "./FoodImages/up.png");
        changeImage(paperticketmusic, "./MusicImages/queue.png", "./MusicImages/queue.png");
    }
        
    
        
    
}

$(document).ready(function () {
    $("input[name^='Ingredient']").change(function () {
        var maxAllowed = 4;
        var cnt = $("input[name^='Ingredient']:checked").length;
        if(cnt>0){
            document.getElementById("DonePerso").style.pointerEvents="auto";
            document.getElementById("DonePerso").style.opacity=1;
            document.getElementById("DonePerso").style.backgroundColor="lightgreen";
        }
        else{
            document.getElementById("DonePerso").style.pointerEvents="none";
            document.getElementById("DonePerso").style.opacity=0.3;
        }
        if (cnt==maxAllowed){
            document.getElementById("NrIngredientes").style.color="#D20000";
            for(var i=0;i<$("input[name^='Ingredient']:not(:checked)").length;i++){
              var ele=$("input[name^='Ingredient']:not(:checked)").get(i);

              ele.disabled= "disabled";
            }
        }
        else{
            document.getElementById("NrIngredientes").style.color="white";
            for(var i=0;i<$("input[name^='Ingredient']:not(:checked)").length;i++){
              var ele=$("input[name^='Ingredient']:not(:checked)").get(i);

              ele.disabled= "";
            }
        }
        document.getElementById("NrIngredientes").textContent=cnt+'/'+maxAllowed;

    });
});



function toggleTab(){
    var id;
    for (var i = 0; i < arguments.length; i++){
        id=arguments[i];
        if (id.style.backgroundColor=="white")
            deactivateTab(id);
        else
            activateTab(id);
    }


}

$(document).ready(function() {
        $('.listFilter>li').click(function() {
            var array= $("#Filtro").find("input[id^='ch_']")
            for (var i = 0; i < array.length; i++) {
                var clas=""+array[i].getAttribute("data-class");
                hideclass(clas)
            }
            var active=0;
            for (var i = 0; i < array.length; i++) {
                if (array[i].checked){
                    active++;
                    showclass(""+array[i].getAttribute("data-class"));
                }
            }
            if (active==0){
                for (var i = 0; i < array.length; i++) {
                    var clas=""+array[i].getAttribute("data-class");
                    showclass(clas)
                }
            }
        })
    })


function changeFilter(filter){
    var array= $("#Filtro").find("ul");
    for (var i = 0; i < array.length; i++) {
        array[i].style.display="none"
    }
    filter.style.display="inline-block"
}
$(document).ready(function () {
    $("input[name^='Food']").change(function () {
        var cntFood = $("input[name^='Food']:checked").length;
		var cntDrink = $("input[name^='Bebida']:checked").length;
		var cntAcomp = $("input[name^='Acompanhamento']:checked").length;

        if(cntFood>0 && cntDrink>0 && cntAcomp>0){
            activateButton("ChooseMenu","ChooseMenu1","ChooseMenu2")
        }
        else{
            deactivateButton("ChooseMenu","ChooseMenu1","ChooseMenu2" )
        }
		if (cntFood==1){
			for(var i=0;i<$("input[name^='Food']:not(:checked)").length;i++){
			var ele=$("input[name^='Food']:not(:checked)").get(i);

			ele.disabled= "disabled";
				}
			}
		else{
			for(var i=0;i<$("input[name^='Food']:not(:checked)").length;i++){
			var ele=$("input[name^='Food']:not(:checked)").get(i);

			ele.disabled= "";
				}
			}

    });
});

$(document).ready(function () {
	$("input[name^='Bebida']").change(function () {
		var cntFood = $("input[name^='Food']:checked").length;
		var cntDrink = $("input[name^='Bebida']:checked").length;
		var cntAcomp = $("input[name^='Acompanhamento']:checked").length;
        if(cntFood>0 && cntDrink>0 && cntAcomp>0){
            activateButton("ChooseMenu","ChooseMenu1","ChooseMenu2")
        }
        else{
            deactivateButton("ChooseMenu","ChooseMenu1","ChooseMenu2" )
        }

		if(cntDrink==1){
            for(var i=0;i<$("input[name^='Bebida']:not(:checked)").length;i++){
              var ele=$("input[name^='Bebida']:not(:checked)").get(i);

              ele.disabled= "disabled";
				}
			}
		else{
			for(var i=0;i<$("input[name^='Bebida']:not(:checked)").length;i++){
			var ele=$("input[name^='Bebida']:not(:checked)").get(i);

			ele.disabled= "";
				}
			}
	});
});

$(document).ready(function () {
    $("input[name^='Acompanhamento']").change(function () {
        var cntFood = $("input[name^='Food']:checked").length;
		var cntDrink = $("input[name^='Bebida']:checked").length;
		var cntAcomp = $("input[name^='Acompanhamento']:checked").length;
        if(cntFood>0 && cntDrink>0 && cntAcomp>0){
            activateButton("ChooseMenu","ChooseMenu1","ChooseMenu2")
        }
        else{
            deactivateButton("ChooseMenu","ChooseMenu1","ChooseMenu2" )
        }
		if (cntAcomp==1){
			for(var i=0;i<$("input[name^='Acompanhamento']:not(:checked)").length;i++){
			var ele=$("input[name^='Acompanhamento']:not(:checked)").get(i);

			ele.disabled= "disabled";
				}
			}
		else{
			for(var i=0;i<$("input[name^='Acompanhamento']:not(:checked)").length;i++){
			var ele=$("input[name^='Acompanhamento']:not(:checked)").get(i);

			ele.disabled= "";
				}
			}

    });
});

$(document).ready(function () {
    $("input[name^='Ingredient']").change(function () {
        var maxAllowed = 4;
        var cnt = $("input[name^='Ingredient']:checked").length;
        if(cnt>0){
            document.getElementById("DonePerso").style.pointerEvents="auto";
            document.getElementById("DonePerso").style.opacity=1;
            document.getElementById("DonePerso").style.backgroundColor="lightgreen";
        }
        else{
            document.getElementById("DonePerso").style.pointerEvents="none";
            document.getElementById("DonePerso").style.opacity=0.3;
						document.getElementById("DonePerso").style.backgroundColor="green";
        }
        if (cnt==maxAllowed){
            document.getElementById("NrIngredientes").style.color="#D20000";
            for(var i=0;i<$("input[name^='Ingredient']:not(:checked)").length;i++){
              var ele=$("input[name^='Ingredient']:not(:checked)").get(i);

              ele.disabled= "disabled";
            }
        }
        else{
            document.getElementById("NrIngredientes").style.color="white";
            for(var i=0;i<$("input[name^='Ingredient']:not(:checked)").length;i++){
              var ele=$("input[name^='Ingredient']:not(:checked)").get(i);

              ele.disabled= "";
            }
        }
        document.getElementById("NrIngredientes").textContent=cnt+'/'+maxAllowed;

    });
});

$(document).ready(function () {
    $("input[name^='PizzaIngredient']").change(function () {
        var maxAllowed = 6;
        var cnt = $("input[name^='PizzaIngredient']:checked").length;
        if(cnt>0){
            document.getElementById("DonePersoPizza").style.pointerEvents="auto";
            document.getElementById("DonePersoPizza").style.opacity=1;
            document.getElementById("DonePersoPizza").style.backgroundColor="lightgreen";
        }
        else{
            document.getElementById("DonePersoPizza").style.pointerEvents="none";
            document.getElementById("DonePersoPizza").style.opacity=0.3;
			document.getElementById("DonePersoPizza").style.backgroundColor="green";
        }
        if (cnt==maxAllowed){
            document.getElementById("NrIngredientesPizza").style.color="#D20000";
            for(var i=0;i<$("input[name^='PizzaIngredient']:not(:checked)").length;i++){
              var ele=$("input[name^='PizzaIngredient']:not(:checked)").get(i);

              ele.disabled= "disabled";
            }
        }
        else{
            document.getElementById("NrIngredientes").style.color="white";
            for(var i=0;i<$("input[name^='PizzaIngredient']:not(:checked)").length;i++){
              var ele=$("input[name^='PizzaIngredient']:not(:checked)").get(i);

              ele.disabled= "";
            }
        }
        document.getElementById("NrIngredientesPizza").textContent=cnt+'/'+maxAllowed;

    });
});

$(window).load(function(){
    hide(Music);
    document.getElementById("Music").style.marginTop="0px";
})



function unselect(name){
	
	var ing=$("input[name^="+name+"]:checked")

	for(var i=0;i<ing.length;i++){

			ing.get(i).checked= "";
				}
	for(var i=0;i<$("input[name^="+name+"]:not(:checked)").length;i++){
			var ele=$("input[name^="+name+"]:not(:checked)").get(i);

			ele.disabled= "";
				}
	document.getElementById("NrIngredientes").textContent="0/4";
	document.getElementById("NrIngredientes").style.color="white";
	document.getElementById("NrIngredientesPizza").textContent="0/6";
	document.getElementById("NrIngredientesPizza").style.color="white";
    deactivateButton("DonePerso", "DonePersoPizza","ChooseMenu","ChooseMenu1","ChooseMenu2" )

}

function addCustom(id, nome,price) {
	var array=$(id).find("input:checked");
	var newId=""
	for (var i = 0; i < array.length; i++) {
		newId+=array[i].value
	}
	addToTicket2(newId, nome,price);

}
function showMenu(menuType){
	if (menuType=="Menu Pizza"){
		$("#JanelaMenu").prepend('<div class="PersonalizacaoBackground" id= "PersonalizacaoBackground"><div id="TopPart"><img class="backarrow" src="../GlobalImages/backarrow.png" on click="toggleVisible(EscolhaIngredientes)"/><span id="MenuTitle">Menu Pizza</span><span id="ChooseMenu" class="DoneButton" style=" pointer-events:none;opacity:0.3;color:black;">Escolher</span></div><div id="ContentMenu"><div id="MainDish"><div class="PlaceTitle"> Escolha a Pizza</div><ul class="IngredientList"><li><input id="Ingrediente1" type="checkbox" name="Food" value="jQuery" /><label for="Ingrediente1" ><img class="IngredienteImage" src="./FoodImages/vodka-cola.png"  /><br>Coca-cola</label></li><li><input id="Ingrediente2"type="checkbox" name="Food" value="Coca-Cola" /> <label for="Ingrediente2" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente3" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente3" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente4" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente4" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente5" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente5" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente6" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente6" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente7" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente7" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente8" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente8" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente9" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente9" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente10" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente10" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente11" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente11" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente12" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente12" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li></ul></div>')
	}
	if (menuType=="Menu Hamburguer"){
		document.getElementById("JanelaMenu").prepend('<div class="PersonalizacaoBackground" id= "PersonalizacaoBackground"><div id="TopPart"><img class="backarrow" src="../GlobalImages/backarrow.png" on click="toggleVisible(EscolhaIngredientes)"/><span id="MenuTitle">Menu Hamburguer</span><span id="ChooseMenu" class="DoneButton" style=" pointer-events:none;opacity:0.3;color:black;">Escolher</span></div><div id="ContentMenu"><div id="MainDish"><div class="PlaceTitle"> Escolha a Pizza</div><ul class="IngredientList"><li><input id="Ingrediente1" type="checkbox" name="Food" value="jQuery" /><label for="Ingrediente1" ><img class="IngredienteImage" src="./FoodImages/vodka-cola.png"  /><br>Coca-cola</label></li><li><input id="Ingrediente2"type="checkbox" name="Food" value="Coca-Cola" /> <label for="Ingrediente2" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente3" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente3" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente4" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente4" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente5" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente5" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente6" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente6" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente7" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente7" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente8" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente8" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente9" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente9" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente10" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente10" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente11" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente11" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente12" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente12" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li></ul></div>')
	}
	if (menuType=="Menu Pasta"){
		document.getElementById("JanelaMenu").prepend('<div class="PersonalizacaoBackground" id= "PersonalizacaoBackground"><div id="TopPart"><img class="backarrow" src="../GlobalImages/ow.png" on click="toggleVisible(EscolhaIngredientes)"/><span id="MenuTitle">Menu Pasta</span><span id="ChooseMenu" class="DoneButton" style=" pointer-events:none;opacity:0.3;color:black;">Escolher</span></div><div id="ContentMenu"><div id="MainDish"><div class="PlaceTitle"> Escolha a Pizza</div><ul class="IngredientList"><li><input id="Ingrediente1" type="checkbox" name="Food" value="jQuery" /><label for="Ingrediente1" ><img class="IngredienteImage" src="./FoodImages/vodka-cola.png"  /><br>Coca-cola</label></li><li><input id="Ingrediente2"type="checkbox" name="Food" value="Coca-Cola" /> <label for="Ingrediente2" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente3" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente3" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente4" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente4" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente5" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente5" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente6" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente6" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente7" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente7" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente8" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente8" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente9" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente9" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente10" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente10" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente11" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente11" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li><li><input id="Ingrediente12" type="checkbox" name="Food" value="7 Up" /><label for="Ingrediente12" ><img class="FoodImage" src="./FoodImages/vodka-cola.png"  /><br>Cenas</label></li></ul></div>')
	}

	show(document.getElementById(menuType))
}



function activateButton(){
    for (var i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).style.pointerEvents="auto";
            document.getElementById(arguments[i]).style.opacity=1;
            document.getElementById(arguments[i]).style.backgroundColor="lightgreen";
    }
}
function deactivateButton(){
    for (var i = 0; i < arguments.length; i++) {
            document.getElementById(arguments[i]).style.pointerEvents="none";
            document.getElementById(arguments[i]).style.opacity=0.3;
            document.getElementById(arguments[i]).style.backgroundColor="green";
    }
}

function addToQueue2(identity, nome){
    var div=$('<div class="QueueIcon" id="'+identity+'" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px">'+nome+'</span></div>')
    $("#Qsongs").append(div);
}

function addToQueue(){
    var identity=document.getElementById("photos-name").innerHTML;
    var id=identity.replace(" ","_");
    for(var i=0;i<20;i++)
        id=id.replace(" ","_");
    
    console.log($("#"+id).parent("#Qsongs").length);
    console.log(("#"+id));
    if ( $("#"+id).parent("#Qsongs").length == 0 ){
           
        addToQueue2(id, identity);
    }
}


$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#","");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
});

$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#","");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
});
