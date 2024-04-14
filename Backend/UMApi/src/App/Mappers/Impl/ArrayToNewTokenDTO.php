<?php

namespace App\Mappers\Impl;

use App\Mappers\IMapper;
use App\Models\DTO\NewTokenDTO;

final class ArrayToNewTokenDTO implements IMapper{

    public function __construct(){
    }

    public function getMapping($body){
        $dto = new NewTokenDTO();

        $dto->refreshToken = $body['refreshToken'];

        return $dto;
    }

}

?>
