<?php

namespace App\Mappers;

use App\Mappers\Impl\ArrayToLoginResponseDTO;
use App\Mappers\Impl\ArrayToUserLogin;
use App\Mappers\Impl\ArrayToNewTokenDTO;
use App\Mappers\Impl\ArrayToLoginDTO;
use App\Mappers\Impl\ArrayToRole;
use App\Mappers\Impl\ArrayToUser;

use App\Models\DTO\LoginDTO;
use App\Models\DTO\NewTokenDTO;
use App\Models\DTO\LoginResponseDTO;
use App\Services\CryptoService;
use App\Models\Role;
use App\Models\User;
use App\Models\UserLogin;
use App\Models\RefreshToken;

class Mapper{

    private IMapper $mapper;

    public function __construct(private CryptoService $cryptoService){
    }

    public function getMapping($body, string $to){
        $defaultArray = array();

        if (gettype($defaultArray) === gettype($body) && $to === Role::class){
            $mapper = new ArrayToRole();
        }else if (gettype($defaultArray) === gettype($body) && $to === User::class){
            $mapper = new ArrayToUser($this->cryptoService);
        }else if (gettype($defaultArray) === gettype($body) && $to === LoginDTO::class){
            $mapper = new ArrayToLoginDTO();
        }else if (gettype($defaultArray) === gettype($body) && $to === LoginResponseDTO::class){
            $mapper = new ArrayToLoginResponseDTO();
        }else if (gettype($defaultArray) === gettype($body) && $to === UserLogin::class){
            $mapper = new ArrayToUserLogin();
        }else if (gettype($defaultArray) === gettype($body) && $to === NewTokenDTO::class){
            $mapper = new ArrayToNewTokenDTO();
        }else if (gettype($defaultArray) === gettype($body) && $to === RefreshToken::class){
            $mapper = new ArrayToRefreshToken();
        }

        return $mapper->getMapping($body);
    }

}

?>
