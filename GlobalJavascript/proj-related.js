

var ana = 0;
var avicii = 0;
var jason = 0;
var mc = 0;
var metallica = 0;
var pink = 0;



function EraseContent(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}



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
        $('ul.Listagem>li').click(function(evt) {
            if(evt.target.className == "Favorite")
                return;
        	var str=$(this).find("p")[0].textContent
            var price=this.getAttribute("data-price");
            if ($(this).hasClass("calcool")){
                var alcoolemia=document.getElementById("NumeroAlcoolemia").innerHTML
                var limite= document.getElementById("limiteActual").innerHTML
                if (alcoolemia>=limite && limite!=0 ){
                    $().toastmessage('showToast', {
                        text     : 'Bebida não adicionada, ja ultrapassou o limite de alcool estabelecido',
                        type     : 'error',
                        position : 'middle-right',
                        stayTime : 3000
                    });
                    return;
                }
            }
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
        id.style.backgroundColor='rgb(41, 140, 44)';
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
            $(".Listagem>li").hide()
            var array= $("#Filtro").find("input[id^='ch_']")
            var items=$(".Listagem>li")
            console.log(items.length)
            for (var i = 0; i < items.length; i++) {
                var shown=true
                for (var j = 0; j < array.length; j++) {
                    if(!$(items[i]).hasClass(array[j].getAttribute("data-class"))&& array[j].checked)
                        shown=false;
                }
                if (shown)
                    $(items[i]).show();
            }
            /*
            var array= $("#Filtro").find("input[id^='ch_']")
            for (var i = 0; i < array.length; i++) {
                var clas=""+array[i].getAttribute("data-class");
                hideclass(clas)
            }
            //var active=0;
            for (var i = 0; i < array.length; i++) {
                if (array[i].checked){
                    console.log(""+array[i].getAttribute("data-class"))
                    showclass(""+array[i].getAttribute("data-class"));
                }
            }
            if (active==0){
                for (var i = 0; i < array.length; i++) {
                    var clas=""+array[i].getAttribute("data-class");
                    showclass(clas)
                }
            }
        */$(".Personalizavel").show()
    })
    })


function changeFilter(filter){
    var array= $("#Filtro").find("ul");
    $(".Listagem>li").show()
    var checks= $("#Filtro").find("input[id^='ch_']")
    for (var i = 0; i < checks.length; i++) {
        $(checks[i]).attr("checked", false)
    }
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
    if($("#Qsongs").children("div").length==0)
        var div=$('<div class="QueueIcon" id="'+identity+'" style="display:inline-block ; text-align: left !important; margin-left:10px"><span id="NomeMusica" style=" position: relative; left: 10px">'+nome+'</span><br><span style="float:left">4:20</span><span style="font-weight: 800;float:right;right:20px;position:relative;color: green;z-index:10000">  NOW PLAYING</span></div><hr>')
    else if($("#Qsongs").children("div").length==1)
        var div=$('<div class="QueueIcon" id="'+identity+'" style="display:inline-block ; text-align: left !important; margin-left:10px"><span id="NomeMusica" style=" position: relative; left: 10px">'+nome+'</span><br><span style="font-weight: 800;float:right;right:20px;position:relative;color: #03A9F4;">UP NEXT</span></div><hr>')
    else
        var div=$('<div class="QueueIcon" id="'+identity+'" style="display:inline-block ; text-align: left !important; margin-left:10px"><span id="NomeMusica" style=" position: relative; left: 10px">'+nome+'</span></div><hr>')
    $("#Qsongs").append(div);
}

function addToQueue(){
    var identity=document.getElementById("photos-name").innerHTML;
    var id=identity.replace(" ","_");
    for(var i=0;i<20;i++)
        id=id.replace(" ","_");

    if ( $("#"+id).parent("#Qsongs").length == 0 ){

        addToQueue2(id, identity);
        adicionarMusica();
    }
    else
        NaoadicionarMusica()
}
function addToQueueFromTop(identity){
    var id=identity.replace(" ","_");
    for(var i=0;i<20;i++)
        id=id.replace(" ","_");

    if ( $("#"+id).parent("#Qsongs").length == 0 ){

        addToQueue2(id, identity);
        adicionarMusica();
    }
    else
        NaoadicionarMusica()
}

