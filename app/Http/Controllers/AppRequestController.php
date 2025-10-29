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
            'company.string' => 'Company must be a text string.',
            'message.string' => 'Message must be a text string.'
        ];

        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|max:320',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
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
