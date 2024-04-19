<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Dotenv\Validator;

class FormController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|unique:users',
            'pwd' => 'required|string|min:5',        ]);

        User::create($validatedData);

        return response()->json(['message' => 'Data submitted successfully!']);
    }
}
