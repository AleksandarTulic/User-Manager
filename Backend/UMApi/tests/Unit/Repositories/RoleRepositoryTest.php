<?php 

namespace Unit\Repositories;

use App\Database;
use App\Models\Role;
use PHPUnit\Framework\TestCase;
use App\Repositories\RoleRepository;
use Unit\Config\Config;
use PDOException;

require_once __DIR__ . '/../Config/Config.php';

class RoleRepositoryTest extends TestCase{

    private ?RoleRepository $repo;

    protected function setUp(): void{
        $this->repo = new RoleRepository(
            new Database(
                host: Config::DB['HOST'] . ':' . Config::DB['PORT'],
                name: Config::DB['NAME'],
                user: Config::DB['USERNAME'],
                password: Config::DB['PASSWORD']
            )
        );
    }

    public function testGetById(){
        $result = $this->repo->getById(1);

        $this->assertNotNull($result);
    }

    public function testCreate(){
        $role = new Role('test-admin');

        $result = $this->repo->create($role);
        
        $result = $this->repo->getById((int)$result);

        $this->assertArrayHasKey('id', $result);
        $this->assertArrayHasKey('name', $result);
        $this->assertEquals($result['name'], $role->getName());
    }

    public function testCreateDoubleEntry(){
        $role = new Role('test-admin');

        $this->expectException(PDOException::class);
        
        $result = $this->repo->create($role);
    }

    protected function tearDown(): void{
        $this->repo = null;
    }

}

?>