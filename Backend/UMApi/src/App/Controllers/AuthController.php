<?php 

namespace App\Controllers;

use App\Mappers\Mapper;
use App\Models\DTO\LoginDTO;
use App\Models\DTO\LoginResponseDTO;
use App\Models\UserLogin;
use App\Repositories\LoginRedisRepository;
use App\Repositories\UserLoginRepository;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\UserRepository;
use App\Services\TokenService;

class AuthController{

    public function __construct(private UserRepository $repository,
                                private LoginRedisRepository $loginRedisRepository, 
                                private UserLoginRepository $userLoginRepository,
                                private TokenService $tokenService,
                                private Mapper $mapper){
    }

    public function login(Request $request, Response $response):Response{
        $body = $request->getParsedBody();
        
        $accessToken = '';
        $refreshToken = '';

        $result = $this->repository->isLogedIn($this->mapper->getMapping($body, LoginDTO::class));

        if ($result){
            //create token
            $token = $this->tokenService->createToken($result->getUsername(), $result->getUserRoles());

            $userLogin = $this->mapper->getMapping([
                'ip' => $_SERVER['REMOTE_ADDR'],
                'token' => $token,
                'userId' => $result->getId(),
                'createdAt' => date('Y-m-d H:i:s', time())
            ], UserLogin::class);

            //save token/login to DB
            $this->userLoginRepository->create($userLogin);

            //save token to redis DB
            //$this->loginRedisRepository->logInUser($result->getUsername(), $token);

            //add token to response header
            $response = $response->withHeader('Authorization', 'Bearer ' . $token);

            //we want the client to see/save token on their local machine
            $result = $token;
        
            $response->getBody()->write(json_encode($this->mapper->getMapping(['accessToken' => $token, 'refreshToken' => $token], LoginResponseDTO::class)));
        }

        return $response;
    }

    public function register(Request $request, Response $response):Response{
        return $response;
    }

}

?>
