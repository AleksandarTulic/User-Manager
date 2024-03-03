<?php

namespace App\Repositories;

use App\Database;
use App\Models\RoleRight;
use Exception;
use PDO;

class RoleRightsRepository{

    public function __construct(private Database $db){
    }

    public function isRequestValid(RoleRight $roleRight){
        $result = true;

        try{
            $pdo = $this->db->getConnection();
            $sql1 = 'SELECT count(*) as numberOfElements FROM role_rights rr, roles r 
                    WHERE rr.role_id = r.id and r.name in (';
            $sql2 = ' and rr.resource = :resource 
                    and rr.controller_method = :controller_method';

            foreach ($roleRight->getRoles() as $index => $role){
                $sql1 .= ":value_$index, ";
            }

            $sql1 = rtrim($sql1, ', ') . ')';
            $stmt = $pdo->prepare($sql1 . $sql2);

            foreach ($roleRight->getRoles() as $index => $role){
                $stmt->bindValue(":value_$index", $role->getName(), PDO::PARAM_STR);
            }

            $stmt->bindValue(':resource', $roleRight->getResource(), PDO::PARAM_STR);
            $stmt->bindValue(':controller_method', $roleRight->getControllerMethod(), PDO::PARAM_STR);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC)['numberOfElements'] >= 1;
        }catch (Exception $exc){
            $result = $exc->getMessage();
        }

        return $result;
    }

}

?>