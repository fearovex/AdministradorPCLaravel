<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CMSController extends Controller
{
    public function imgUpload(Request $request){
        // dd($request);
        $img = str_replace('data:image/jpeg;base64,', '', $request->input('fileBackground'));
        $img = str_replace('', '+', $img);
        $file = "/backgroundImg.jpeg";
        echo file_put_contents(storage_path('/temporaryImg').$file, base64_decode($img));
    }
}
