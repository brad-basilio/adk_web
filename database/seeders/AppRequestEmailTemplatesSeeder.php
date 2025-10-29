<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\General;

class AppRequestEmailTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todos los idiomas
        $languages = \App\Models\Lang::all();
        
        if ($languages->isEmpty()) {
            $this->command->warn('No languages found in database. Creating templates without lang_id.');
            $languages = collect([null]);
        }

        $templates = [
            [
                'correlative' => 'app_request_client_email',
                'name' => 'Email template for app request confirmation (user)',
                'description' => <<<'HTML'
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #d4af37;
        }
        .header p {
            margin: 10px 0 0 0;
            color: #ccc;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .message-box {
            background: #f8f8f8;
            border-left: 4px solid #d4af37;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(135deg, #d4af37 0%, #c4941f 100%);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            margin: 20px 0;
            font-weight: bold;
            text-align: center;
        }
        .footer {
            background: #1a1a1a;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
        }
        .footer a {
            color: #d4af37;
            text-decoration: none;
        }
        .icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="icon">📱</div>
            <h1>Thank You for Your Interest!</h1>
            <p>We received your request about ADK Assist</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello <strong>{{nombre}}</strong>,
            </div>

            <p>
                Thank you for expressing your interest in <strong>ADK Assist</strong>, your personal tech support companion. 
                We're excited to help you learn more about our app!
            </p>

            <div class="message-box">
                <p style="margin: 0; color: #666;">
                    <strong>📋 Your Request Summary:</strong>
                </p>
                <p style="margin: 10px 0 0 0;">
                    Our team has received your inquiry and will review the details you provided. 
                    We'll get back to you within 24-48 hours with comprehensive information about ADK Assist.
                </p>
            </div>

            <p>
                <strong>What happens next?</strong>
            </p>
            <ul style="color: #666; line-height: 2;">
                <li>Our team will review your request</li>
                <li>We'll prepare personalized information based on your needs</li>
                <li>You'll receive a detailed response via email</li>
                <li>We're here to answer any questions you may have</li>
            </ul>

            <p>
                In the meantime, you can check out ADK Assist on the App Store:
            </p>

            <center>
                <a href="https://apps.apple.com/pe/app/adk-assist-v2-0/id6753195828?l=en-GB" class="button">
                    Download on App Store
                </a>
            </center>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                If you have any urgent questions, feel free to reply to this email.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>ADK Tech</strong></p>
            <p>Your Personal Tech Support Companion</p>
            <p style="margin-top: 15px;">
                <a href="mailto:{{email}}">{{email}}</a>
            </p>
            <p>&copy; {{year}}</p>
        </div>
    </div>
</body>
</html>
HTML
                ,
            ],
            
            [
                'correlative' => 'app_request_admin_email',
                'name' => 'Email template for app request notification (admin)',
                'description' => <<<'HTML'
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #d4af37;
        }
        .content {
            padding: 30px;
        }
        .info-row {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #666;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
        }
        .footer {
            background: #f8f8f8;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .badge {
            display: inline-block;
            background: #d4af37;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New ADK Assist Request</h1>
            <span class="badge">Admin Notification</span>
        </div>
        
        <div class="content">
            <p style="font-size: 16px; margin-bottom: 25px;">
                You have received a new request for information about the ADK Assist app.
            </p>

            <div class="info-row">
                <div class="label">Name:</div>
                <div class="value">{{customer_name}}</div>
            </div>

            <div class="info-row">
                <div class="label">Email:</div>
                <div class="value">{{customer_email}}</div>
            </div>

            <div class="info-row">
                <div class="label">Phone:</div>
                <div class="value">{{customer_phone}}</div>
            </div>

            <div class="info-row">
                <div class="label">Company:</div>
                <div class="value">{{customer_company}}</div>
            </div>

            <div class="info-row">
                <div class="label">Message:</div>
                <div class="value">{{message_content}}</div>
            </div>

            <div class="info-row">
                <div class="label">Request Date:</div>
                <div class="value">{{fecha_solicitud}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p style="margin: 0;">This is an automated notification from ADK Tech</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Please respond to this request promptly</p>
            <p>&copy; {{year}}</p>
        </div>
    </div>
</body>
</html>
HTML
                ,
            ],
        ];

        foreach ($languages as $lang) {
            foreach ($templates as $template) {
                $data = $template;
                if ($lang) {
                    $data['lang_id'] = $lang->id;
                }
                
                \App\Models\General::updateOrCreate(
                    [
                        'correlative' => $template['correlative'],
                        'lang_id' => $lang ? $lang->id : null
                    ],
                    $data
                );
            }
        }

        $this->command->info('App request email templates seeded successfully for all languages!');
    }
}

