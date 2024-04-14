<?php 

namespace App\Controllers;

use App\Mappers\Mapper;
use App\Models\DTO\LoginDTO;
use App\Models\DTO\NewTokenDTO;
use App\Models\DTO\LoginResponseDTO;
use App\Models\UserLogin;
use App\Repositories\LoginRedisRepository;
use App\Repositories\RefreshTokenRepository;
use App\Repositories\UserLoginRepository;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\UserRepository;
use App\Services\TokenService;

class AuthController{

    public function __construct(private UserRepository $repository,
                                private LoginRedisRepository $loginRedisRepository, 
                                private UserLoginRepository $userLoginRepository,
                                private RefreshTokenRepository $refreshTokenRepository,
                                private TokenService $tokenService,
                                private Mapper $mapper){
    }

    public function login(Request $request, Response $response):Response{
        $body = $request->getParsedBody();
        
        $accessToken = '';
        $refreshToken = '';

        $result = $this->repository->isLogedIn($this->mapper->getMapping($body, LoginDTO::class));

        if ($result){
            //create access token
            $accessToken = $this->tokenService->createToken($result->getUsername(), $result->getUserRoles(), 30);

            //create refresh token
            $refreshToken = $this->tokenService->createToken($result->getUsername(), $result->getUserRoles(), 1440);

            $userLogin = $this->mapper->getMapping([
                'ip' => $_SERVER['REMOTE_ADDR'],
                'token' => $accessToken,
                'userId' => $result->getId(),
                'createdAt' => date('Y-m-d H:i:s', time())
            ], UserLogin::class);

            //save access token/login to DB
            $this->userLoginRepository->create($userLogin);

            //save access token to redis DB
            $this->loginRedisRepository->logInUser($result->getUsername(), $accessToken);
            //save refresh token to redis DB
            //$this->refreshTokenRepository->create($result->getUsername() . '_refreshToken', $refreshToken);

            //add token to response header
            $response = $response->withHeader('Authorization', 'Bearer ' . $accessToken);

            //we want the client to see/save token on their local machine
            $result = $accessToken;
        
            $response->getBody()->write(json_encode($this->mapper->getMapping(['accessToken' => $accessToken, 'refreshToken' => $refreshToken], LoginResponseDTO::class)));
            
            return $response->withStatus(201);
        }

        return $response->withStatus(400);
    }

    public function createNewAccessToken(Request $request, Response $response):Response{
        $body = $request->getParsedBody();

        $token = $this->mapper->getMapping($body, NewTokenDTO::class);

        try{
            if ($this->tokenService->validateStructure($token->refreshToken) &&
                $this->tokenService->validateSignature($token->refreshToken) && 
                $this->tokenService->validateExpiration($token->refreshToken)){
                //generate new access token
            }
        }catch (Exception $exc){
            $response = $response->withStatus(400);
        }

        return $response;
    }

}

?>
