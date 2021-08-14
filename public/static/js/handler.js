function getMilaapInfo(){
$.get("https://asia-southeast1-sumo-f96ee.cloudfunctions.net/milaapInfo", function(data, status){
    console.log(data);
	var obj = JSON.parse(data)
	$('#milaapinfo').text("We have raised " + obj.amount + " from " + obj.supporters + " supporters")
  });

}

getMilaapInfo()