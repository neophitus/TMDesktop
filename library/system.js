function StartWindow(url, title, WindowID, largura, altura) {
	jDesktop.LoadApp(
		"core/createWindow.js",
		function() {
			openWindow(url, title, WindowID, largura, altura);
		}
	);		
}

function Contatos() {
	jDesktop.LoadApp(
		"apps/contatos/startup.js", function(){	
			StartContatos();
		}
	);
}

function startLogin() {
	jDesktop.StartApp(
		'loginWindow', 
		'Sistema de Login',
		'',			// no js dependencies
		'',			// no css dependencies
		'login.php',			// no app file
		{
			width: 400,
			height: 250,
			resizable: false,
			minimizable: false,
			movable: false,
			closable: false,
		},
		function(){
			// Mutley, Faça alguma coisa!
		}
	);
}


