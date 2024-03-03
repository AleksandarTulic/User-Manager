<?php

namespace App\Services;

use App\Constants\ProjectConstants;

class CryptoService{

    public function getMD5(string $value){
        return md5($value);
    }

    public function getSha512(string $value, string $salt){
        return hash('sha512', $salt . $value);
    }

    public function base64Encode(string $value){
        return strtr(base64_encode($value), '+/', '-_');
    }

    public function base64Decode(string $value){
        return base64_decode(strtr($value, '-_', '+/'));
    }

    public function hmacSha256(string $value){
        return hash_hmac('sha256', $value, ProjectConstants::HMAC_SECRET_KEY);
    }

}

?>