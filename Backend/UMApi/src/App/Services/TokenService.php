<?php

namespace App\Services;

use App\Repositories\LoginRedisRepository;

class TokenService{

    public function __construct(private CryptoService $cryptoService,
                                private LoginRedisRepository $loginRedisRepository){
    }

    public function createToken(string $username, array $roles){
        $header = '
            "header":{
                "algorithm": "sha512"
            }
        ';

        $payload = '
            "payload":{
                "username": "' . $username . '",
                "roles": ' . json_encode($roles) . ',
                "created": ' . time() . '
            }
        ';

        $signature = '
            "signature":{
                "signature": "' . $this->cryptoService->hmacSha256(trim($header) . trim($payload)) . '"
            }
        ';

        $token = '
            {
                ' . $header . ',
                ' . $payload . ',
                ' . $signature . '
            }
        ';

        return $this->cryptoService->base64Encode($token);
    }

    public function validateSignature(string $token){
        $tokenArr = json_decode($this->cryptoService->base64Decode($token));

        $tokenSignature = $tokenArr->signature->signature;

        $header = '
            "header":{
                "algorithm": "' . $tokenArr->header->algorithm . '"
            }
        ';

        $payload = '
            "payload":{
                "username": "' . $tokenArr->payload->username . '",
                "roles": ' . json_encode($tokenArr->payload->roles) . ',
                "created": ' . $tokenArr->payload->created . '
            }
        ';
        
        $calculatedSignature = $this->cryptoService->hmacSha256(trim($header) . trim($payload));

        return $tokenSignature === $calculatedSignature;
    }

    public function validateStructure(string $token){
        $tokenArr = json_decode($this->cryptoService->base64Decode($token));

        if (!property_exists($tokenArr, 'header'))
            return false;

        if (!property_exists($tokenArr->header, 'algorithm'))
            return false;

        if (!property_exists($tokenArr, 'payload'))
            return false;

        if (!property_exists($tokenArr->payload, 'username'))
            return false;

        if (!property_exists($tokenArr->payload, 'roles'))
            return false;

        if (!property_exists($tokenArr->payload, 'created'))
            return false;

        if (!property_exists($tokenArr, 'signature'))
            return false;

        if (!property_exists($tokenArr->signature, 'signature'))
            return false;

        return true;
    }

    public function validateExpiration(string $token){
        $tokenArr = json_decode($this->cryptoService->base64Decode($token));
    
        $result = $this->loginRedisRepository->getUserToken($tokenArr->payload->username);

        return $result !== null;
    }

}

?>