<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends BasicController
{
    public $model = Staff::class;
    public $reactRootView = 'public';

    public function beforeSave(Request $request)
    {
        $data = $request->except(['_token', '_method']);

        // Manejar characteristics
        if (isset($data['characteristics'])) {
            // Si ya es un string JSON válido, dejarlo como está
            if (is_string($data['characteristics'])) {
                // Verificar si es JSON válido
                $decoded = json_decode($data['characteristics'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    // Es JSON válido, mantenerlo como string
                    $data['characteristics'] = $data['characteristics'];
                } else {
                    // No es JSON, convertir a JSON
                    $data['characteristics'] = json_encode([$data['characteristics']]);
                }
            } elseif (is_array($data['characteristics'])) {
                // Si es array, convertir a JSON
                $data['characteristics'] = json_encode($data['characteristics']);
            }
        }

        // Manejar socials
        if (isset($data['socials'])) {
            // Si ya es un string JSON válido, dejarlo como está
            if (is_string($data['socials'])) {
                // Verificar si es JSON válido
                $decoded = json_decode($data['socials'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    // Es JSON válido, mantenerlo como string
                    $data['socials'] = $data['socials'];
                } else {
                    // No es JSON, convertir a JSON
                    $data['socials'] = json_encode([$data['socials']]);
                }
            } elseif (is_array($data['socials'])) {
                // Si es array, convertir a JSON
                $data['socials'] = json_encode($data['socials']);
            }
        }

        return $data;
    }
}
