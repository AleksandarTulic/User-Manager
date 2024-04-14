<?php

namespace App\Models\DTO;

class NewTokenDTO{
    public string $refreshToken;

    public function __construct(){
        $this->refreshToken = "";
    }
}

?>