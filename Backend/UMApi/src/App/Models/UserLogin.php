<?php

namespace App\Models;

class UserLogin{

    private int $id;
    private string $token;
    private string $ip;
    private string $createdDT;
    private int $userId;

    // SETTERS

    public function setUserId(int $userId){
        $this->userId = $userId;
    }

    public function setCreatedDT(string $createdDT){
        $this->createdDT = $createdDT;
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

    public function getCreateDT(){
        return $this->createdDT;
    }

    public function getUserId(){
        return $this->userId;
    }

}

?>