<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Service;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;

class StaffController extends BasicController

{
    public $model = Staff::class;
    public $reactView = 'Admin/Staff';
    public $imageFields = ['image'];

    public function beforeSave(Request $request)
    {
        $body = $request->all();



        // Procesar características
        if ($request->has('characteristics')) {
            $characteristics = json_decode($request->characteristics, true);
            $body['characteristics'] = array_values(array_filter($characteristics, function ($item) {
                return !empty(trim($item));
            }));
        }
        
        // Procesar redes sociales (ahora son objetos con social y link)
        if ($request->has('socials')) {
            $socials = json_decode($request->socials, true);
            $body['socials'] = array_values(array_filter($socials, function ($item) {
                // Verificar que sea un array con 'social' y 'link'
                return is_array($item) && 
                       isset($item['social']) && 
                       isset($item['link']) && 
                       !empty(trim($item['social'])) && 
                       !empty(trim($item['link']));
            }));
        }

        

        return $body;
    }

    public function afterSave(Request $request, $staff)
    {
        // Eliminar imágenes marcadas para borrar (si implementas esta función)
        return $staff;
    }
}
