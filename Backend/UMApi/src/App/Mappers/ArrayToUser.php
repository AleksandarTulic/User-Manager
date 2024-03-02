<?php

namespace App\Mappers;

use App\Services\CryptoService;
use App\Models\Role;
use App\Models\User;
use DateTime;

class ArrayToUser implements IMapper{

    public function __construct(private CryptoService $cryptoService){
    }

    public function getMapping($body){
        $user = new User();

        $timestamp = time();

        $user->setUsername($body['username']);
        $user->setSalt($this->cryptoService->getMD5($timestamp));
        $user->setPassword(
            $this->cryptoService->getSha512(
                $body['password'], 
                $user->getSalt()
            )
        );
        $user->setFirstName($body['firstName']);
        $user->setLastName($body['lastName']);
        $user->setSexId($body['sexId']);
        $user->setUserRoles($body['roles']);

        return $user;
    }

}

?>