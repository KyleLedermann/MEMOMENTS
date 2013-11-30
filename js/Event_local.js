

for(var i=1; i<length; i++) {
    if(i%2 == line)
        $(className).eq(i).css('backgroundColor',color);
}

function $ref(id){
	return document.getElementById(id);	
}

// Populate the database
function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS fanevent');
	tx.executeSql('CREATE TABLE IF NOT EXISTS fanevent (id AUTO_INCREMENT unique, Register, password, mobile, eventname, startdate, enddate, location, description, image)');	
}


// Transaction success callback
//
function successCB() {
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(queryDB, errorCB);
}
function verify(){

    
    var txtEvent = document.getElementById("txtEventName");
    var txtRegister = document.getElementById("txtRegister");
    var txtStartDate = document.getElementById("txtStartDate");
    var txtEndDate = document.getElementById("txtEndDate");
    var txtLocation = document.getElementById("txtLocation");
    var txtDescription = document.getElementById("txtDescription");
    var txtPassword = document.getElementById("txtPassword");


    if (txtEvent.value == "") {
        alert("plz enter EventName");
        return false;
    }
    else if (txtRegister.value == "") {
        alert("plz enter RegisterName");
        return false;
    }
    else if (txtStartDate.value == "") {
        alert("plz enter StartDate");
        return false;
    }
    else if (txtEndDate.value == "") {
        alert("plz enter EndDate");
        return false;
    }
    else if (txtLocation.value == "") {
        alert("plz enter Location");
        return false;
    }
    else if (txtDescription.value == "") {
        alert("plz enter Description");
        return false;
    }
    else if (txtPassword.value == "") {
        alert("plz enter Password");
        return false;
    }
	else{
		save();	
	}	
}

function save()
{
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(insertDB, errorCB, insertSuccess);
}

function insertDB(tx)
{
		var sqlQuery = 'INSERT INTO fanevent (Register, password, mobile, eventname, startdate, enddate, location, description, image)VALUES ("'+$ref(			"txtRegister").value+'","'+$ref("txtPassword").value+'","'+$ref("txtMobile").value+'","'+$ref("txtEventName").value+'","'+$ref("txtStartDate").value+'","'+$ref("txtEndDate").value+'","'+$ref("txtLocation").value+'","'+$ref("txtDescription").value+'","Image")';
		tx.executeSql(sqlQuery);
}

function insertSuccess() {
	alert("Data Saved");
	displayData();
}

function displayData(){
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(queryDB, errorCB);
}

// Query the database
function queryDB(tx) {
	tx.executeSql('SELECT * FROM fanevent', [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	//console.log("fanevent table: " + len + " rows found.");
	var tblData="<table>";
	for (var i=0; i<len; i++){
		//console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
		//value = "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data;
		//alert(value);
		tblData+="<tr><td>" + results.rows.item(i).Register + "</td><td>" + results.rows.item(i).password + "</td><td>" + results.rows.item(i).mobile + "</td><td>" + results.rows.item(i).eventname + "</td><td>" + results.rows.item(i).startdate + "</td><td>" + results.rows.item(i).enddate + "</td><td>" + results.rows.item(i).location + "</td><td>" + results.rows.item(i).description + "</td><td>" + results.rows.item(i).image + "</td></tr>";
	}
	tblData+="</table>";
	//var divTable=document.getElementById('divResults');	
	//divTable.innerHTML =tblData;
}

// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: "+err.code);
}
