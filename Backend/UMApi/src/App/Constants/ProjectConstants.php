<?php 

declare(strict_types=1);

namespace App\Constants;

class ProjectConstants{
    // ITEM STATES
    public const ACTIVE_STATE = 3;
    public const DISABLED_STATE = 9;

    // md5('UserManager')
    public const HMAC_SECRET_KEY = "5bc60ecde7504983e9906e0f9aa59ed7";

    // 30 minutes
    public const TOKEN_TTL = 1800;
}

?>