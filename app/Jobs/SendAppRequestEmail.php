<?php

namespace App\Jobs;

use App\Mail\AppRequestMail;
use App\Models\AppRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendAppRequestEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $appRequest;

    /**
     * Create a new job instance.
     */
    public function __construct(AppRequest $appRequest)
    {
        $this->appRequest = $appRequest;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Send email to admin
        $adminEmail = env('MAIL_FROM_ADDRESS', 'info@adktech.com');
        Mail::to($adminEmail)->send(new AppRequestMail($this->appRequest, true));

        // Send confirmation email to user
        Mail::to($this->appRequest->email)->send(new AppRequestMail($this->appRequest, false));
    }
}
