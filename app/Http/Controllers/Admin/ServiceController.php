<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;

class ServiceController extends BasicController

{
    public $model = Service::class;
    public $reactView = 'Admin/Services';
    public $imageFields = ['image','icon'];

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        // Si es un nuevo registro (no tiene ID), asignar el orden automáticamente
        if (!$request->has('id') || empty($request->id)) {
            // Obtener el máximo orden actual y sumar 1
            $maxOrder = Service::max('order') ?? -1;
            $body['order'] = $maxOrder + 1;
        }

        // Procesar galería de imágenes
        $gallery = [];

        // Agregar imágenes nuevas
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $uuid = Crypto::randomUUID();
                $ext = $file->getClientOriginalExtension();
                $path = "images/service/{$uuid}.{$ext}";
                Storage::put($path, file_get_contents($file));
                $gallery[] = "{$uuid}.{$ext}";
            }
        }

        // Mantener imágenes existentes
        if ($request->has('existing_gallery')) {
            $existing = json_decode($request->existing_gallery, true);
            $gallery = array_merge($gallery, $existing);
        }

        $body['gallery'] = $gallery;

        // Procesar características
        if ($request->has('characteristics')) {
            $characteristics = json_decode($request->characteristics, true);
            $body['characteristics'] = array_values(array_filter($characteristics, function ($item) {
                return !empty(trim($item));
            }));
        }

        // Procesar benefits (ya viene como string, solo asegurarse que existe)
        if (!$request->has('benefits')) {
            $body['benefits'] = null;
        }

        return $body;
    }

    public function afterSave(Request $request, $service)
    {
        // Eliminar imágenes marcadas para borrar (si implementas esta función)
        return $service;
    }

    public function reorder(Request $request)
    {
        $response = new Response();
        try {
            $items = $request->input('items');
            foreach ($items as $item) {
                Service::where('id', $item['id'])->update(['order' => $item['order']]);
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
