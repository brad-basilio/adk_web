<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $appRequest;
    public $isAdminNotification;

    /**
     * Create a new message instance.
     */
    public function __construct($appRequest, $isAdminNotification = false)
    {
        $this->appRequest = $appRequest;
        $this->isAdminNotification = $isAdminNotification;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = $this->isAdminNotification 
            ? 'New ADK Assist App Request' 
            : 'Thank you for your interest in ADK Assist';
            
        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $view = $this->isAdminNotification 
            ? 'mailing.app-request-admin' 
            : 'mailing.app-request-user';
            
        return new Content(
            view: $view,
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
