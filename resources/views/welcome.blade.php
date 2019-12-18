<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000">
    
    <link rel="shortcut icon" href="{{asset('favicon.ico')}}">
    <!-- Use For Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Use For Material Iconic Font -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <!-- Use For Simple Line Icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css" />
    <!-- Use For Leaflet Map -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.1.0/leaflet.css" />
    <!-- Use For Jvector Map -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css" type="text/css"
        media="screen" />
    <!-- Use For Google Font -->
    <link href="https://fonts.googleapis.com/css?family=Heebo:100,300,400,500,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/login.css')}}">

    <style>
        h1, h2, h3, h4, h5, h6, input, button, select, span, table, th, td, p{
          font-family: 'Montserrat', sans-serif !important;
        }
    </style>

    <script>
        @if(!session('active'))
            localStorage.clear();
        @endif
        localStorage.setItem('urlDomain', '{{env("APP_URL")}}');
        localStorage.setItem('urlDomain', '{{env("APP_URL")}}');
        @if(session('sideBar'))
            localStorage.setItem('navLinks', '{!!json_encode(session("sideBar"))!!}');
        @else
            localStorage.setItem('navLinks', '{!!json_encode($navLinks)!!}');
        @endif
    </script> 

    <script type="application/javascript">
        function getIP(json) {
            localStorage.setItem('ip_client', json.ip);
            
            
        }
    </script>

    <script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>

    {{-- <script src="https://www.google.com/recaptcha/api.js" async defer></script> --}}
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
    
    
    <title>IPfi - Administrador</title>
</head>

<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    
    <div id="root"></div>
    <script type="text/javascript" src="{{asset('js/index.js')}}"></script>
</body>

</html>