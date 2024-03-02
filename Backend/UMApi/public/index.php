<?php

use App\Controllers\AuthController;
use App\Controllers\RoleController;
use App\Controllers\UserController;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\ResponseJsonMiddleware;
use Slim\Factory\AppFactory;
use DI\ContainerBuilder;
use Slim\Routing\RouteCollectorProxy;
use Slim\Handlers\Strategies\RequestResponseArgs;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Predis\Client;

define('APP_ROOT', dirname(__DIR__));
require APP_ROOT . '/vendor/autoload.php';

$builder = new ContainerBuilder;
$container = $builder->addDefinitions(APP_ROOT . '/config/definitions.php')->build();

AppFactory::setContainer($container);
$app = AppFactory::create();

$collector = $app->getRouteCollector();
$collector->setDefaultInvocationStrategy(new RequestResponseArgs);

$app->addBodyParsingMiddleware();

//add to every response content-type application/json
$app->add(new ResponseJsonMiddleware);

$app->group('/api', function (RouteCollectorProxy $group){

    $group->get('/roles', [RoleController::class, 'getAll']);
    $group->get('/roles/{id:[0-9]+}', [RoleController::class, 'getById']);
    $group->post('/roles', [RoleController::class, 'create']);
    $group->put('/roles/{id:[0-9]+}', [RoleController::class, 'update']);
    $group->delete('/roles/{id:[0-9]+}', [RoleController::class, 'delete']);

    $group->get('/users', [UserController::class, 'getAll']);
    $group->get('/users/{id:[0-9]+}', [UserController::class, 'getById']);
    $group->post('/users', [UserController::class, 'create']);
    $group->put('/users/{id:[0-9]+}', [UserController::class, 'update']);
    $group->delete('/users/{id:[0-9]+}', [UserController::class, 'delete']);

    $group->get('/redis1', function (Request $request, Response $response){
        $client = new Client([
            'host' => '127.0.0.1',
            'port' => 6379
        ]);

        // Set a value in Redis
        $client->set('name', 'aco123');

        // Get the value from Redis
        $name = $client->get('name');

        $response->getBody()->write("Hello, $name");
        return $response;
    })->add(new AuthMiddleware);

    $group->post('/login', [AuthController::class, 'login']);

});

$app->run();

?>