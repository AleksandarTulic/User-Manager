<?php 

namespace App\Models;

class User{

    private ?int $id;
    private ?string $username;
    private ?string $password;
    private ?string $salt;
    private ?string $firstName;
    private ?string $lastName;
    private ?int $sexId;

    private ?array $roles;

    public function __construct(){
    }

    //SETTERS

    public function setId(int $id):void{
        $this->id =$id;
    }

    public function setUsername(string $username):void{
        $this->username =$username;
    }

    public function setPassword(string $password):void{
        $this->password =$password;
    }

    public function setSalt(string $salt):void{
        $this->salt =$salt;
    }

    public function setFirstName(string $firstName):void{
        $this->firstName =$firstName;
    }

    public function setLastName(string $lastName):void{
        $this->lastName =$lastName;
    }

    public function setSexId(int $sexId):void{
        $this->sexId =$sexId;
    }

    public function setUserRoles(array $roles):void{
        $this->roles = $roles;
    }

    //GETTERS

    public function getId():int{
        return $this->id;
    }

    public function getUsername():string{
        return $this->username;
    }

    public function getPassword():string{
        return $this->password;
    }

    public function getSalt():string{
        return $this->salt;
    }

    public function getFirstName():string{
        return $this->firstName;
    }

    public function getLastName():string{
        return $this->lastName;
    }

    public function getSexId():int{
        return $this->sexId;
    }

    public function getUserRoles():array{
        return $this->roles;
    }
}

?>