<?php 

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

    public function getNumberOfRows(Request $request, Response $response) : Response{
        $result = $this->repository->getNumberOfRows();

        $body = json_encode($result);

        $response->getBody()->write($body);

        return $response;
    }

    public function getAll(Request $request, Response $response, $offset, $itemsPerPage) : Response{
        $arr = $this->repository->getAll($offset, $itemsPerPage);

        foreach ($arr as $key => $value){
            $arr[$key]['roles'] = $this->repository->getUserRoles($value['id']);
        }

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

    public function create(Request $request, Response $response) : Response{
        $body = $request->getParsedBody();

        $result = $this->repository->create($this->mapper->getMapping($body, User::class));

        $response->getBody()->write(json_encode($result));

        return $response->withStatus(201);
    }

    public function update(Request $request, Response $response, string $id) : Response{
        $body = $request->getParsedBody();

        $result = $this->repository->update($id, $this->mapper->getMapping($body, User::class));

        $response->getBody()->write(json_encode($result));

        return $response;
    }

    public function delete(Request $request, Response $response, string $id) : Response{
        $result = $this->repository->delete((int) $id);

        $response->getBody()->write(json_encode($result));

        return $response;
    }
}

?>
