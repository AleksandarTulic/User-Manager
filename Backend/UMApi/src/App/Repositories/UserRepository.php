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

        $stmt = $pdo->prepare('SELECT u.* FROM users u, sexes s 
                               WHERE u.sex_id = s.id and u.state = :state');
        $stmt->bindValue(':state', ProjectConstants::ACTIVE_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById(string $id):array|bool{
        $sql = 'SELECT * FROM users WHERE id=:id and state=:state';
        $pdo = $this->db->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->bindValue(':state', ProjectConstants::ACTIVE_STATE, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(User $user):string{
        $pdo = $this->db->getConnection();

        try{
            $pdo->beginTransaction();

            $sql1 = 'INSERT INTO users(username, password, salt, first_name, last_name, sex_id) 
                    VALUES(:username, :password, :salt, :first_name, :last_name, :sex_id)';

            $sql2 = 'INSERT INTO user_roles(user_id, role_id) values(:user_id, :role_id)';

            $stmt = $pdo->prepare($sql1);
            $stmt->bindValue(':username', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':password', $user->getPassword(), PDO::PARAM_STR);
            $stmt->bindValue(':salt', $user->getSalt(), PDO::PARAM_STR);
            $stmt->bindValue(':first_name', $user->getFirstName(), PDO::PARAM_STR);
            $stmt->bindValue(':last_name', $user->getLastName(), PDO::PARAM_STR);
            $stmt->bindValue(':sex_id', $user->getSexId(), PDO::PARAM_INT);
            $stmt->execute();

            $userId = $pdo->lastInsertId();
            $user->setId((int)$userId);

            $roles = $user->getUserRoles();
            foreach ($roles as $role){
                $stmt = $pdo->prepare($sql2);
                $stmt->bindValue(":user_id", $user->getId(), PDO::PARAM_INT);
                $stmt->bindValue(":role_id", $role, PDO::PARAM_INT);
                $stmt->execute();
            }

            $pdo->commit();

            return $userId;
        }catch (Exception $exc){
            $pdo->rollBack();

            return $exc->getMessage();
        }

        return "123";
    }

    public function update(int $id, User $user):int{
        $pdo = $this->db->getConnection();
        $rowsChanged = 0;

        try{
            $pdo->beginTransaction();

            $sql1 = 'UPDATE users 
                     SET username=:username, password=:password, salt=:salt, first_name=:first_name, last_name=:last_name, sex_id=:sex_id
                     WHERE id=:id';

            $sql2 = 'DELETE FROM user_roles WHERE user_id=:user_id';
            $sql3 = 'INSERT INTO user_roles(user_id, role_id) values(:user_id, :role_id)';

            $stmt = $pdo->prepare($sql1);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->bindValue(':username', $user->getUsername(), PDO::PARAM_STR);
            $stmt->bindValue(':password', $user->getPassword(), PDO::PARAM_STR);
            $stmt->bindValue(':salt', $user->getSalt(), PDO::PARAM_STR);
            $stmt->bindValue(':first_name', $user->getFirstName(), PDO::PARAM_STR);
            $stmt->bindValue(':last_name', $user->getLastName(), PDO::PARAM_STR);
            $stmt->bindValue(':sex_id', $user->getSexId(), PDO::PARAM_INT);
            $stmt->execute();

            $rowsChanged = $stmt->rowCount();

            $stmt = $pdo->prepare($sql2);
            $stmt->bindValue(':user_id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $roles = $user->getUserRoles();
            foreach ($roles as $role){
                $stmt = $pdo->prepare($sql3);
                $stmt->bindValue(":user_id", $id, PDO::PARAM_INT);
                $stmt->bindValue(":role_id", $role, PDO::PARAM_INT);
                $stmt->execute();
            }

            $pdo->commit();
        }catch (Exception $exc){
            $pdo->rollBack();
        }

        return $rowsChanged;
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