<?php 

declare(strict_types=1);

namespace App\Models;

use Doctrine\ORM\Mapping as ORM;

class Sex{

    private int $id;
    /**
     * @Assert\Length(
     *      min = 2,
     *      max = 100,
     *      minMessage = "SexName must be at least 2 characters long.",
     *      maxMessage = "SexName cannot be longer than 100 characters."
     * )
     */
    private string $name;
}

?>