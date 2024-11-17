<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
	public function index()
	{	
	    if (Auth::check()) {
            return redirect("/");
	    }
	    return view('login');
	}
	
	public function login(Request $request)
	{
	    $request->validate([
	        'email' => 'required',
	        'password' => 'required',
	    ]);
	
	    $credentials = $request->only('email', 'password');
	    if (Auth::attempt($credentials)) {
	        return redirect("/");
	    }
	    return redirect("/login")->withError('Los datos introducidos no son correctos');
	}
	public function apiLogin(Request $request)
	{
	    $request->validate([
	        'email' => 'required',
	        'password' => 'required',
	    ]);
	
	    $credentials = $request->only('email', 'password');
	    if (Auth::attempt($credentials)) {
			// Authenticate user successfully
			$user = Auth::user();
			// Create a token for the authenticated user
			$token = $user->createToken('auth_token')->plainTextToken;
			
			// Return success response with the token
			return response()->json([
				'access_token' => $token,
				'token_type' => 'Bearer',
			], 200);
		}
	
		return response()->json(['error' => 'Los datos introducidos no son correctos'], 401);
	}
}

                            