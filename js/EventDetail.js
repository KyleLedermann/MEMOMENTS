/* 
Date : 2013-10-31
Created By : Pratik
Description : This is javascript to View Event Detail.

*/


function dispEventData(id) {
  
    var content = document.getElementById("eventdetail");
    var pageMethod = "http://mirannara.dothome.co.kr/A-team/EventDetail.php?id=" + id;
    //alert(pageMethod);

    $.ajax({
        type: "GET", url: pageMethod, timeout: 5000, dataType: "json",
        success: function (data) {
            if (data.myJson == "err") {
                alert("failed");
                return false;
				go_open('page');
            } else {
                var ss = "";
				var fromDate = data.myJson[0].fromDate;
				var toDate = data.myJson[0].endDate;
				ss += "<table>";
				ss += "<tr style='text-align:center;'><td colspan='2'><img src=http://mirannara.dothome.co.kr/A-team/Upload/"+ data.myJson[0].Image +" width=150 height=150></td></tr>";
				ss += "<tr><td colspan='2' style='font-size:11px;font-weight: bold;'>Event Name</td></tr>";
                ss += "<tr><td colspan='2'>" + data.myJson[0].EventName + "</td></tr>";
				ss += "<tr><td style='font-size:11px;font-weight: bold;'> Event Start from :</td><td>" + fromDate.substr(0,10) +"</td></tr>";
				ss += "<tr><td style='font-size:11px;font-weight: bold;'>Event End on :</td><td>" + toDate.substr(0,10)+ "</td></tr>";
				ss += "<tr><td colspan='2' style='font-size:11px;font-weight: bold;'>Contact</td></tr>";
				ss += "<tr><td colspan='2'>"+data.myJson[0].Register+"  :  "+data.myJson[0].Mobile +"</td></tr>";
				ss += "<tr><td colspan='2' style='font-size:11px;font-weight: bold;'>Event Location</td></tr>";
				ss += "<tr><td colspan='2'>"+ data.myJson[0].Location+"</td></tr>";
				ss += "</table>";
				
				content.innerHTML = ss;
				
				$("#view_location").attr("onClick", "go_open('page5');eventLocation('"+data.myJson[0].Location+"');")
				//alert(ss);
            }
        },
        error: function (xhr, status, error) {
            if (status == "timeout") {
                alert("failed due to timeout");
            } 
			/*
			else {
                alert("Server is down. Please Try later");
				go_open('page');
            }*/
        }
    });
    go_open("page4");
}