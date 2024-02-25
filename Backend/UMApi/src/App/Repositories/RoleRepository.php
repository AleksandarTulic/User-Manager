<?php 

declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Database;

class RoleRepository{

    public function __construct(private Database $db){
    }

    public function getAll():array{
        $pdo = $this->db->getConnection();

        $stmt = $pdo->query('SELECT * FROM roles');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById(int $id):array|bool{
        $sql = 'SELECT * FROM roles WHERE id=:id';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}

?>