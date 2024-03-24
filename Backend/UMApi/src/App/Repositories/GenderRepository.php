<?php

namespace App\Repositories;

use PDO;
use App\Database;
use App\Constants\ProjectConstants;

class GenderRepository{

    public function __construct(private Database $db){
    }

    public function getAll(){
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('SELECT * FROM sexes');
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}

?>