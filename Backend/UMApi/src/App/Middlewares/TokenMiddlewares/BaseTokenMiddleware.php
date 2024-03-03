<?php

namespace App\Middlewares\TokenMiddlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\TokenService;

abstract class BaseTokenMiddleware{

    public function __construct(private TokenService $tokenService){
    }

    protected function check(Request $request, string $typeCheck):bool{
        $flag = true;

        $authorizationHeader = $request->getHeaderLine('Authorization');

        if (preg_match('/Bearer\s+(.*)$/i', $authorizationHeader, $matches)) {
            $token = $matches[1];

            switch ($typeCheck){
                case SignatureMiddleware::class:
                    $flag = $this->tokenService->validateSignature($token);
                    break;
                case StructureMiddleware::class:
                    $flag = $this->tokenService->validateStructure($token);
                    break;
                case TimeExpirationMiddleware::class:
                    $flag = $this->tokenService->validateExpiration($token);
                    break;
            }
        } else {
            $flag = false;
        }

        return $flag;
    }

}

?>