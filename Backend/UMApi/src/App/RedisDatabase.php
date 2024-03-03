<?php

namespace App;

use Predis\Client;

class RedisDatabase implements IDatabase{

    public function __construct(private string $host,
                                private int $port){
    }

    public function getConnection(): Client{
        $client = new Client([
            'host' => $this->host,
            'port' => $this->port
        ]);

        return $client;
    }

}

?>