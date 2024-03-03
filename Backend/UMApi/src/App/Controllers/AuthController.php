<?php 

namespace App\Controllers;

use App\Mappers\Mapper;
use App\Models\DTO\LoginDTO;
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
        //check if login is successful
        //  if success
        //      create token
        //      then I need to write to db new login request
        //      add token to redis db
        //      return value
        // if not success
        //      then return some message and status code

        $body = $request->getParsedBody();

        $result = $this->repository->isLogedIn($this->mapper->getMapping($body, LoginDTO::class));

        if ($result){
            $token = $this->tokenService->createToken($result->getUsername(), $result->getUserRoles());
            
            $userLogin = new UserLogin();
            $userLogin->setIp($_SERVER['REMOTE_ADDR']);
            $userLogin->setToken($token);
            $userLogin->setUserId($result->getId());
            $userLogin->setCreatedDT(date('Y-m-d H:i:s', time()));

            $this->userLoginRepository->create($userLogin);
            //save token to redis DB
            $this->loginRedisRepository->logInUser($result->getUsername(), $token);

            $response = $response->withHeader('Authorization', 'Bearer ' . $token);
        }

        $response->getBody()->write(json_encode($result));

        return $response;
    }

    public function register(Request $request, Response $response):Response{
        return $response;
    }

}

?>