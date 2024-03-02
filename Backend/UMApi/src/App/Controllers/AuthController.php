<?php 

namespace App\Controllers;

use App\Mappers\Mapper;
use App\Models\DTO\LoginDTO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\UserRepository;

class AuthController{

    public function __construct(private UserRepository $repository, private Mapper $mapper){
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
        }

        $response->getBody()->write(json_encode($result));

        return $response;
    }

    public function register(Request $request, Response $response):Response{
        return $response;
    }

}

?>