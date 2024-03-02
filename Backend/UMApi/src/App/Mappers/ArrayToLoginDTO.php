<?php

namespace App\Mappers;

use App\Models\DTO\LoginDTO;

class ArrayToLoginDTO implements IMapper{

    public function __construct(){
    }

    public function getMapping($body){
        $dto = new LoginDTO();
        
        $dto->username = $body['username'];
        $dto->username = $body['password'];

        return $dto;
    }

}

?>