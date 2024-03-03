<?php

namespace App\Services;

class TokenService{

    public function __construct(private CryptoService $cryptoService){
    }

    public function createToken(string $username, array $roles){
        $header = '
            {
                "algorithm": "sha512"
            }
        ';

        $payload = '
            {
                "username": "' . $username . '",
                "roles": ' . json_encode($roles) . ',
                "created": ' . time() . '
            }
        ';

        $signature = '
            {
                "signature": "' . $this->cryptoService->hmacSha256($header . $payload) . '"
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

}

?>