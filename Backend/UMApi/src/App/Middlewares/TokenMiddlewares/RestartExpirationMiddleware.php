<?php

namespace App\Middlewares\TokenMiddlewares;

use App\Services\TokenService;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class RestartExpirationMiddleware{

    public function __construct(private TokenService $tokenService){
    }

    public function __invoke(Request $request, RequestHandler $handler): Response{
        $authorizationHeader = $request->getHeaderLine('Authorization');

        if (preg_match('/Bearer\s+(.*)$/i', $authorizationHeader, $matches)) {
            $token = $matches[1];

            $response = $handler->handle($request);

            if ($response->getStatusCode() === 200 || $response->getStatusCode() === 201){
                $this->tokenService->restartExpiration($token);
            }
        }

        return $handler->handle($request);
    }

}

?>