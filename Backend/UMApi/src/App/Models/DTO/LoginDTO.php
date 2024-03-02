<?php

namespace App\Models\DTO;

class LoginDTO{
    public string $username;
    public string $password;

    public function __construct(){
        $this->username = "";
        $this->password = "";
    }
}

?>