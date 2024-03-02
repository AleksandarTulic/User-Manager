<?php 

declare(strict_types=1);

use App\Controllers\RoleController;
use App\Controllers\UserController;
use App\Middlewares\ResponseJsonMiddleware;
use Slim\Factory\AppFactory;
use DI\ContainerBuilder;
use Slim\Routing\RouteCollectorProxy;
use Slim\Handlers\Strategies\RequestResponseArgs;

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
    $group->post('/users', [UserController::class, 'create']);
    $group->delete('/users/{id:[0-9]+}', [UserController::class, 'delete']);

});

$app->run();

?>