function upVoteSong(){
    var isUpVoted=$(".cover.current").find("img").attr("data-UpVoted")
    var isDownVoted=$(".cover.current").find("img").attr("data-DownVoted")
    var valor= parseInt($(".cover.current").find("img").attr("data-voting"))
    var name=$(".cover.current").attr("data-song")
    //Is DownVoted, becomes upVoted
    if (isDownVoted=="true"){
        $(".cover.current").find("img").attr("data-DownVoted","false")
        $(".cover.current").find("img").attr("data-UpVoted","true")
        $(".cover.current").find("img").attr("data-voting",valor+2);
        $("#ValueOfVote").text(valor+2);
        $($("#musicList").find("div[data-song^="+name+"]").children()[0]).attr("data-voting",valor+2)
        $("#DownVoteImage").css("border","none");
        $("#UpVoteImage").css("border","3px gold solid");
        return
    }
    //Is UpVoted, becomes not Voted
    else if (isUpVoted=="true"){
        $(".cover.current").find("img").attr("data-UpVoted","false")

        $("#ValueOfVote").text(valor-1);
        $($("#musicList").find("div[data-song^="+name+"]").children()[0]).attr("data-voting",valor-1)
        $(".cover.current").find("img").attr("data-voting",valor-1);
        $("#DownVoteImage").css("border","none");
        $("#UpVoteImage").css("border","none");
        return
    }
    //Not yet Voted, becomes Upvoted
    else{
       $(".cover.current").find("img").attr("data-UpVoted","true")
        $("#ValueOfVote").text(valor+1);
        $($("#musicList").find("div[data-song^="+name+"]").children()[0]).attr("data-voting",valor+1)
        $(".cover.current").find("img").attr("data-voting",valor+1);
        $("#DownVoteImage").css("border","none");
        $("#UpVoteImage").css("border","3px gold solid");
    }
}
function downVoteSong(){
    var isUpVoted=$(".cover.current").find("img").attr("data-UpVoted")
    var isDownVoted=$(".cover.current").find("img").attr("data-DownVoted")
    var valor= parseInt($(".cover.current").find("img").attr("data-voting"))
    var name=$(".cover.current").attr("data-song")
    //Is Already DownVoted, becomes not voted
    if (isDownVoted=="true"){
        $(".cover.current").find("img").attr("data-DownVoted","false")
        $(".cover.current").find("img").attr("data-voting",valor+1);
        $("#ValueOfVote").text(valor+1);
        $($("#musicList").find("div[data-song^="+name+"]").children()[0]).attr("data-voting",valor+1)
        $("#DownVoteImage").css("border","none");
        $("#UpVoteImage").css("border","none");
        return
    }
    //Is UpVoted, becomes Downvoted
    else if(isUpVoted=="true"){
        $(".cover.current").find("img").attr("data-DownVoted","true")
        $(".cover.current").find("img").attr("data-UpVoted","false")
        $("#ValueOfVote").text(valor-2);
        $($("#musicList").find("div[data-song^="+name+"]").children()[0]).attr("data-voting",valor-2)
        $(".cover.current").find("img").attr("data-voting",valor-2);
        $("#DownVoteImage").css("border","3px gold solid");
        $("#UpVoteImage").css("border","none");
    }
    //Not yet voted, becomes downVoted
    else{
        $(".cover.current").find("img").attr("data-DownVoted","true")
        $("#ValueOfVote").text(valor-1);
        $($("#musicList").find("div[data-song^="+name+"]").children()[0]).attr("data-voting",valor-1)
        $(".cover.current").find("img").attr("data-voting",valor-1);
        $("#DownVoteImage").css("border","3px gold solid");
        $("#UpVoteImage").css("border","none");
    }
}

