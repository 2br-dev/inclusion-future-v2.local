<?php

class Posts{

	// Экземпляр MODx
	private $modx;

	// Инициализация экземпляра класса
	public function __construct() {
		$path = dirname(dirname(dirname(__FILE__)));
		require_once($path."\config.core.php");
		require_once(MODX_CORE_PATH."model\modx\modx.class.php");

		$this->modx=new modX();
		$this->modx->initialize('web');
	}

	// Список ресурсов 
	public function get($parent){
		$resources = $this->modx->getCollection('modResource', array('parent' => (int)$parent, 'deletedon' => 0));
		$output = [];
		forEach($resources as $doc){
			$output[] = [
				'id' => $doc->get('id'),
				'pagetitle' => $doc->get('pagetitle'),
				'introtext' => $doc->get('introtext'),
				'cover' => $doc->getTVValue('image'),
				'publishedon' => $doc->get('publishedon'),
				'content' => stripslashes($doc->get('content'))
			];
		}
		return $output;
	}
}