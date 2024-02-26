<?php 

declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Database;
use App\Models\Role;
use App\Constants\ProjectConstants;

class RoleRepository{

    public function __construct(private Database $db){
    }

    public function getAll():array{
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('SELECT * FROM roles WHERE state=:state');
        $stmt->bindValue(':state', ProjectConstants::ACTIVE_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById(int $id):array|bool{
        $sql = 'SELECT * FROM roles WHERE id=:id and state=:state';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->bindValue(':state', ProjectConstants::ACTIVE_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(Role $role):string{
        $sql = 'INSERT INTO roles(name) VALUES(:name)';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':name', $role->getName(), PDO::PARAM_STR);
        $stmt->execute();

        return $pdo->lastInsertId();
    }

    public function update(int $id, Role $role):int{
        $sql = 'UPDATE roles SET name=:name where id=:id';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->bindValue(':name', $role->getName(), PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->rowCount();
    }

    public function delete(int $id):int{
        $sql = 'UPDATE roles SET state=:state where id=:id';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->bindValue(':state', ProjectConstants::DISABLED_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount();
    }

}

?>