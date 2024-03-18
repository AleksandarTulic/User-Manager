<?php

namespace App\Mappers\Impl;

use App\Mappers\IMapper;
use App\Models\DTO\LoginResponseDTO;

final class ArrayToLoginResponseDTO implements IMapper{

    public function __construct(){
    }

    public function getMapping($body){
        $dto = new LoginResponseDTO($body['accessToken'], $body['refreshToken']);

        return $dto;
    }

}

?>
