<?php 

use App\Database;

return [

    Database::class => function(){
        return new Database(host: '127.0.0.1:3307', name: 'UserManagerDB', user: 'root', password: '');
    }

];

?>