<?php

namespace App\Mappers\Impl;

use App\Mappers\IMapper;
use App\Models\UserLogin;

final class ArrayToUserLogin implements IMapper{

    public function __construct(){
    }

    public function getMapping($body){
        $dto = new UserLogin($body['token'], $body['ip'], $body['createdAt'], $body['userId']);

        return $dto;
    }

}

?>
