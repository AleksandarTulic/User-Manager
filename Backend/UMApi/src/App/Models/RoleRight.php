<?php

namespace App\Models;

class RoleRight{

    private int $id;
    private int $roleId;
    private string $resource;
    private string $controllerMethod;

    private array $roles;

    //GETTERS

    public function getId(){
        return $this->id;
    }

    public function getRoleId(){
        return $this->roleId;
    }

    public function getResource(){
        return $this->resource;
    }

    public function getControllerMethod(){
        return $this->controllerMethod;
    }

    public function getRoles(){
        return $this->roles;
    }

    //SETTERS

    public function setId(int $id){
        $this->id = $id;
    }

    public function setRoleId(int $roleId){
        $this->roleId = $roleId;
    }

    public function setResource(string $resource){
        $this->resource = $resource;
    }

    public function setControllerMethod(string $controllerMethod){
        $this->controllerMethod = $controllerMethod;
    }

    public function setRoles(array $roles){
        $this->roles = $roles;
    }

}

?>