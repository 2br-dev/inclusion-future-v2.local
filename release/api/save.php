<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$request = file_get_contents('php://input');
$data = json_decode($request, true);
require_once("./classes/post.php");

$id = $data['id'];
$pagetitle = (string)addslashes($data['pagetitle']);
$introtext = (string)addslashes($data['introtext']);
$content = (string)addslashes($data['content']);

$post = new Post($id);

$result = $post->save([
	'pagetitle' => $pagetitle,
	'introtext' => $introtext,
	'content' => $content,
	'parent' => 2,
	'publishedon' => $published
]);

if($result){
	http_response_code(200);
	$message = [
		'errors' => false,
		'message' => 'Документ успешно сохранён!'
	];
	echo json_encode($message, JSON_UNESCAPED_UNICODE);
}else{
	http_response_code(500);
	$message = [
		'errors' => true,
		'message' => 'Ошибка сохранения документа!'
	];
	echo json_encode($message, JSON_UNESCAPED_UNICODE);
}