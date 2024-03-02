<?php

namespace App\Services;

class CryptoService{

    public function getMD5(string $value){
        return md5($value);
    }

    public function getSha512(string $value, string $salt){
        return hash('sha512', $salt . $value);
    }

}

?>