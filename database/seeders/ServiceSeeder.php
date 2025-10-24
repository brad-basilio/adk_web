<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Lang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar todos los servicios existentes
        $this->command->info('Limpiando servicios existentes...');
        Service::query()->delete();
        
        // Obtener el idioma por defecto
        $lang = Lang::where('is_default', true)->first() ?? Lang::first();

        if (!$lang) {
            $this->command->error('No se encontró ningún idioma. Por favor crea primero un idioma.');
            return;
        }

        $services = [
            [
                'title' => 'Tech Support',
                'description' => 'Comprehensive technical assistance and troubleshooting solutions for all your technology needs, available 24/7.',
                'characteristics' => [
                    'Technical Troubleshooting',
                    'Product Support',
                    'Software Solutions',
                    'Hardware Assistance',
                    'Remote Support',
                    'On-Site Assistance',
                    'Network Setup & Configuration',
                    'System Optimization'
                ],
                'benefits' => 'Our tech support team provides rapid response times and expert solutions to keep your business running smoothly. With 24/7 availability and a proven track record of resolving complex technical issues, we ensure minimal downtime and maximum productivity for your organization.',
                'color' => '#0066ffe6',
            ],
            [
                'title' => 'Cyber Security',
                'description' => 'Advanced cybersecurity solutions to protect your business from evolving digital threats and ensure data integrity.',
                'characteristics' => [
                    'Endpoint Protection',
                    'Identity & Access Management',
                    'Firewall Management',
                    'Intrusion Detection',
                    'Penetration Testing',
                    'Incident Response',
                    'Cloud Security',
                    'Managed Detection & Response',
                    'Security Audits',
                    'Compliance Management'
                ],
                'benefits' => 'Protect your digital assets with enterprise-grade security solutions. Our comprehensive approach combines advanced threat detection, proactive monitoring, and rapid incident response to safeguard your business against cyber threats. Stay compliant with industry regulations while maintaining robust security posture.',
             'color' => '#0066ffe6',
            ],
            [
                'title' => 'Smart Home',
                'description' => 'Transform your living space with cutting-edge smart home automation and integrated control systems.',
                'characteristics' => [
                    'Smart Security Systems',
                    'Home Automation',
                    'Smart Lighting Control',
                    'Climate Control',
                    'Entertainment Systems',
                    'Voice Assistant Integration',
                    'Home Networking',
                    'Remote Monitoring',
                    'Energy Management',
                    'Smart Appliances'
                ],
                'benefits' => 'Experience the future of living with our smart home solutions. Enjoy enhanced comfort, improved energy efficiency, and complete control of your home environment from anywhere. Our expert installation and seamless integration ensure your smart home works perfectly with your lifestyle.',
              'color' => '#0066ffe6',
            ],
            [
                'title' => 'Cloud Solutions',
                'description' => 'Scalable cloud infrastructure and migration services to power your business growth and digital transformation.',
                'characteristics' => [
                    'Cloud Migration',
                    'Infrastructure as a Service',
                    'Cloud Storage Solutions',
                    'Backup & Disaster Recovery',
                    'Multi-Cloud Management',
                    'Cost Optimization',
                    'DevOps Integration',
                    'Scalability Solutions'
                ],
                'benefits' => 'Leverage the power of cloud computing to scale your business efficiently. Our cloud solutions provide flexibility, reliability, and cost-effectiveness while ensuring your data is secure and accessible. From migration to ongoing management, we handle all aspects of your cloud infrastructure.',
              'color' => '#0066ffe6',
            ],
        ];

        foreach ($services as $serviceData) {
            Service::create([
                'title' => $serviceData['title'],
                'slug' => Str::slug($serviceData['title']),
                'description' => $serviceData['description'],
                'characteristics' => $serviceData['characteristics'],
                'benefits' => $serviceData['benefits'],
                'color' => $serviceData['color'],
                'status' => true,
                'visible' => true,
                'featured' => true,
                'lang_id' => $lang->id,
            ]);
        }

        $this->command->info('Services seeded successfully!');
    }
}
