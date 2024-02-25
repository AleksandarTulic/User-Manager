<?php 

declare(strict_types=1);

namespace App\Models;

class User{

    private int $id;
    private string $username;
    private string $password;
    private string $salt;
    private int $firstName;
    private int $lastName;
    private string $sex;
}

?>