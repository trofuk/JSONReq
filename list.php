<?php
	header('Content-Type: application/json');

	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		$newEntry = json_decode(file_get_contents("php://input"));

		$allEntries = json_decode(file_get_contents('entries.json'));
		if(!$allEntries)
			$allEntries = array();

		array_push($allEntries, $newEntry);

		file_put_contents('entries.json', json_encode($allEntries));
	}

	echo file_get_contents('entries.json');
