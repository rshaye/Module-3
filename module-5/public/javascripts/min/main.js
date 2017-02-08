$('#del').click(function(e){
	e.preventDefault();

$('use:checker').each(function(index, value){
	var val = $(this).attr('id');
	console.log($(this));
	var $thisUse = $(this);

	$.ajax({
	  url:'/tasks'+val,
	  type:'Delete'
	}).done(function(){
	  $thisUse.parents('tr').remove();
	});

});
});

if (windows.location.pathname === '/tasks'){

	fetch('api/v1/tasks').then(function(res){
	  res.json().then(fucntion(tasks){
	  	console.log('tasks', tasks);
	  	var tb = document.getElementById('table-body');
	  	tasks.forEach(function(tasks){
	  	  tb.insertAdjacentHTML('beforeend', '<tr><td>' + entry.taskName + '</td>' +
	        		'<td><a href="/tasks/' + entry._taskDetails + '", class= "red-text">' + entry.title + '</td><td>' +
	        		entry.taskDate+ '</td><td>' + entry.taskcreated + '</td><td>' +
	        		entry.taskupdated + '</td></tr>');
	  	 
	  	function explode(){
  alert("Boom!");
}
setTimeout(explode, 2000);
	  	});

	  })


	});
}