<style type="text/css">
 .btnLogin a {
 outline: none;/* get rid of dotted borders in FireFox */
 text-indent: -5000px ;/* this move the text outside of the screen area */
 display:block;
 width:40px;
 height:54px;
 background: url("img/ActionButtonEnter.png") 0 0 no-repeat;
 }

 .btnLogin a:hover {
 background-position: 0 -108px;
 }

 .btnLogin a:active {
 background-position: 0 -54px;
 }
 
 .input-img {
	background:transparent url('img/field_bg.png');
	border:0px none;
	width:207px;
	height:30px;
	padding:0px 3px 0px 3px;
	margin-top:3px;
	font-family:Verdana;
	font-weight:bold;
	font-size:12px;
	padding:6px 3px 0px 3px\9;
	height:24px\9;
 }
</style>


<script type="application/javascript">
$(document).ready(function() {
	$('input#email').focus();
	$('#loginBtn').click(function() {
		var login = $('input#login').val();
		var password = $('input#password').val();
		
		var dataString = 'login='+ login + '&senha=' + password;
		
		// alert(dataString);

		 $.ajax({  
		   type: "POST",  
		   url: "includes/dologin.php",  
		   data: dataString,  
		   success: function() {
			   location.reload();		 
		   }  
		});  		
	
	});   
});
</script>
<form name="login" id="login" method="post">
<table width="310px" border="0" cellpadding="5">
  <tr>
    <td style="padding-left:20px" colspan="2"><img src="img/auth.png" width="216" height="64"><br/>
    <br></td>
  </tr>
  <tr>
    <td width="199"><span style="text-shadow: black 0.2em 0.2em 0.3em; color:#FFF; font-weight:bold;">Login:</span><br>
    <input tabindex="1" class="input-img" type="text" name="login" id="login"></td>
    <td width="75" height="60" rowspan="2" align="center" valign="top">
    	<div id="loginBtn" class="btnLogin">
            <br>
            <br>
            <a href="#">Btn Login</a>
        </div>
    </td>
  </tr>
  <tr>
    <td><span style="text-shadow: black 0.2em 0.2em 0.3em; color:#FFF; font-weight:bold;">Senha:</span><br>
    <input tabindex="2" class="input-img" type="password" name="password" id="password"></td>
  </tr>
  <tr>
    <td colspan="2" align="center">&nbsp;</td>
  </tr>
</table>
</form>