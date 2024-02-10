<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TwoUsersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_1' => 'required|integer',
            'user_2' => 'required|integer'
        ];
    }
}
