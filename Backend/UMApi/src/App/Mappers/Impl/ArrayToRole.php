<?php

namespace App\Mappers;

use App\Models\Role;

class ArrayToRole implements IMapper{

    public function __construct(){
    }

    public function getMapping($body){
        return new Role($body['name']);
    }

}

?>