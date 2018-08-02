<?php
	require('conector.php');
	$con = new conectorBD();

	$response['conexion'] = $con->initConexion($con->database);
	if ($response['conexion'] == 'OK'){
		$conexion = $con->getConexion();
		$insert = $conexion->prepare('INSERT INTO usuarios (email, nombre, password , fecha_nacimiento) VALUES (?,?,?,?)');
		$insert->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);

		$d_password = "1234";
		$email = "juan@mail.com";
		$nombre = "juan";
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = "1990-10-08";

		$insert->execute();

		$d_password = "1234";
		$email = "pepe@mail.com";
		$nombre = "pepe";
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = "1995-10-07";

		$insert->execute();

		$d_password = "1234";
		$email = "gerardo@mail.com";
		$nombre = "gerave";
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = "1992-09-04";

		$insert->execute();

		$response['resultado'] = "1";
		$response['msg']= 'Informacion de inicio:';
		$getUsers = $con->consultar(['usuarios'],['*'],$condicion = "");
		while ($fila= $getUsers->fetch_assoc()) {
			$response['msg'].=$fila['email'];
		}
		$response['msg'].= 'contraseña: '.$d_password;
		}else{
			$response['resultado'] == "0";
			$response['msg'] = 'No se pudo conectar a la base de datos';
		}

		echo json_encode($response);

 ?>
