<?php

namespace App\Repositories;

use PDO;
use App\Database;
use App\Constants\ProjectConstants;
use Models\RefreshToken;

class RefreshTokenRepository{

    public function __construct(private Database $db){
    }

    public function checkIfExpired(RefreshToken $token){
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('SELECT * FROM refresh_tokens WHERE token=:token and now() >= created_at and now() <= expires_at');
        $stmt->bindValue(':token', $token->getToken(), PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(RefreshToken $token){
        $sql = 'INSERT INTO refresh_tokens(token, ip, number_of_times, user_id, created_at, expires_at) VALUES(:token, :ip, :number_of_times, :user_id, :created_at, :expires_at)';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':token', $token->getToken(), PDO::PARAM_STR);
        $stmt->bindValue(':ip', $token->getIp(), PDO::PARAM_STR);
        $stmt->bindValue(':number_of_times', $token->getNumberOfTimes(), PDO::PARAM_INT);
        $stmt->bindValue(':user_id', $token->getUserId(), PDO::PARAM_INT);
        $stmt->bindValue(':created_at', $token->getCreatedAt(), PDO::PARAM_STR);
        $stmt->bindValue(':expires_at', $token->getExpiresAt(), PDO::PARAM_STR);
        $stmt->execute();

        return $pdo->lastInsertId();
    }

}

?>