<?php

class Post{

	private $id;
	public $doc;
	public $images;
	private $modx;
	public $content;
	private $parent;

	// Инициализация
	public function __construct($id = null){
		$path = dirname(dirname(dirname(__FILE__)));
		require_once($path."\config.core.php");
		require_once(MODX_CORE_PATH."model\modx\modx.class.php");

		$this->modx=new modX();
		$this->modx->initialize('web');

		$news = $this->modx->getObject('modResource', array('alias' => 'all-news'));
		$newsId = $news->get('id');
		$this->parent = $newsId;
		$this->id = $id;

		// Проверка на зарегистрированного пользователя
		// $user = $this->modx->getUser();
		// $name = $user->get('username');
		// if($name === '(anonymous)'){
		// 	http_response_code(403);
		// 	die(json_encode([
		// 		'errors' => true,
		// 		'message' => 'В доступе отказано',
		// 	], JSON_UNESCAPED_UNICODE));
		// }
		
		if($id){
			$this->doc = $this->modx->getObject('modResource', $id);
		}else{
			$this->doc = $this->modx->newObject('modDocument');
		}
	}

	// Сохранение документа
	public function save($fields){

		$fields['content'] = $this->copyAllImages($fields['content']);

		if($fields){
			forEach($fields as $field => $value){

				if($field !== "image"){
					$this->doc->set($field, $value);
				}else{
					$this->doc->setTVValue('image', $value);
				}
			}
			try{
				$this->doc->save();
				return true;
			}catch(Exception $ex){
				return false;
			}
		}

		return false;
	}

	// Удаление документа
	public function delete(){
		$this->doc->set('deletedon', date('Y-m-d H:i:s'));
		$this->doc->set('deleted', 1);
		try{
			$this->doc->save();
			return true;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	// Копирование файлов с временного сервера на текущий
	private function copyAllImages($content){

		// Подготовка папки для сохраняемых изображений
		$folderURL = "uploads/post_" . $this->id;
		$folderPath = MODX_BASE_PATH . $folderURL;
		if (!file_exists($folderPath)) {
			mkdir($folderPath, 0777, true);
		}

		// Получение информации о загруженных изображениях
		$myDoc = new DOMDocument('1.0', 'UTF-8');
		$myDoc->loadHTML("\xEF\xBB\xBF" .$content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$x_path = new DOMXpath($myDoc);
		$nodes = $x_path->query("//div[@data-content-type='image']");

		foreach($nodes as $index => $value){
			$val = $nodes->item($index);
			$url = $value->getAttribute('data-url');
			$path = parse_url($url, PHP_URL_PATH);
			$name = basename($path);
			$images[] = [
				'src' => $url,
				'srcDomain' => $this->getDomain($url),
				'path' => $folderPath . "/" . $name,
				'out' => $folderURL . "/" . $name
			];
		}
		
		foreach ($nestedPath->query("//img") as $image){
			$url = MODX_SITE_URL . $folderURL . "/" . $name;
			$image->setAttribute('src', $url);
		}

		forEach($images as $image){
			// Сохраняем файл
			if($image['srcDomain'] === 'tmpfiles.org'){
				file_put_contents($image['path'], file_get_contents($image['src']));
			}
		}

		$outputContent = html_entity_decode($myDoc->saveHTML());
 		return $outputContent;
	}

	private function getDomain($url){
		$pieces = parse_url($url);
		$domain = isset($pieces['host']) ? $pieces['host'] : '';
		if(preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)){
			return $regs['domain'];
		}
		return FALSE;
	}
}