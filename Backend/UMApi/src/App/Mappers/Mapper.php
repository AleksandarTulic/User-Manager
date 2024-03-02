<?php

namespace App\Mappers;

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
        }

        return $mapper->getMapping($body);
    }

}

?>