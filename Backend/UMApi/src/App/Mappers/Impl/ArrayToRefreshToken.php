<?php

namespace App\Mappers\Impl;

use App\Mappers\IMapper;
use App\Models\RefreshToken;

final class ArrayToRefreshToken implements IMapper{

    public function __construct(){
    }

    public function getMapping($body){
        $dto = new RefreshToken();

        return $dto;
    }

}

?>
