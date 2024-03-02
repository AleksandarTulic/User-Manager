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
                "roles": ' . $roles . ',
                "created": ' . time() . '
            }
        ';

        $signature = '
            {
                "signature": ""
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