<?php 

use App\Database;
use App\RedisDatabase;

return [

    Database::class => function(){
        return new Database(host: '127.0.0.1:3306', name: 'UserManagerDB', user: 'root', password: '');
    },
    RedisDatabase::class => function(){
        return new RedisDatabase(host: '127.0.0.1', port: 6379);
    }

];

?>