<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Lang;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetNotification extends Notification
{
    use Queueable;
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token=$token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $urlDefaultFromEnv = env('APP_URL');
        $aliasFrom = env('ALIAS_MAIL_FROM');
        $urlToResetForm =$urlDefaultFromEnv."password/reset/?token=". $this->token;
        return (new MailMessage)
            ->from($aliasFrom,'Soporte IPfi')
            ->subject(Lang::get('Notificación para restablecer de contraseña'))
            ->line(Lang::get('Aquí está su solicitud de restablecimiento de contraseña!'))
            ->action(Lang::get('Restablecer contraseña'), $urlToResetForm)
            ->line(Lang::get('Este enlace de restablecimiento de contraseña caducará en 60 minutos.', ['count' => config('auth.passwords.users.expire')]))
            ->line(Lang::get('Si no solicitó un restablecimiento de contraseña, no se requiere ninguna otra acción..'));
            // ->line(Lang::get('If you did not request a password reset, no further action is required. Token: ==>'. $this->token));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
