<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'image',
        'job',
        'name',
        'description',
        'visible',
        'status',
        'slug',
        'characteristics',
        'socials',
        'lang_id'
    ];
    
    protected $casts = [
        'visible' => 'boolean',
        'status' => 'boolean'
    ];

    // Accessors para manejar JSON manualmente
    public function getCharacteristicsAttribute($value)
    {
        if (is_null($value)) return [];
        if (is_array($value)) return $value;
        
        $decoded = json_decode($value, true);
        return json_last_error() === JSON_ERROR_NONE ? $decoded : [];
    }

    public function getSocialsAttribute($value)
    {
        if (is_null($value)) return [];
        if (is_array($value)) return $value;
        
        $decoded = json_decode($value, true);
        return json_last_error() === JSON_ERROR_NONE ? $decoded : [];
    }

    public function lang()
    {
        return $this->belongsTo(Lang::class);
    }
}
