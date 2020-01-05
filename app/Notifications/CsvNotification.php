<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Lang;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Excel;

class CsvNotification extends Notification
{
    use Queueable;
    public $columns;
    public $rows;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($columns, $rows)
    {
        $this->columns=$columns;
        $this->rows=$rows;
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
        $aliasFrom = env('ALIAS_MAIL_FROM_VOUCHERS');
        date_default_timezone_set('America/Bogota');
        $filename = 'Vouchers'.date("Y-m-d-His").'.csv';
        $fp = fopen($filename, 'w');

        fputcsv($fp, $this->columns);

        if(empty($this->rows)){
            foreach ($this->rows as $row) {
                fputcsv($fp, $row);
            }
        }else{
            foreach ($this->rows as $row) {
                unset($row['id']);
                unset($row['id_evento']);
                unset($row['id_pais']);
                fputcsv($fp, $row);
            }
        }
        fclose($fp);

        return (new MailMessage)
            ->from($aliasFrom,'Vouchers IPfi')
            ->subject(Lang::get('Notificación de envío de CSV vouchers'))
            ->line(Lang::get('Aquí está su solicitud de envío de CSV Vouchers adjunto!'))
            ->attach($filename);
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
