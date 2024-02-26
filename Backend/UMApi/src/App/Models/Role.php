<?php 

declare(strict_types=1);

namespace App\Models;

class Role{
    private int $id;

    public function __construct(private string $name){
    }

    public function getName():string{
        return $this->name;
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

}

?>