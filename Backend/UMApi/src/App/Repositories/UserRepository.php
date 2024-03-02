<?php 

declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Database;
use App\Constants\ProjectConstants;
use App\Models\User;
use Exception;

class UserRepository{

    public function __construct(private Database $db){
    }

    public function getAll():array{
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare('SELECT * FROM users u, roles r, user_roles ur, sexes s 
                               WHERE u.sex_id = s.id and r.id = ur.role_id and u.id = ur.user_id and u.state = 3');
        $stmt->bindValue(':state', ProjectConstants::ACTIVE_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create(User $user, array $roles):string{
        $pdo = $this->db->getConnection();

        try{
            $pdo->beginTransaction();

            $sql1 = 'INSERT INTO users(username, password, salt, first_name, last_name, sex_id) 
                    VALUES(:username, :password, :salt, :first_name, :last_name, :sex_id)';

            $sql2 = 'INSERT INTO user_roles(user_id, role_id) values(:user_id, :role_id)';

            $stmt = $pdo->prepare($sql1);
            $stmt->bindValue(':username', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':password', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':salt', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':first_name', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':last_name', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':sex_id', $user->getUsername(), PDO::PARAM_INT);
            $stmt->execute();

            $userId = $pdo->lastInsertId();

            foreach ($roles as $role){
                $stmt = $pdo->prepare($sql2);
                $stmt->bindValue(":user_id", $user->getId(), PDO::PARAM_INT);
                $stmt->bindValue(":role_id", $role->getId(), PDO::PARAM_INT);
                $stmt->execute();
            }

            return $userId;
        }catch (Exception $exc){
            $pdo->rollBack();
        }
    }

    public function delete(int $id):int{
        $sql = 'UPDATE users SET state=:state where id=:id';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->bindValue(':state', ProjectConstants::DISABLED_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount();
    }

}