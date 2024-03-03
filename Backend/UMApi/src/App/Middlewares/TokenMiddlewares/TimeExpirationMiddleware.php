<?php

namespace App\Middlewares\TokenMiddlewares;

use App\Services\TokenService;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class TimeExpirationMiddleware extends BaseTokenMiddleware{

    public function __construct(private TokenService $tokenService){
        parent::__construct($tokenService);
    }

    public function __invoke(Request $request, RequestHandler $handler): Response{
        $flag = parent::check($request, TimeExpirationMiddleware::class);

        if ($flag){
            $response = $handler->handle($request);
        }else{
            $response = new Response();
            $response->getBody()->write('Unauthorized.');
            return $response->withStatus(401);
        }

        return $response;
    }

}

?>