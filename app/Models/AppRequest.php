<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppRequest extends Model
{
    use HasFactory, HasUuids;
      public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'message',
        'seen',
        'status'
    ];

    protected $casts = [
        'seen' => 'boolean',
        'status' => 'boolean',
    ];
}
