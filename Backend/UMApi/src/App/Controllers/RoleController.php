<?php 

declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\ProductRepository;
use App\Repositories\RoleRepository;

class RoleController{

    public function __construct(private RoleRepository $repository){
    }

    public function getAll(Request $request, Response $response) : Response{
        $arr = $this->repository->getAll();

        $body = json_encode($arr);

        $response->getBody()->write($body);

        return $response;
    }

    public function getById(Request $request, Response $response, string $id) : Response{
        $arr = $this->repository->getById((int) $id);

        $body = json_encode($arr);

        $response->getBody()->write($body);

        return $response;
    }

}

?>