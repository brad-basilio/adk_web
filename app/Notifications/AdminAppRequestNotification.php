<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Mail\RawHtmlMail;

class AdminAppRequestNotification extends Notification
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
            'customer_name' => 'Name of the requester',
            'customer_email' => 'Email of the requester',
            'customer_phone' => 'Phone number',
            'customer_company' => 'Company name',
            'message_content' => 'Message content',
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
        $template = \App\Models\General::where('correlative', 'app_request_admin_email')
            ->where('lang_id', app('current_lang_id'))
            ->first();
            
        if (!$template) {
            throw new \Exception('Email template app_request_admin_email not found in generals table');
        }
        
        $body = \App\Helpers\Text::replaceData($template->description, [
            'customer_name' => $this->appRequest->name,
            'customer_email' => $this->appRequest->email,
            'customer_phone' => $this->appRequest->phone ?? 'Not specified',
            'customer_company' => $this->appRequest->company ?? 'Not specified',
            'message_content' => $this->appRequest->message ?? 'No message provided',
            'year' => date('Y'),
            'fecha_solicitud' => $this->appRequest->created_at
                ? $this->appRequest->created_at->format('F d, Y - H:i:s')
                : '',
        ]);

        return (new RawHtmlMail(
            $body,
            'New ADK Assist App Request - ' . $this->appRequest->name,
            $this->recipientEmail
        ));
    }
}
