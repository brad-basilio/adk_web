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

        // Si es un nuevo registro (no tiene ID), asignar el orden automáticamente
        if (!$request->has('id') || empty($request->id)) {
            // Obtener el máximo orden actual y sumar 1
            $maxOrder = Staff::max('order') ?? -1;
            $body['order'] = $maxOrder + 1;
        }

        // Procesar características
        if ($request->has('characteristics')) {
            $characteristics = json_decode($request->characteristics, true);
            $filtered = array_values(array_filter($characteristics, function ($item) {
                return !empty(trim($item));
            }));
            $body['characteristics'] = json_encode($filtered);
        }
        
        // Procesar redes sociales (ahora son objetos con social y link)
        if ($request->has('socials')) {
            $socials = json_decode($request->socials, true);
            $filtered = array_values(array_filter($socials, function ($item) {
                // Verificar que sea un array con 'social' y 'link'
                return is_array($item) && 
                       isset($item['social']) && 
                       isset($item['link']) && 
                       !empty(trim($item['social'])) && 
                       !empty(trim($item['link']));
            }));
            $body['socials'] = json_encode($filtered);
        }

        return $body;
    }

    public function afterSave(Request $request, $staff)
    {
        // Eliminar imágenes marcadas para borrar (si implementas esta función)
        return $staff;
    }

    public function reorder(Request $request)
    {
        $response = new Response();
        try {
            $items = $request->input('items');
            foreach ($items as $item) {
                Staff::where('id', $item['id'])->update(['order' => $item['order']]);
            }
            $response->status = 200;
            $response->message = 'Orden actualizado correctamente';
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage();
        } finally {
            return response($response->toArray(), $response->status);
        }
    }
}
