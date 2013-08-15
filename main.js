$('#formPage').on('pageinit', function() {

	
	var woForm = $('#lifeForm');
	woForm.validate();


function toggleControls(n) {
	switch(n){
		case "on":
			$('#lifeForm').css('display', 'none');
			$('#displayLink').css('display', 'none');
			$('#clearLink').css('display', 'none');
			$('#newItem').css('display', 'inline');
			break;
		case "off":
			$('#lifeForm').css('display', 'block');
			$('#clearLink').css('display', 'inline');
			$('#displayLink').css('display', 'inline');	
			break;
		default:
			return false;
	}
}

function storeData() {

	var id 					= Math.floor(Math.random()* 100000001);

	var item 				={};
		item.fname			=['First Name:', $('#fname').val()];
		item.lname			=['Last Name:', $('#lname').val()];
		item.cWeight		=['Current Weight:', $('#cWeight').val()];
		item.bgoals			=['Body Goals:', $('#select-bodyGoals').val()];
		item.notes			=['Bio Notes:', $('#notes').val()];
	localStorage.setItem(id, JSON.stringify(item));
	alert('contact saved!');
}

function getData() {
	toggleControls('on');
	if(localStorage.length === 0) {
		alert("no data in local storage");
		aFillData()
		
	}
	var makeDiv = $('<div></div>');
	
	makeDiv.attr("id", "items");
	makeDiv.attr("data-role","fieldcontain");
	var makeList = $('<ul></ul>');
	makeDiv.append(makeList);
	$('#formPage').append(makeDiv);
	$('#clearLink').css('display', 'inline');
	for(var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = $('<li></li>');
		var linksLi = $('<li></li>');
		makeList.append(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = $('<ul></ul>');
		makeLi.append(makeSubList);
		for(var n in obj) {
			var makeSubLi = $('<li></li>');
			makeSubList.append(makeSubLi);
			var optSubText = obj[n][0]+ " "+obj[n][1];
			makeSubLi.html(optSubText);
			makeSubList.append(linksLi);
		}
		makeItemLinks(localStorage.key(i),linksLi);
	}
}

function aFillData() {
 	for (var n in json) {
 		var id = Math.floor(Math.random()* 100000001);
 		localStorage.setItem(id, JSON.stringify(json[n]));
 	}
 }


function makeItemLinks(key, linksLi) {
	var editLink = $('<a></a>');
		editLink.attr("href", "#");
	editLink.key = key;
	var editText = "Edit Profile";
	$(editLink).click(function() {
		editItem(key);
		$('#displayLink').css('display', 'none');
		


	});
	editLink.html(editText);
	linksLi.append(editLink);

	var breakTag = $('<br/>');
	linksLi.append(breakTag);

	var deleteLink = $('<a></a>');
	deleteLink.attr("href", "#");
	deleteLink.key = key;
	var deleteText = "Delete Profile";
	$(deleteLink).click(function() {
		deleteItem();
	});
	deleteLink.html(deleteText);
	linksLi.append(deleteLink);
}

function deleteItem() {
	var ask = confirm("Are you sure");
	if(ask) {
		localStorage.clear(this.key);
		window.location.reload();
	} else{
		alert("cont was not Deleted")

	}
}

function editItem(key) {
	var value = localStorage.getItem(key);
	var item = JSON.parse(value);
	toggleControls('off');
	$('#fname').val(item.fname[1]);
	$('#lname').val(item.lname[1]);
	$('#cWeight').val(item.cWeight[1]);
	$('#select-bodyGoals').val(item.bgoals[1]);
	$('#notes').val(item.notes[1]);	
}


function clearLocal() {
	if(localStorage.length === 0) {
		alert("No data");
	} else {
		localStorage.clear();
		alert("Bio is Deleted");
		window.location.reload();
		return false;
	}
}


	
	$('#displayLink').on('click', function() {
		getData();


		
	});
	
	$('#clearLink').click(function() {
		clearLocal();
	});
	
	$('#submit').on('click', function() {
		storeData();
		window.location.reload();
		
	});

});