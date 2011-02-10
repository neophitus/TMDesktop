<?php
	session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Lavanderia Aguilar - Versao Beta</title>
    <link rel="shortcut icon" href="favicon.ico">
	
	<script type="text/javascript" src="library/jquery-1.4.4.min.js"></script>
	<script type="text/javascript" src="library/ensure.min.js"></script>	
	<script type="text/javascript" src="library/jquery.event.drag-1.5.min.js"></script>
	<script type="text/javascript" src="library/jquery.transform-0.6.2.min.js"></script>
	<script type="text/javascript" src="library/jquery.pulse.min.js"></script>
	<script type="text/javascript" src="library/jDesktop.1.0.js"></script>
	<script type="text/javascript" src="library/system.js"></script>
    <script type="text/javascript" src="js/jQuery/autocenter.js"></script>
    
	<!-- Script do Relogio -->
	<script language="JavaScript" type="text/JavaScript">
		if(navigator.appName == "Microsoft Internet Explorer"){
			window.location = "nobrowser.php";
		}
	</script>
	<script type="text/javascript">
		function UR_Start() 
		{
			UR_Nu = new Date;
			UR_Indhold = showFilled(UR_Nu.getHours()) + ":" + showFilled(UR_Nu.getMinutes()) + ":" + showFilled(UR_Nu.getSeconds());
			document.getElementById("ur").innerHTML = UR_Indhold;
			setTimeout("UR_Start()",1000);
		}
			
		function showFilled(Value) 
		{
			return (Value > 9) ? "" + Value : "0" + Value;
		}
		$(document).ready(function() {	
			$(".btnLogout").click(function() {
				var dataString = '';
				$.ajax({
				type: "POST",
				url: "includes/dologout.php",
				data: dataString,
				success: function() {
					location.reload();
				}
			  });
		
			});
			$("#showDesktop").click(function() {
				jDesktop.ShowDesktop();
			});
			
			$('#login_fields').center();
			
		});
    </script>    
	
	<link rel="stylesheet" href="css/jwindow.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jdesktop.css" type="text/css" media="screen" />

</head>

<body onload="UR_Start();">
	<div id="topbar">
  		<!-- Show Desktop -->
        <div style="position:absolute; width:35px; height:35px;"><img id="showDesktop" style="margin-left:7px; margin-top:5px; cursor:pointer;" src="img/user-desktop.png" onclick="#" /></div>
		<!-- Janelas Minimizadas -->
        <ul id="tcontainer"></ul>
       	<!-- Relogio -->
        <div id="ur"></div>
		<div id="logout"><img class="btnLogout" style="cursor:pointer;" width="24" height="24" src="img/exit.png" /></div>        
    </div>
	<div id="main">
    	<!-- Icones -->
        <div id="desktop-icons">
    	<?php
				if ($_SESSION['LOGADO'] == true) {
      				include "includes/icons.php";
				} else {
				?>
                	<div id="login_fields">
                    	<?php include "login.php"; ?>
                    </div>
                <?php	
				}
		?>
		</div>
        <div id="userInfo">
        	<?php
				if ($_SESSION['LOGADO'] == true) {
			?>
            	Bem Vindo, <? echo $_SESSION['NOME']; ?> <br />
                Seu Nivel de Usuário é:
				<? 
				if ($_SESSION['NIVEL'] == 0) {
						echo " convidado.";
					} elseif ($_SESSION['NIVEL'] > 0 && $_SESSION['NIVEL'] < 20) {
						echo " usuário padrão";
					} elseif ($_SESSION['NIVEL'] > 20 && $_SESSION['NIVEL'] < 50) {
						echo " gerente";
					} elseif ($_SESSION['NIVEL'] > 50 && $_SESSION['NIVEL'] < 70) {
						echo " admnistrador";
					} elseif ($_SESSION['NIVEL'] > 70) {
						echo " root";
				}
				?>
            <?php
				} else {
			?>
            	Voce não esta Logado! <br />
                Efetue o Login para utilizar o sistema.
            <?php
				}
			?>
        </div>
	</div>
	<div id="loadingcontainer"></div>
</body>
</html>