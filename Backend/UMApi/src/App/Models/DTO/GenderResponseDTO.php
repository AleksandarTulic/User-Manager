<?php

namespace App\Models\DTO;

final class GenderResponseDTO{
    public string $accessToken;
    public string $refreshToken;

    public function __construct(string $accessToken, string $refreshToken){
        $this->accessToken = $accessToken;
        $this->refreshToken = $refreshToken;
    }

}

?>
