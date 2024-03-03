<?php

namespace App\Repositories;

use App\RedisDatabase;
use Exception;
use Predis\Client;

class LoginRedisRepository{

    public function __construct(private RedisDatabase $db){
    }

    public function logInUser(string $username, string $token){
        try{
            $client = $this->db->getConnection();
            
            $client->set($username, $token);
        }catch (Exception $exc){
        }
    }

    public function getUserToken(string $username){
        $result = false;

        try{
            $client = $this->db->getConnection();
            
            $result = $client->get($username);
        }catch (Exception $exc){
        }

        return $result;
    }

}

?>