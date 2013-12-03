
		
		 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //Open or create the database
	 function onDeviceReady() {
	 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
	pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
	}
    var db=openDatabase('contacts','1.0','my contacts app', 20000000);
    //Initialize the database
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement, title, description, phonenumber, largeImage BLOB)');
    })
    
    function addContact() {
      var inputTitle=document.getElementById("title").value;
      var inputDescription=document.getElementById("description").value;
      var inputPhoneNumber=document.getElementById("phonenumber").value;
	  var inputlargeImage=document.getElementById("largeImage").src;
      
      db.transaction(function(tx) {
        tx.executeSql('INSERT INTO contacts(title,description,phonenumber, largeImage) VALUES (?,?,?,?)',[inputTitle,inputDescription,inputPhoneNumber, inputlargeImage], function(tx, results) {
          //Create the row and its cells
          var contactRow=document.createElement("tr");
          var id=document.createElement("td");
          var title=document.createElement("td");
          var description=document.createElement("td");
          var phonenumber=document.createElement("td");
		  var largeImage=document.createElement("td");
          var removeButton=document.createElement("td");
          //Set values coming from the database
          id.textContent=results.insertId;
          title.textContent=inputtitle;
          description.textContent=inputLastName;
          phonenumber.textContent=inputPhoneNumber;
		  largeImage.innerHTML='<img src"' + results.insertId + '">';
		  //largeImage.textContent=inputlargeImage;
          removeButton.innerHTML='<button onclick="removeContact('+ results.insertId +')">Delete</button>';
          //Add cells to the row
          contactRow.setAttribute("id","c"+results.insertId);
          contactRow.appendChild(id);
          contactRow.appendChild(title);
          contactRow.appendChild(description);
          contactRow.appendChild(phonenumber);
		  contactRow.appendChild(largeImage);
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
            var title=document.createElement("td");
            var description=document.createElement("td");
            var phonenumber=document.createElement("td");
			var largeImage=document.createElement("td");
            var removeButton=document.createElement("td");
            //Set values coming from the database
            id.textContent=results.rows.item(i).id;
            title.textContent=results.rows.item(i).title;
            description.textContent=results.rows.item(i).description;
            phonenumber.textContent=results.rows.item(i).phonenumber;
			largeImage.textContent=results.rows.item(i).largeImage;
			//largeImage.textContent=results.rows.item(i).largeImage;
			//largeImage.innerHTML='<img src"' + results.rows.item(i).largeImage + '">';
			//smallImage.innerHTML='<img src"' + getPhoto(results.rows.item(i).id.smallImage) +'">';
			//smallImage.innerHTML='<img src="'+ results.rows.item(i).smallImage +'">';
            removeButton.innerHTML='<button onclick="removeContact('+ results.rows.item(i).id +')">Delete</button>';
            //Add cells to the row
            contactRow.setAttribute("id","c"+results.rows.item(i).id);
            contactRow.appendChild(id);
            contactRow.appendChild(title);
            contactRow.appendChild(description);
            contactRow.appendChild(phonenumber);
			contactRow.appendChild(largeImage);
            contactRow.appendChild(removeButton);
            //Add the row to the table
            document.getElementById("contacts").appendChild(contactRow);
          }
        });
      });
    }
    
    window.addEventListener("load", listContacts, true);