function createOrderedList(){
    var array = $("#musicList").find("div");
    array.splice(-1,1);
    array.sort(sortingFunction);
    for (var i=0;i<array.length; i++) {
        var name = $(array[i]).find("img").attr("data-name");
        var votes = $(array[i]).find("img").attr("data-voting");
        if(i==0)
            $("#TopSongsShow").append("<div  class='topSong' id='firstSong'><span>"+(i+1)+"º : "+name+" ("+votes+")</span><br><img class='AddButtonQueue' id='AddButtonQueue1st' src='./MusicImages/Sign-Add-icon.png' onclick='addToQueueFromTop("+'"'+name+'"'+");'/></div>");
        else if(i==1)
            $("#TopSongsShow").append("<div  class='topSong' id='secondSong'><span>"+(i+1)+"º : "+name+" ("+votes+")</span><br><img class='AddButtonQueue' id='AddButtonQueue2nd' src='./MusicImages/Sign-Add-icon.png' onclick='addToQueueFromTop("+'"'+name+'"'+");'/></div>");
        else if(i==2)
            $("#TopSongsShow").append("<div class='topSong' id='thirdSong'><span>"+(i+1)+"º : "+name+" ("+votes+")</span> <br><img class='AddButtonQueue' id='AddButtonQueue3rd' src='./MusicImages/Sign-Add-icon.png' onclick='addToQueueFromTop("+'"'+name+'"'+");'/></div>");
        else
            $("#TopSongsShow").append("<div class='topSong'><span>"+(i+1)+"º : "+name+" ("+votes+")</span><br><img class='AddButtonQueue' src='./MusicImages/Sign-Add-icon.png' onclick='addToQueueFromTop("+'"'+name+'"'+");'/></div>");

    }
}

