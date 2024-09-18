<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once('./classes/posts.php');

$posts = new Posts();
try{
	$list = $posts->get();
	http_response_code(200);
	echo json_encode([
		'list' => $list,
		'errors' => false
	], JSON_UNESCAPED_UNICODE);
}catch(PDOException $ex){
	echo json_encode([
		"message" => $ex->getMessage(),
		"errors" => true
	]);
}
