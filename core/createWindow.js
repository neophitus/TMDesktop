// JavaScript Document
function openWindow(URL, title, WindowID, largura, altura){
	jDesktop.StartApp(
			WindowID,
			title,
			'core/template.js',
			'css/template.css',
			'core/template.php',
			{
				resizable: true,
				width: largura,
				height: altura,
				minimizable: true,
				maximizable: true,
				closeConfirm: true,
				closable: true,
				// onResizeEnd: WindowResize(WindowID)
			},
			function(){
				$('#' + WindowID).contents().find('iframe#mainFrame').attr("src", URL);
			}
	);
}

function WindowResize(WindowID) {
	alert("Mudou!");
}

