<?php

namespace App\Middlewares\TokenMiddlewares;

use App\Services\CryptoService;
use App\Services\TokenService;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class StructureMiddleware extends BaseTokenMiddleware{

    public function __construct(private TokenService $tokenService){
    }

    public function __invoke(Request $request, RequestHandler $handler): Response{
        $flag = parent::check($request, StructureMiddleware::class);
        
        if ($flag){
            $response = $handler->handle($request);
        }else{
            $response = new Response();
            $response->getBody()->write('Unauthorized.');
            $response->withStatus(401);
        }

        return $response;
    }

}

?>