<?php
include 'crud.php';
include 'config.php';

/*** Novo Crud ***/
$crud = new crud();

/*** Conecta ***/
$crud->dsn = "mysql:dbname=". $db_name .";host=". $db_host ;

/*** MySQL username and password ***/
$crud->username = $db_user;
$crud->password = $db_pass;

/*** select all records from table ***/
$records = $crud->rawSelect("SELECT * FROM icons WHERE nivel_user <=".$_SESSION['NIVEL']." AND ativo=1 ORDER BY ord");

/*** fetch only associative array of values ***/
$rows = $records->fetchAll(PDO::FETCH_ASSOC);

/*** display the records ***/
foreach($rows as $row)
{
?>
<div style="width: 100px; height: 100px; text-align: center;">
	<a href="#"
    	onclick="StartWindow('<? echo $row['URL']; ?>', '<? echo $row['titulo']; ?>', '<? echo $row['window_id']; ?>', '<? echo $row['largura']; ?>', '<? echo $row['altura']; ?>');">
        <img src="img/icons/<? echo $row['icon']; ?>" width="<? echo $row['largura_icon']; ?>" height="<? echo $row['altura_icon']; ?>"></br><center><? echo $row['Label']; ?></center>
    </a>
</div>
<?php
}
?>