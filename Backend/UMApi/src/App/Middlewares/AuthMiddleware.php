<?php

declare(strict_types=1);

namespace App\Middlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;

class AuthMiddleware{

    public function __invoke(Request $request, RequestHandler $handler): Response{
        $token = $request->getHeaderLine('Authorization');
        
        $response = $handler->handle($request);
    
        $response->getBody()->write(json_encode($token));

        return $response;
    }

}

?>