<?php

use App\Controllers\AuthController;
use App\Controllers\RoleController;
use App\Controllers\UserController;
use App\Middlewares\CORSMiddleware;
use App\Middlewares\ResponseJsonMiddleware;
use App\Middlewares\TokenMiddlewares\RestartExpirationMiddleware;
use App\Middlewares\TokenMiddlewares\RoleMiddleware;
use App\Middlewares\TokenMiddlewares\StructureMiddleware;
use App\Middlewares\TokenMiddlewares\SignatureMiddleware;
use App\Middlewares\TokenMiddlewares\TimeExpirationMiddleware;
use App\Services\TokenService;
use Slim\Factory\AppFactory;
use DI\ContainerBuilder;
use Slim\Routing\RouteCollectorProxy;
use Slim\Handlers\Strategies\RequestResponseArgs;
use Slim\Exception\HttpNotFoundException;

define('APP_ROOT', dirname(__DIR__));
require APP_ROOT . '/vendor/autoload.php';

$builder = new ContainerBuilder;
$container = $builder->addDefinitions(APP_ROOT . '/config/definitions.php')->build();

AppFactory::setContainer($container);
$app = AppFactory::create();

$collector = $app->getRouteCollector();
$collector->setDefaultInvocationStrategy(new RequestResponseArgs);

$app->add(CORSMiddleware::class);

$app->addBodyParsingMiddleware();

//add to every response content-type application/json
$app->add(ResponseJsonMiddleware::class);
//$app->add(RestartExpirationMiddleware::class);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->group('/api', function (RouteCollectorProxy $group){

    $group->get('/roles', [RoleController::class, 'getAll']);
    $group->get('/roles/{id:[0-9]+}', [RoleController::class, 'getById']);
    $group->post('/roles', [RoleController::class, 'create']);
    $group->put('/roles/{id:[0-9]+}', [RoleController::class, 'update']);
    $group->delete('/roles/{id:[0-9]+}', [RoleController::class, 'delete']);

    $group->get('/users/{offset:[0-9]+}/{itemsPerPage:[0-9]+}', [UserController::class, 'getAll']);
    $group->get('/users/count', [UserController::class, 'getNumberOfRows']);
    $group->get('/users/{id:[0-9]+}', [UserController::class, 'getById']);
    $group->post('/users', [UserController::class, 'create']);
    $group->put('/users/{id:[0-9]+}', [UserController::class, 'update']);
    $group->delete('/users/{id:[0-9]+}', [UserController::class, 'delete'])->add(RoleMiddleware::class);

    $group->post('/login', [AuthController::class, 'login']);

});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
    throw new HttpNotFoundException($request);
});

$app->run();

?>
