<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gdp_users', function (Blueprint $table) {
            $table->id(); // Creates a unique ID for each user (automatically increases)
            $table->string('email')->unique(); // Stores the user's email address (unique means no two users can have the same email)
            $table->string('pwd'); // Stores the user's password (it will be securely hashed later)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gdp_users');
    }
};
