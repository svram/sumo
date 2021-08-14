function getMilaapInfo(){
$.get("https://udg01ouey2.execute-api.ap-southeast-1.amazonaws.com/milaapInfo", function(data, status){
    console.log(data);
	var obj = JSON.parse(data)
	$('#milaapinfo').text("We have raised " + obj.amount + " from " + obj.supporters + " supporters")
  });

}

getMilaapInfo()