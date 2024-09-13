<?php

class Post{

	public $doc;
	public $images;

	// Инициализация
	public function __construct($id = null){
		$path = dirname(dirname(dirname(__FILE__)));
		require_once($path."\config.core.php");
		require_once(MODX_CORE_PATH."model\modx\modx.class.php");

		$this->modx=new modX();
		$this->modx->initialize('web');
		
		if($id){
			$this->doc = $this->modx->getObject('modResource', $id);
		}else{
			$this->doc = $this->modx->newObject('modDocument');
		}
	}

	// Сохранение документа
	public function save($fields){
		if($fields){
			forEach($fields as $field => $value){

				if($field !== "image"){
					$this->doc->set($field, $value);
				}else{
					$this->doc->setTVValue('image', $value);
				}
			}
			$this->doc->save();
			return true;
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
	private function copyAllImages(){
		// Инициализация массива
		$images = $this->contentImages;

		// Подготовка папки для сохраняемых изображений
		$folderURL = "/uploads/post_" . $this->id;
		$folderPath = MODX_BASE_PATH . $folderURL;
		if (!file_exists($folder)) {
			mkdir($folder, 0777, true);
		}

		forEach($images as $image){
			// Получение имени файла
			$path = parse_url($image, PHP_URL_PATH);
			$name = basename($path);

			// Сохраняем файл
			file_put_contents($folderPath . "/" . $name, file_get_contents($image));
			
			// Меняем ссылки в контенте
			$this->content = str_replace($image, $folderURL . "/" . $name, $this->content);
		}
	}
}