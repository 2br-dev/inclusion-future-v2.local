<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once('./classes/post.php');

$post = new Post((int)$_GET['id']);

if(!$post->doc){
	echo json_encode([
		'errors' => true,
		'message' => 'Пост с такими вводными не найден!'
	], JSON_UNESCAPED_UNICODE);
}else{

	echo json_encode([
		'errors' => false,
		'data' => [
			'id' => $post->doc->get('id'),
			'pagetitle' => $post->doc->get('pagetitle'),
			'introtext'=>$post->doc->get('introtext'),
			'content'=>stripslashes($post->doc->get('content')),
			'image'=>$post->doc->getTVValue('image')
		]
	], JSON_UNESCAPED_UNICODE);
}
