<?php 

namespace App\Repositories;

use PDO;
use App\Database;
use App\Constants\ProjectConstants;
use App\Models\DTO\LoginDTO;
use App\Models\User;
use App\Models\UserLogin;
use App\Services\CryptoService;
use Exception;
use PDOException;

class UserLoginRepository{

    public function __construct(private Database $db){
    }

    public function create(UserLogin $userLogin):string{
        $result = "";

        try{
            $pdo = $this->db->getConnection();

            $stmt = $pdo->prepare('INSERT INTO user_logins(token, ip, created_dt, user_id)
                                   VALUES(:token, :ip, :created_dt, :user_id)'
            );

            $stmt->bindValue(':token', $userLogin->getToken(), PDO::PARAM_STR);
            $stmt->bindValue(':ip', $userLogin->getIp(), PDO::PARAM_STR);
            $stmt->bindValue(':created_dt', $userLogin->getCreateAt(), PDO::PARAM_STR);
            $stmt->bindValue(':user_id', $userLogin->getUserId(), PDO::PARAM_INT);
            $stmt->execute();

            $result = $pdo->lastInsertId();
        }catch (Exception $exc){
        }

        return $result;
    }

}
