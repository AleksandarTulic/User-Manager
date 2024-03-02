<?php 

declare(strict_types=1);

namespace App\Controllers;

use App\Mappers\Mapper;
use App\Models\User;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\UserRepository;

class UserController{

    public function __construct(private UserRepository $repository,
                                private Mapper $mapper){
    }

    public function getAll(Request $request, Response $response) : Response{
        $arr = $this->repository->getAll();

        $body = json_encode($arr);

        $response->getBody()->write($body);

        return $response;
    }

    public function create(Request $request, Response $response) : Response{
        $body = $request->getParsedBody();

        $var = $this->mapper->getMapping($body, User::class);
        //$response->getBody()->write(json_encode($result));

        return $response;
    }

    public function delete(Request $request, Response $response, string $id) : Response{
        $result = $this->repository->delete((int) $id);

        $response->getBody()->write(json_encode($result));

        return $response;
    }
}

?>