function sortingFunction(cover1,cover2){
    return $($(cover2).find("img")).attr("data-voting")-$($(cover1).find("img")).attr("data-voting");
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


function searchCover(){
    var term = document.getElementById("search_concept").innerHTML.toLowerCase();
    var input = document.getElementById("searchBox").value.toLowerCase();
    for(var i=0;i<20;i++)
        input=input.replace(" ","_");
    $(".coverflow").empty();

    if (input==""){
        var result= $("#musicList").find("div");
        for (var i=0; i<result.length;i++)
            $("#lecover").append(result[i].cloneNode(true))
        $("#lecover").coverflow("refresh");
        return;
    }
    if (term=="musica")
        term="song"
    else if (term=="artista")
        term="artist"
    else if (term=="genero")
        term="genre";
    else if (term=="album")
        term="album"
    else if (term=="qualquer"){
        var result= $("#musicList").find("div");
        var j=0;
        for (var i=0; i<result.length;i++){

            if ($(result[i]).data('album').indexOf(input) != -1 ||$(result[i]).data('artist').indexOf(input) != -1  ||$(result[i]).data('genre').indexOf(input) != -1  ||$(result[i]).data('song').indexOf(input) != -1	  ){
                $("#lecover").append(result[i].cloneNode(true));
                j++;
            }

        }
        $("#lecover").coverflow({index:0})

        if (j==0){
					$("#lecover").append(document.getElementById("noResults").cloneNode(true))
        document.getElementById("addMusic").disabled=true;
        document.getElementById("addMusic").style.opacity=0.0;
        document.getElementById("DownVoteImage").style.display="none"
        document.getElementById("UpVoteImage").style.display="none"
        document.getElementById("ValueOfVote").style.display="none"
        }
        else{
        document.getElementById("addMusic").disabled=false;
        document.getElementById("addMusic").style.opacity=1;
        document.getElementById("DownVoteImage").style.display="inline-block"
        document.getElementById("UpVoteImage").style.display="inline-block"
        document.getElementById("ValueOfVote").style.display="inline-block"
        }
				$("#lecover").coverflow("refresh");
        return;
    }
    var result= $("#musicList").find("div[data-"+term+"^="+input+"]");


    for (var i=0; i<result.length; i++)
        $("#lecover").append(result[i].cloneNode(true))

    if (result.length==0){
				$("#lecover").append(document.getElementById("noResults").cloneNode(true))
        document.getElementById("addMusic").disabled=true;
        document.getElementById("addMusic").style.opacity=0.0;
        document.getElementById("DownVoteImage").style.display="none"
        document.getElementById("UpVoteImage").style.display="none"
        document.getElementById("ValueOfVote").style.display="none"
    }
    else{
        document.getElementById("addMusic").disabled=false;
        document.getElementById("addMusic").style.opacity=1;
        document.getElementById("DownVoteImage").style.display="inline-block"
        document.getElementById("UpVoteImage").style.display="inline-block"
        document.getElementById("ValueOfVote").style.display="inline-block"
     }
		 $("#lecover").coverflow("index",0)
    $("#lecover").coverflow("refresh");
}


function cancelSearch(){
     var term = document.getElementById("search_concept").innerHTML.toLowerCase();
    var input = document.getElementById("searchBox").value.toLowerCase();

    $(".coverflow").empty();

    var result= $("#musicList").find("div");
    for (var i=0; i<result.length;i++){
			if($(result[i]).data('album')!="notFound")
        $("#lecover").append(result[i].cloneNode(true))}
    $("#lecover").coverflow("refresh");
    var term = document.getElementById("searchBox").value="";
    $(".coverflow").coverflow("index",10);
    document.getElementById("searchResetButton").style.pointerEvents="none";
    document.getElementById("searchResetButton").style.opacity=0.0;
    document.getElementById("addMusic").disabled=false;
    document.getElementById("addMusic").style.opacity=1;
    document.getElementById("DownVoteImage").style.display="inline-block"
    document.getElementById("UpVoteImage").style.display="inline-block"
    document.getElementById("ValueOfVote").style.display="inline-block"

}
function enableErase(){
    var input = document.getElementById("searchBox").value.toLowerCase();
    
    if (input!=""){
        
        document.getElementById("searchResetButton").style.pointerEvents="auto";
        document.getElementById("searchResetButton").style.opacity=1;
    }
}



function changeName(){
    var name= $("#profileInfo").find("input[name='first_name']").val();

    if (name!= ""){
        $("#profilename").html(name);
        $("#profilename2").html(name);
        $(".Name").html(name);
    }
}

function changeName1(){
    var name= $("#profileInfo1").find("input[name='first_name']").val();

    if (name!= ""){
        $("#profilename").html(name);
        $("#profilename2").html(name);
        $(".Name").html(name);
    }
    Bemvindo(name);

    hide(wrapper1);
}

function unlock(){
    var x = document.getElementById("NumeroAlcoolemia").innerHTML;
    var y = document.getElementById("EcraPerfil3").getAttribute("data-state");
    if(y==1){
        if (x>0.5){
            show(DesbloquearInsucesso);
        }
        else{
            show(DesbloquearSucesso);
            $("#EcraPerfil3").attr("data-state","0");
            DesbloquearChaves.style.pointerEvents="none";
            DesbloquearChaves.style.opacity=0.3;
            BloquearChaves.style.pointerEvents="auto";
            BloquearChaves.style.opacity=1;
        }
    }
}

function unlock2(){
    var x = document.getElementById("NumeroAlcoolemia").innerHTML;
    var y = document.getElementById("EcraPerfil3").getAttribute("data-state");
    if(y==1){
        if (x>0.5){
            show(DesbloquearInsucesso2);
        }
        else{
            show(DesbloquearSucesso2);
            $("#EcraPerfil3").attr("data-state","0");
            DesbloquearChaves.style.pointerEvents="none";
            DesbloquearChaves.style.opacity=0.3;
            BloquearChaves.style.pointerEvents="auto";
            BloquearChaves.style.opacity=1;
        }
    }
}

function lock1(){
    var y = document.getElementById("EcraPerfil3").getAttribute("data-state");
    if(y==0)
        show(ConfirmarBloquear);
}

function lock2(){
    $("#EcraPerfil3").attr("data-state","1");
    BloquearChaves.style.pointerEvents="none";
    BloquearChaves.style.opacity=0.3;
    DesbloquearChaves.style.pointerEvents="auto";
    DesbloquearChaves.style.opacity=1;
}

function checkColorKeys(){
     var x = document.getElementById("NumeroAlcoolemia").innerHTML;
     if(x>0.5){
        document.getElementById("KeysCircle").style.backgroundColor="#FF2525";
     }
     else{
        document.getElementById("KeysCircle").style.backgroundColor="#00e600";
     }

     setTimeout('checkColorKeys()',100);

}

function limit(){
    var alcoolemia=document.getElementById("NumeroAlcoolemia").innerHTML
    var limit= document.getElementById("limiteActual").innerHTML
    var sliderLimit=$( "#slider-BAC" ).slider( "value" );

    var sliderHourLimit=$( "#slider-HOUR" ).slider( "value" );

    if (sliderHourLimit!=0){
        document.getElementById("timelimiter").innerHTML=sliderHourLimit
        $( "#slider-HOUR" ).slider({
              range: "min",
              value: 0.00,
              min: sliderHourLimit,
              max: 7,
              step: 1,
              slide: function( event, ui ) {
                $( "#Hours" ).val( ui.value +" horas");
              }
            });
            $( "#Hours" ).val( $( "#slider-HOUR" ).slider( "value" )+ " horas");
    }
    var HourLimit=document.getElementById("timelimiter").innerHTML
    if (sliderLimit!=0){


            $("#limiteActual").html(sliderLimit.toFixed(2));
            if (HourLimit==0) {sliderLimit=3}
            $( "#slider-BAC" ).slider({
              range: "min",
              value: 0.00,
              min: 0.00,
              max: sliderLimit,
              step: 0.01,
              slide: function( event, ui ) {
                $( "#BAC" ).val( ui.value.toFixed(2) +"g/L");
              }
            });
            $( "#BAC" ).val( $( "#slider-BAC" ).slider( "value" ).toFixed(2) +"g/L" );

    }
}

function calculateAlcool(){
    var alcoolemia=document.getElementById("NumeroAlcoolemia").innerHTML
    $("#NivelAlcool").html(alcoolemia)
    var tempo= (alcoolemia*4).toFixed(0)
    $("#RemainingTime").html(tempo)
}
 function checkTransportes(){
    var x = document.getElementById("NumeroAlcoolemia").innerHTML;
    var y = document.getElementById("EcraPerfil3").getAttribute("data-state");
    var currentTime = document.getElementsByClassName("Time")[0].innerHTML.split(":")
    var hours = currentTime[0];

    document.getElementById("Carro").style.backgroundColor="#00e600";
    BotaoCarro.style.pointerEvents="auto";
    BotaoCarro.style.opacity=1;
    DesbloquearChaves.style.pointerEvents="auto";
    DesbloquearChaves.style.opacity=1;
    document.getElementById("Autocarro").style.backgroundColor="#00e600";
    BotaoAutocarro.style.pointerEvents="auto";
    BotaoAutocarro.style.opacity=1;
    document.getElementById("TransporteRecomendado").src="./ProfileImages/carro.png";
    document.getElementById("TransporteRecomendado").style.height="100%";
    document.getElementById("TransporteRecomendado").style.width="100%";
    document.getElementById("TransporteRecomendado").style.marginTop="-50px";
    if(x>0.5 && (hours<5 || hours>=20)){
        document.getElementById("Carro").style.backgroundColor="#FF2525";
        BotaoCarro.style.pointerEvents="none";
        BotaoCarro.style.opacity=0.3;
        DesbloquearChaves.style.pointerEvents="none";
        DesbloquearChaves.style.opacity=0.3;
        document.getElementById("Autocarro").style.backgroundColor="#FF2525";
        BotaoAutocarro.style.pointerEvents="none";
        BotaoAutocarro.style.opacity=0.3;
        document.getElementById("TransporteRecomendado").src="./ProfileImages/taxi.png";
        document.getElementById("TransporteRecomendado").style.height="100%";
        document.getElementById("TransporteRecomendado").style.width="100%";
        document.getElementById("TransporteRecomendado").style.marginTop="10px";
    }
    else if(x>0.5){
        document.getElementById("Carro").style.backgroundColor="#FF2525";
        BotaoCarro.style.pointerEvents="none";
        BotaoCarro.style.opacity=0.3;
        DesbloquearChaves.style.pointerEvents="none";
        DesbloquearChaves.style.opacity=0.3;
        document.getElementById("TransporteRecomendado").src="./ProfileImages/autocarro.png";
        document.getElementById("TransporteRecomendado").style.height="75%";
        document.getElementById("TransporteRecomendado").style.width="75%";
        document.getElementById("TransporteRecomendado").style.marginTop="25px";

    }
    else if(hours<5 || hours>=20){
        document.getElementById("Autocarro").style.backgroundColor="#FF2525";
        BotaoAutocarro.style.pointerEvents="none";
        BotaoAutocarro.style.opacity=0.3;
    }

    if(y==0){
        BotaoCarro.style.pointerEvents="none";
        BotaoCarro.style.opacity=0.3;
        DesbloquearChaves.style.pointerEvents="none";
        DesbloquearChaves.style.opacity=0.3;
    }
    setTimeout('checkTransportes()',100);


}

function TimeTaxi(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    minutes+=20;
    if(minutes>60){
        minutes-=60;
        hours++;

    }
    if(hours<10)
      hours="0"+hours;
    if (minutes<10)
      minutes="0"+minutes;
    document.getElementById("TempoChegadaTaxi").innerHTML = hours+":"+minutes;
}

function TimeHelicoptero(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    minutes+=5;
    if(minutes>60){
        minutes-=60;
        hours++;

    }
    if(hours<10)
      hours="0"+hours;
    if (minutes<10)
      minutes="0"+minutes;
    document.getElementById("TempoChegadaHelicoptero").innerHTML = hours+":"+minutes;

}

function limpar(){
    $("#profilename").html("O Seu Nome");
    $("#profilename2").html("O Seu Nome");
    $(".Name").html("O Seu Nome");
    document.getElementById("nomeLogin").value="";
    document.getElementById("ProfilePicture").src="./ProfileImages/anonimo.png";
    document.getElementById("ProfilePicture2").src="./ProfileImages/anonimo.png";

}

function changeProfilePic(){
    document.getElementById("ProfilePicture").src="./ProfileImages/crespo.jpg";
    document.getElementById("ProfilePicture2").src="./ProfileImages/crespo.jpg";
}
function randomizeAlcool(){
    var RandomNumber=Math.random(0,3)
    var randomrounded= Math.round(RandomNumber * 100) / 100;
    document.getElementById("NumeroAlcoolemia").innerHTML=randomrounded
}

function toggleFavorite(x){
    var parent = $(x).parent();
    var nome = $(parent).find("p")[0].innerHTML;
    var identity = nome.replace(" ","_");
    var identity2 = ""
    changeImage(x,'./FoodImages/star.png','./FoodImages/nostar.png');
    if(x.src.split("/").pop()=="star.png"){
      var div=$('<div class="FavoriteIcon" id="'+identity+'favorite" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px">'+nome+'</span> <p style="text-align:right; margin-top: -20px"><img class="redcross"src="./FoodImages/redcross.png" onclick="removeFromFavorites('+"'"+identity+"'"+')"/></p></div>');
      $("#ListagemFavoritosFood").append(div);



    }
    else if(x.src.split("/").pop()=="nostar.png"){
        $("#"+identity+"favorite").remove();
    }



}

function toggleFavoriteMusic(){
    var isFavourite=$(".cover.current").find("img").attr("data-favorite")
    var favouriteIcon=document.getElementById("favouriteMusicIcon")
    var nome =$(".cover.current").find("img").attr("data-name")
    var identity = nome.replace(" ","_");
    var result= $("#musicList").find("div");
    var musicListImage;
    for(var i=0; i<result.length;i++){
        if($(result[i]).find("img").attr("data-name")==nome){
            musicListImage=$(result[i]).find("img")
            
        }
    }
    for(var i=0;i<20;i++)
        identity=identity.replace(" ","_");
        
    changeImage(favouriteIcon,"./ProfileImages/favorites.ico",'./FoodImages/nostar.png');
    if(favouriteIcon.src.split("/").pop()=="favorites.ico"){
      musicListImage.attr("data-favorite","true")
      $(".cover.current").find("img").attr("data-favorite","true")
      var div=$('<div class="FavoriteIcon" id="'+identity+'favorite" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px;">'+nome+'</span> <p style="text-align:right; margin-top: -20px"><img class="redcross"src="./FoodImages/redcross.png" onclick="removeFromFavoritesMusic('+"'"+identity+"'"+')"/></p></div>');
      $("#ListagemFavoritosMusica").append(div);



    }
    else if(favouriteIcon.src.split("/").pop()=="nostar.png"){
        $(".cover.current").find("img").attr("data-favorite","false")
        musicListImage.attr("data-favorite","false")
        $("#"+identity+"favorite").remove();
    }
}

function removeFromFavoritesMusic(id){
    
    var result= $("#musicList").find("div");
    for(var i=0; i<result.length;i++){
        if($(result[i]).find("img").attr("data-name")==$("#"+id+"favorite").find("span")[0].innerHTML){
            $(result[i]).find("img").attr("data-favorite","false")
        }
    }
    var result= $("#lecover").find("div");
    for(var i=0; i<result.length;i++){
        if($(result[i]).find("img").attr("data-name")==$("#"+id+"favorite").find("span")[0].innerHTML){
            $(result[i]).find("img").attr("data-favorite","false")
            if($(".cover.current").find("img").attr("data-name")==$("#"+id+"favorite").find("span")[0].innerHTML)
                changeImage(document.getElementById("favouriteMusicIcon"),"./ProfileImages/favorites.ico",'./FoodImages/nostar.png');
        }
    }
    
    $("#"+id+"favorite").remove();
}



function removeFromFavorites(id){
    $("#"+id+"favorite").remove();
}

function addToHistoryMusic(){
    var nome=$(".cover.current").find("img").attr("data-name")
    var identity=nome.replace(" ","_")
    for(var i=0;i<20;i++)
        identity=identity.replace(" ","_");
    var div=$('<div class="FavoriteIcon" id="'+identity+'History" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px;">'+nome+'</span> <p style="text-align:right; margin-top: -20px"><img class="redcross"src="./FoodImages/redcross.png" onclick="removeFromHistoryMusic('+"'"+identity+"'"+')"/></p></div>');
    $("#HistoricoMusica").append(div);
}
function removeFromHistoryMusic(id){
    $("#"+id+"History").remove();
    
}
var alternate=0;

function addToHistoryFood(){
    var children = $("#TicketProducts").find("div");
    var tam = children.length;
    for(var i=0;i<tam;i+=2){
        var clone = $(children[i]).clone();
        console.log(clone);
        var nome=$(clone[0]).find("span")[0].innerHTML;
        var num = $(clone[0]).find("input")[0].value;
        console.log(nome);
        var identity=nome.replace(" ","_");
        if(num>1){
            nome +=" x "+num;
            var div=$('<div class="FavoriteIcon" id="'+identity+'History" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px">'+nome+'</span> <p style="text-align:right; margin-top: -20px"><img class="redcross"src="./FoodImages/redcross.png" onclick="removeFromHistoryFood('+"'"+identity+"'"+')"/></p></div>');
        }
        else
            var div=$('<div class="FavoriteIcon" id="'+identity+'History" style="display:inline-block ; text-align: left !important;"><span style=" position: relative; top:25px; left: 10px">'+nome+'</span> <p style="text-align:right; margin-top: -20px"><img class="redcross"src="./FoodImages/redcross.png" onclick="removeFromHistoryFood('+"'"+identity+"'"+')"/></p></div>');
        console.log(div)
        
        if(alternate==0){
            div[0].style.backgroundColor="#99ccff";
        }
        else{
            div[0].style.backgroundColor="#3399ff";
        }
        $("#HistoricoFood").append(div[0]);
    }
    if(alternate==0)
        alternate++;
    else
        alternate--;
}

function removeFromHistoryFood(id){
    $("#"+id+"History").remove();
}



function checkFood(){
    var x = document.getElementById("NumeroAlcoolemia").innerHTML;
    var y = document.getElementById("EcraPerfil3").getAttribute("data-state");
    if($("#Q").find("span[id^=NomeMusica]").length!=0){
        var z = $("#Q").find("span[id^=NomeMusica]")[0].innerHTML;
        var artist = z.split(" ")[0];

        var currentTime = document.getElementsByClassName("Time")[0].innerHTML.split(":")
        var hours = currentTime[0];

        var d = document.getElementsByClassName("Recommended");
            for(var i=0;i<d.length;i++){
                d[i].style.display="none";
                d[i].src="./FoodImages/recommended.png";
            }

        if(artist=="Metallica" && (hours>=20 || hours<=5)){
            var c = document.getElementsByClassName("metallica");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }

        else if(artist=="Ana" && (hours>=20 || hours<=5)){
            var c = document.getElementsByClassName("ana");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }
        else if(artist=="Pink" && (hours>=20 || hours<=5)){
            var c = document.getElementsByClassName("pink");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }
        else if(artist=="Avicii" && (hours>=20 || hours<=5)){
            var c = document.getElementsByClassName("avicii");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }
        else if(artist=="Avicii" && (hours<=20 && hours>=5)){
            var c = document.getElementsByClassName("jason");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }
        else if(artist=="Jason"){
            var c = document.getElementsByClassName("jason");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }
        else{
            var c = document.getElementsByClassName("jason");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
        }
    }
    else{
        var c = document.getElementsByClassName("avicii");
            for(var i=0;i<c.length;i++){
                c[i].style.display="block";
                c[i].src="./FoodImages/recommended.png";
            }
    }
    setTimeout('checkFood()',1000);

}
function confirmLimit(){
    var aux= document.getElementById("settingsLimit")
    aux.innerHTML=$( "#slider-BAC" ).slider( "value" ) + " g/L";
    aux=document.getElementById("settingsTime")
    aux.innerHTML=$( "#slider-HOUR" ).slider( "value" ) + " horas";
}


function FilterRecommended(){
    var array= document.getElementsByClassName("Recommended")
    var recbtn=document.getElementById("recbtn")
    var favbtn=document.getElementById("favbtn")
    favbtn.style.backgroundColor="#00A2E8"
    $('.Listagem>li').show()
    if (recbtn.style.backgroundColor!="white"){
        recbtn.style.backgroundColor="white"
        for (var i = 0; i < array.length; i++) {
            
            if (array[i].style.display!="block"){
                console.log(array[i].style.display)
                $(array[i]).parent().hide()
            }
        }
    }
    else{
        recbtn.style.backgroundColor="#00A2E8";
    }
}

function FilterFavorite(){
    var array= document.getElementsByClassName("Favorite")
    var favbtn=document.getElementById("favbtn")
    var recbtn=document.getElementById("recbtn")
    var arrayPers= document.getElementsByClassName("Personalizavel")
    console.log(arrayPers)
    recbtn.style.backgroundColor="#00A2E8"
    $('.Listagem>li').show()
    if (favbtn.style.backgroundColor!="white"){
        favbtn.style.backgroundColor="white"
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].src.split("/").pop())
            if (array[i].src.split("/").pop()=="nostar.png"){
                $(array[i]).parent().hide()
            }
        }
        for (var i = 0; i < arrayPers.length; i++) {
            console.log(arrayPers[i])
            $(arrayPers[i]).hide();
        }
            
    }
    else{
        favbtn.style.backgroundColor="#00A2E8";
    }
}

function toggleShow(x,id){
    help=document.getElementById(id);
    if(help.style.display=='none'){
        x.style.backgroundColor="#0066ff";
        $(help).show();
    }
    else{
        x.style.backgroundColor="#cce6ff";
        $(help).hide();
    }
}

function toggleShow2(id){
    help=document.getElementById(id);
    if(help.style.display=='none'){
        $(help).show();
    }
    else{
        $(help).hide();
    }
}