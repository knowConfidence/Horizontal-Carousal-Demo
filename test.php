<?php
	$myObj = new \stdClass();
	$myObj->first = "Jon";
	$myObj->second = "smith";

	$myJSON = json_encode($myObj);

	echo $myJSON;
?>