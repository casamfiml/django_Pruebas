function showFWA()
{
	document.getElementById("input-container").classList.remove("hidden");
	document.getElementById("radius-input").classList.add("hidden");
}
function showBusiness()
{
	document.getElementById("input-container").classList.remove("hidden");
	document.getElementById("radius-input").classList.remove("hidden");
	document.getElementById("radius-input").required;
}
function calculate()
{
	if(document.getElementById("radius-input").classList.contains("hidden"))
	{
		alert("hello");
	}
	else
	{
		alert("good bye");
	}
}
function showLatLong(marker)
{
	document.getElementById("lat-input").value = marker.position.lat();
	document.getElementById("lon-input").value = marker.position.lng();
	document.getElementById("btnDelete").classList.remove("hidden");
}
function deletePoint()
{
	clearMarkers();
	clicked = 0;
	labelIndex=0;
	document.getElementById("lat-input").value = "";
	document.getElementById("lon-input").value = "";
	document.getElementById("radius-input").value = "";
	document.getElementById("btnDelete").classList.add("hidden");
}
function calculateRadius()
{
	console.log("onkeydown");
	deleteCircle(0);
	var radius = document.getElementById("radius-input").value;
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
	document.getElementById("radius-input").value = radius;
	for(i=0;i<markers.length;i++)
	{
		drawCircle(i,radius);
	}
}
