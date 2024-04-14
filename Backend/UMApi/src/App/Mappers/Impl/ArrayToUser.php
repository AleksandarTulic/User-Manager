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

        if (array_key_exists('username', $body))
            $user->setUsername($body['username']);

        $user->setSalt($this->cryptoService->getMD5($timestamp));

        if (array_key_exists('password', $body)){
            $user->setPassword(
                $this->cryptoService->getSha512(
                    $body['password'], 
                    $user->getSalt()
                )
            );
        }

        if (array_key_exists('firstName', $body))
            $user->setFirstName($body['firstName']);
        
        if (array_key_exists('lastName', $body))
            $user->setLastName($body['lastName']);

        if (array_key_exists('genderId', $body))
            $user->setGenderId($body['genderId']);

        if (array_key_exists('roles', $body))
            $user->setUserRoles($body['roles']);

        return $user;
    }

}

?>