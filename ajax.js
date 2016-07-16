function el(id)
{
	return document.getElementById(id);
}

window.onload = function()
{
	var form = el('newEntryForm');
	form.onsubmit = function(e)
	{
		e.preventDefault();
		var jsonToSend = {
			name: 			el('name').value,
			surname:	 	el('surname').value,
			age: 				el('age').value,
			about: 			el('about').value
		};

		addNewItem(jsonToSend);
	}
	refreshItemList();
}

function renderItems(jsonAsText)
{
	var arr = JSON.parse(jsonAsText);
	var html = '';
	for(var i = 0; i < arr.length; i++)
	{
		html += '<div class="panel panel-default">';
		html += '<div class="panel-heading">' + arr[i].name + ' ' + arr[i].surname + ' (' + arr[i].age + ')</div>';
		html += '<div class="panel-body">' + arr[i].about + '</div>';
		html += '</div></div>';
	}

	var entriesViewport = el('entries');
	entriesViewport.innerHTML = html;
}

function refreshItemList()
{
	var oReq = new XMLHttpRequest();
	oReq.open("GET", '/list.php', true);
	oReq.onload = function(e)
	{
		if(oReq.status == 200)
		{
			renderItems(oReg.responseText);
		}
	}
oReq.send();
}

function addNewItem(item)
{
	var oReq = new XMLHttpRequest();
	oReq.open("POST", '/list.php', true);
	oReq.onload = function(e)
	{
		if(oReq.status == 200)
		{
			renderItems(oReg.responseText);
		}
	}
oReq.setRequestHeader("Content-Type", "application/json");
oReq.send(JSON.stringify(item));

}
