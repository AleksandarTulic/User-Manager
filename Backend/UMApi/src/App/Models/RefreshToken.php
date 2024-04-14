<?php 

declare(strict_types=1);

namespace App\Models;

class RefreshToken{
    private int $id;
    private string $token;
    private string $ip;
    private string $createdAt;
    private string $expiresAt;
    private int $numberOfTimes;
    private int $userId;

    public function __construct(){
    }

    public function getToken():string{
        return $this->token;
    }

    public function setToken(string $token):void{
        $this->token = $token;
    }

    public function getId():string{
        return $this->id;
    }

    public function setId(string $id):void{
        $this->id = $id;
    }

    public function getIp():string{
        return $this->ip;
    }

    public function setIp(string $ip):void{
        $this->ip = $ip;
    }

    public function getUserId():string{
        return $this->userId;
    }

    public function setUserId(string $userId):void{
        $this->userId = $userId;
    }

    public function getNumberOfTimes():string{
        return $this->numberOfTimes;
    }

    public function setNumberOfTimes(string $numberOfTimes):void{
        $this->getNumberOfTimes = $numberOfTimes;
    }

    public function getCreatedAt():string{
        return $this->createdAt;
    }

    public function setCreatedAt(string $createdAt):void{
        $this->createdAt = $createdAt;
    }

    public function getExpiresAt():string{
        return $this->expiresAt;
    }

    public function setExpiresAt(string $expiresAt):void{
        $this->expiresAt = $expiresAt;
    }

}

?>