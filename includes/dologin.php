<?php
	session_start();
	$_SESSION['LOGADO'] = false;
	$_SESSION['NOME'] = NULL;
	$_SESSION['NIVEL'] = NULL;
	
	include 'config.php';
	include 'crud.php';

    // Cria um novo Objeto Crud    
    $crud = new crud();

    // Conecta ao Banco de Dados:
    // DSN:
    $crud->dsn = "mysql:dbname=aguilar;host=localhost";
    
    // login:
    $crud->username = "root";
    $crud->password = "m0r31r4";
	
	/*** select all records from table ***/
	$SQL = "SELECT * FROM usuarios WHERE email = '" . $_POST['login'] . "'" ;
    $records = $crud->rawSelect($SQL);

    /*** fetch only associative array of values ***/
    $rows = $records->fetchAll(PDO::FETCH_ASSOC);
	
	if (count($rows) == 0 ) {
		// Nenhum Registro Encontrado
		$_SESSION['LOGADO'] = false;
		$_SESSION['NOME'] = NULL;
		$_SESSION['NIVEL'] = NULL;
	}
	if (count($rows) == 1 ) {
		// Usuario Encontrado. Check a senha:
		foreach($rows as $row)
			{
				if ($row['senha'] == $_POST['senha']) {
					$_SESSION['LOGADO'] = true;
					$_SESSION['NOME'] = $row['nome'];
					$_SESSION['NIVEL'] = $row['nivel'];				
				} else {
					$_SESSION['LOGADO'] = false;
					$_SESSION['NOME'] = NULL;
					$_SESSION['NIVEL'] = NULL;
				}
			}
	}
?>