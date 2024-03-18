<?php

namespace App\Models;

class UserLogin{

    private int $id;
    private string $token;
    private string $ip;
    private string $createdAt;
    private int $userId;

    public function __construct(string $token = null, string $ip = null, string $createdAt = null, int $userId = null){
        if ($userId !== null){
            $this->userId = $userId;
        }

        if ($createdAt !== null){
            $this->createdAt = $createdAt;
        }

        if ($ip !== null){
            $this->ip = $ip;
        }
            
        if ($token !== null){
            $this->token = $token;
        }
    }

    // SETTERS

    public function setUserId(int $userId){
        $this->userId = $userId;
    }

    public function setCreatedAt(string $createdAt){
        $this->createdAt = $createdAt;
    }

    public function setIp(string $ip){
        $this->ip = $ip;
    }

    public function setToken(string $token){
        $this->token = $token;
    }

    public function setId(int $id){
        $this->id = $id;
    }

    // GETTERS

    public function getId(){
        return $this->id;
    }

    public function getToken(){
        return $this->token;
    }

    public function getIp(){
        return $this->ip;
    }

    public function getCreateAt(){
        return $this->createdAt;
    }

    public function getUserId(){
        return $this->userId;
    }

}

?>
