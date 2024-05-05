<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");
$app->delete('/alunni/{id}', "AlunniController:delete");
$app->post('/alunni', "AlunniController:insert");
$app->put('/alunni/{id}', "AlunniController:modifica");

$app->run();
