<?php

$loader = new \Phalcon\Loader();

$loader->registerDirs([
	__DIR__ . '/models/'
])->register();

$di = new \Phalcon\DI\FactoryDefault();

$di->set('db', function() {
	return new \Phalcon\Db\Adapter\Pdo\Mysql([
		'host' => 'localhost',
		'username' => 'root',
		'password' => '',
		'dbname' => 'time'
	]);
});

$app = new \Phalcon\Mvc\Micro($di);

/**
 * Tasks
 */
$app->get('/tasks', function() use($app) {
	$phql = "SELECT * FROM Tasks";
	$tasks = $app->modelsManager->executeQuery($phql);

	$data = new StdClass();
	$data->tasks = [];
	foreach($tasks as $task) {
		$data->tasks[] = [
			'id' => $task->id,
			'name' => $task->name,
			'shortDescription' => $task->short_description,
			'longDescription' => $task->long_description,
			'day' => $task->day,
			'started' => $task->started,
			'completed' => $task->completed,
		];
	}

	echo json_encode($data);
});

$app->post('/tasks', function() use($app) {
	$request = $app->request->getJsonRawBody()->task;

		$name = $request->name;
		$short = $request->shortDescription;
		$long = $request->longDescription;
		$day = $request->day;

		$phql = "INSERT INTO Tasks(name, short_description, long_description, day, started, completed) VALUES(:name:, :short:, :long:, :day:, null, null)";
		$status = $app->modelsManager->executeQuery($phql, ['name' => $name, 'short' => $short, 'long' => $long, 'day' => $day]);
		
		$response = new \Phalcon\Http\Response();

		if($status->success()) {
			$response->setJsonContent(['status' => 'OK']);
		}
});

$app->put('/tasks/{id:[0-9]+}', function($id) use($app) {
	$task = $app->request->getJsonRawBody()->task;

	$phql = "UPDATE Tasks SET name = :name:, short_description = :short:, long_description = :long:, started = :start:, completed = :complete: WHERE id = :id:";
	$status = $app->modelsManager->executeQuery($phql, [
		'name' 	=> $task->name,
		'short' => $task->shortDescription,
		'long' 	=> $task->longDescription,
		'start' => $task->started,
		'complete' => $task->completed,
		'id' 	=> $id
	]);
	
	$response = new \Phalcon\Http\Response();

	if($status->success()) {
		$response->setJsonContent(['status' => 'OK']);
	}
});

$app->delete('/tasks/{id:[0-9]+}', function($id) use($app) {
	$status = $app->modelsManager->executeQuery('DELETE FROM Tasks WHERE id = :id:', ['id' => $id]);

	$response = new \Phalcon\Http\Response();

	if($status->success()) {
		$response->setJsonContent(['status' => 'OK']);
	}

	return $response;
});

/**
 * Ideas
 */
$app->get('/ideas', function() use($app) {
	$ideas = $app->modelsManager->executeQuery("SELECT * FROM Ideas");

	$data = new StdClass();
	$data->ideas = [];
	foreach($ideas as $idea) {
		$data->ideas[] = [
			'id' => $idea->id,
			'title' => $idea->title,
			'body' => $idea->body,
			'added' => $idea->added
		];
	}

	echo json_encode($data);
});

$app->post('/ideas', function() use($app) {
	$idea = $app->request->getJsonRawBody()->idea;

	$title = $idea->title;
	$body = $idea->body;

	$phql = "INSERT INTO Ideas(title, body, added) VALUES(:title:, :body:, :added:)";
	$status = $app->modelsManager->executeQuery($phql, [
		'title' => $title,
		'body' => $body,
		'added' => new \Phalcon\Db\RawValue('now()')
	]);

	$response = new \Phalcon\Http\Response();

	if($status->success()) {
		$response->setJsonContent(['status' => 'OK']);
	}
});

$app->put('/ideas/{id:[0-9]+}', function($id) use($app) {
	$idea = $app->request->getJsonRawBody()->idea;

	$phql = "UPDATE Ideas SET title = :title:, body = :body: WHERE id = :id:";
	$status = $app->modelsManager->executeQuery($phql, [
		'title' => $idea->title,
		'body'	=> $idea->body,
		'id' 	=> $id
	]);
	
	$response = new \Phalcon\Http\Response();

	if($status->success()) {
		$response->setJsonContent(['status' => 'OK']);
	}
});

$app->delete('/ideas/{id:[0-9]+}', function($id) use($app) {
	$status = $app->modelsManager->executeQuery('DELETE FROM Ideas WHERE id = :id:', ['id' => $id]);

	$response = new \Phalcon\Http\Response();

	if($status->success()) {
		$response->setJsonContent(['status' => 'OK']);
	}

	return $response;
});

try {
	$app->handle();
} catch(\Phalcon\Mvc\Micro\Exception $exception) {
	echo $exception->getMessage();
}