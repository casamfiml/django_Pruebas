function showFWA()
{
	// if(clicked==1)
	// {
	// 	document.getElementById("input-container").classList.remove("hidden");
	// 	document.getElementById("radius-input").classList.add("hidden");
	// 	document.getElementById("radius-input").required = false;
	// }
}
function showBusiness()
{
	if(clicked==1)
	{
		//document.getElementById("input-container").classList.remove("hidden");
		document.getElementById("radio").classList.remove("hidden");
		//document.getElementById("radius-input").required;
	}
}
function calculate()
{
	if(document.getElementById("radius-input").classList.contains("hidden"))
	{
		//alert("hello");
//        console.log("click");
//        lat= $('#lat-input').val();
//        lon= $('#lon-input').val();
//        self = $(this);
//        $.ajaxSetup({
//            headers:{"X-CSRFToken": getCookie("csrftoken") }
//        })
//        $.ajax({
//            method: 'POST',
//            type: 'post',
//            url: 'prueba_Funcionalidad',
//            cache:false,
//            data:{
//                'lat':lat,
//                'lon':lon,
//                name: self.find("#resultado").val(),
//            },
//            dataType: "json",
//                beforeSend: function () {
//                        $("#resultado").html("Procesando, espere por favor...");
//                        setTimeout(function(){mostrarAviso()},3000);
//                },
//                success:  function (response) {
//                        $("#resultado").html(response.name);
//                        django_message("Pony saved successfully.", "success");
//                }
//        })
	}
	else
	{
		alert("good bye");
	}
}
//function mostrarAviso(){
//    //$("#resultado").html("Disponible");
//    alert("disponible")
//    $("#resultado").html("");
//}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }






function showLatLong(marker)
{
	document.getElementById("latitud").value = marker.position.lat();
	//document.getElementById("latitud").classList.add("ng-valid ng-touched ng-not-empty ng-dirty ng-valid-parse");
	document.getElementById("longitud").value = marker.position.lng();
	angular.element(jQuery('#latitud')).triggerHandler('input');
	angular.element(jQuery('#longitud')).triggerHandler('input');
	//document.getElementById("longitud").classList.add("ng-valid ng-touched ng-not-empty ng-dirty ng-valid-parse");
	//document.getElementById("btnDelete").classList.remove("hidden");
	//document.getElementsByTagName("latitud").value = marker.position.lat();
}
function deletePoint()
{
	clearMarkers();
	clicked = 0;
	labelIndex=0;
	document.getElementById("latitud").value = "";
	document.getElementById("longitud").value = "";
	document.getElementById("radius-input").value = "";
	document.getElementById("btnDelete").classList.add("hidden");
	document.getElementById("input-container").classList.add("hidden");
}
function calculateRadius()
{
	console.log("onkeydown");
	deleteCircle(0);
	var radius = document.getElementById("radio").value;
	if(radius=="")
	{
		radius = 0;
	}
	radius = parseInt(radius);
	console.log("radius:"+radius);
	if(radius>5000)
	{
		radius = 5000;
	}
	document.getElementById("radio").value = radius;
	for(i=0;i<markers.length;i++)
	{
		drawCircle(i,radius);
	}
}
function apply_form_field_error(fieldname, error) {
    var input = $("#id_" + fieldname),
        container = $("#div_id_" + fieldname),
        error_msg = $("<span />").addClass("help-inline ajax-error").text(error[0]);

    container.addClass("error");
    error_msg.insertAfter(input);
}

function clear_form_field_errors(form) {
    $(".ajax-error", $(form)).remove();
    $(".error", $(form)).removeClass("error");
}