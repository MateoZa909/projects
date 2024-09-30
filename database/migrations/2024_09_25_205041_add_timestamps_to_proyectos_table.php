<!--
 ?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     @return void
    public function up()
    {
        Schema::table('proyectos', function (Blueprint $table) {
            $table->timestamps(); // Agrega created_at y updated_at
        });
    }

     @return void
    public function down()
    {
        Schema::table('proyectos', function (Blueprint $table) {
            $table->dropTimestamps(); // Elimina created_at y updated_at
        });
    }
}; -->
