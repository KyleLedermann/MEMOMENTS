
		
		 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //Open or create the database
	 function onDeviceReady() {
	 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
	pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
	}
    var db=openDatabase('contacts','1.0','my contacts app', 2 * 1024 * 1024);
    //Initialize the database
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement, firstname, lastname, phonenumber)');
    })
    
    function addContact() {
      var inputFirstName=document.getElementById("firstname").value;
      var inputLastName=document.getElementById("lastname").value;
      var inputPhoneNumber=document.getElementById("phonenumber").value;
      
      db.transaction(function(tx) {
        tx.executeSql('INSERT INTO contacts(firstname,lastname,phonenumber) VALUES (?,?,?)',[inputFirstName,inputLastName,inputPhoneNumber], function(tx, results) {
          //Create the row and its cells
          var contactRow=document.createElement("tr");
          var id=document.createElement("td");
          var firstname=document.createElement("td");
          var lastname=document.createElement("td");
          var phonenumber=document.createElement("td");
          var removeButton=document.createElement("td");
          //Set values coming from the database
          id.textContent=results.insertId;
          firstname.textContent=inputFirstName;
          lastname.textContent=inputLastName;
          phonenumber.textContent=inputPhoneNumber;
          removeButton.innerHTML='<button onclick="removeContact('+ results.insertId +')">Delete</button>';
          //Add cells to the row
          contactRow.setAttribute("id","c"+results.insertId);
          contactRow.appendChild(id);
          contactRow.appendChild(firstname);
          contactRow.appendChild(lastname);
          contactRow.appendChild(phonenumber);
          contactRow.appendChild(removeButton);
          //Add the row to the table
          document.getElementById("contacts").appendChild(contactRow);
        });
      });
    }
    
    function removeContact(id) {
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM contacts WHERE id=?', [id], function() {
          //Dynamically remove the deleted contact from the table
          var contactTable=document.getElementById("contacts");
          var contactToDelete=document.getElementById("c"+id);
          contactTable.removeChild(contactToDelete);
        });
      });
    }
    
    function listContacts() {
      db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM contacts', [], function(tx, results) {
          var len=results.rows.length;
          var i;
          for(i=0; i<len; i++) {
            //Create the row and its cells
            var contactRow=document.createElement("tr");
            var id=document.createElement("td");
            var firstname=document.createElement("td");
            var lastname=document.createElement("td");
            var phonenumber=document.createElement("td");
            var removeButton=document.createElement("td");
            //Set values coming from the database
            id.textContent=results.rows.item(i).id;
            firstname.textContent=results.rows.item(i).firstname;
            lastname.textContent=results.rows.item(i).lastname;
            phonenumber.textContent=results.rows.item(i).phonenumber;
            removeButton.innerHTML='<button onclick="removeContact('+ results.rows.item(i).id +')">Delete</button>';
            //Add cells to the row
            contactRow.setAttribute("id","c"+results.rows.item(i).id);
            contactRow.appendChild(id);
            contactRow.appendChild(firstname);
            contactRow.appendChild(lastname);
            contactRow.appendChild(phonenumber);
            contactRow.appendChild(removeButton);
            //Add the row to the table
            document.getElementById("contacts").appendChild(contactRow);
          }
        });
      });
    }
    
    window.addEventListener("load", listContacts, true);