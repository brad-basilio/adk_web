<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Mail\RawHtmlMail;

class AppRequestNotification extends Notification
{
    use Queueable;

    protected $appRequest;
    protected $recipientEmail;

    public function __construct($appRequest, $recipientEmail)
    {
        $this->appRequest = $appRequest;
        $this->recipientEmail = $recipientEmail;
    }

    /**
     * Variables disponibles para la plantilla de email.
     */
    public static function availableVariables()
    {
        return [
            'nombre' => 'Name of the requester',
            'email' => 'Email of the requester',
            'telefono' => 'Phone number',
            'edificio' => 'Building name',
            'unidad' => 'Unit number',
            'numero_residentes' => 'Number of residents',
            'servicio_interes' => 'Service interest',
            'mensaje' => 'Message content',
            'fecha_solicitud' => 'Request date',
            'year' => 'Current year',
        ];
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $template = \App\Models\General::where('correlative', 'app_request_client_email')
            ->where('lang_id', app('current_lang_id'))
            ->first();
            
        if (!$template) {
            throw new \Exception('Email template app_request_client_email not found in generals table');
        }
        
        $body = \App\Helpers\Text::replaceData($template->description, [
            'nombre' => $this->appRequest->name,
            'email' => $this->appRequest->email,
            'telefono' => $this->appRequest->phone ?? 'Not specified',
            'edificio' => $this->appRequest->building_name ?? 'Not specified',
            'unidad' => $this->appRequest->unit_number ?? 'Not specified',
            'numero_residentes' => $this->appRequest->number_of_residents ?? 'Not specified',
            'servicio_interes' => $this->appRequest->service_interest ?? 'Not specified',
            'mensaje' => $this->appRequest->message ?? 'No message provided',
            'year' => date('Y'),
            'fecha_solicitud' => $this->appRequest->created_at
                ? $this->appRequest->created_at->format('F d, Y')
                : '',
        ]);

        return (new RawHtmlMail(
            $body,
            'Thank you for your interest in ADK Assist',
            $this->recipientEmail
        ));
    }
}
