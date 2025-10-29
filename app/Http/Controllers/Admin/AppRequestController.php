<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\AppRequest;

class AppRequestController extends BasicController
{
   public $model = AppRequest::class;
   public $reactView = 'Admin/AppRequests';

   public function setPaginationInstance(string $model)
   {
      return $model::where('status', true);
   }
}
