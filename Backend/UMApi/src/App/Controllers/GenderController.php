<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\GenderRepository;

class GenderController{

    public function __construct(private GenderRepository $repository){
    }

    public function getAll(Request $request, Response $response) : Response{
        $arr = $this->repository->getAll();

        $body = json_encode($arr);

        $response->getBody()->write($body);

        return $response;
    }

}

?>