<?php

namespace App\Http\Controllers;

use App\Helpers\NotificationHelper;
use App\Models\AppRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AppRequestController extends BasicController
{
    public $model = AppRequest::class;

    public function beforeSave(Request $request): array
    {
        $messages = [
            'name.required' => 'Name is required.',
            'name.string' => 'Name must be a text string.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must have the format user@domain.com.',
            'email.max' => 'Email must not exceed 320 characters.',
            'phone.string' => 'Phone must be a text string.',
            'building_name.required' => 'Building name is required.',
            'building_name.string' => 'Building name must be a text string.',
            'unit_number.string' => 'Unit number must be a text string.',
            'number_of_residents.integer' => 'Number of residents must be a number.',
            'service_interest.required' => 'Service interest is required.',
            'service_interest.string' => 'Service interest must be a text string.',
            'message.string' => 'Message must be a text string.'
        ];

        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|max:320',
            'phone' => 'nullable|string',
            'building_name' => 'required|string',
            'unit_number' => 'nullable|string',
            'number_of_residents' => 'nullable|integer',
            'service_interest' => 'required|string',
            'message' => 'nullable|string',
        ], $messages);

        return $validatedData;
    }

    public function afterSave(Request $request, object $jpa)
    {
        try {
            Log::info('AppRequestController - Iniciando envío de notificaciones', [
                'app_request_id' => $jpa->id,
                'client_email' => $jpa->email,
                'name' => $jpa->name
            ]);

            // Enviar notificación al cliente y al administrador usando el helper
            NotificationHelper::sendAppRequestNotification($jpa);

            Log::info('AppRequestController - Notificaciones enviadas exitosamente');

        } catch (\Exception $e) {
            Log::error('AppRequestController - Error al enviar notificaciones', [
                'app_request_id' => $jpa->id ?? 'unknown',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
