<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once('./classes/post.php');

$post = new Post((int)$_GET['id']);

if($post->doc->id === null){
	echo json_encode([
		'errors' => true,
		'message' => 'Пост с такими вводными не найден!'
	], JSON_UNESCAPED_UNICODE);
}else{
	$result = $post->delete();
	if($result === true){
		echo json_encode([
			'errors' => false,
			'message' => 'Пост удален!'
		], JSON_UNESCAPED_UNICODE);
	}else{
		echo json_encode([
			'errors' => true,
			'message' => $result
		], JSON_UNESCAPED_UNICODE);
	}
}