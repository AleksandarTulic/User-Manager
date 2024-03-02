<?php

namespace App\Mappers;

use App\Models\DTO\LoginDTO;
use App\Services\CryptoService;
use App\Models\Role;
use App\Models\User;

class Mapper{

    private IMapper $mapper;

    public function __construct(private CryptoService $cryptoService){
    }

    public function getMapping($body, string $to){
        $defaultArray = array();

        if (gettype($defaultArray) === gettype($body) && $to === Role::class){
            $mapper = new ArrayToRole();
        }else if (gettype($defaultArray) === gettype($body) && $to === User::class){
            $mapper = new ArrayToUser($this->cryptoService);
        }else if (gettype($defaultArray) === gettype($body) && $to === LoginDTO::class){
            $mapper = new ArrayToLoginDTO();
        }

        return $mapper->getMapping($body);
    }

}

?>