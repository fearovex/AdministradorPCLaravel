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
    public $name_campaing;
    public $filename;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($columns, $rows, $name_campaing, $filename)
    {
        $this->columns=$columns;
        $this->rows=$rows;
        $this->name_campaing=$name_campaing;
        $this->filename=$filename;
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
        $fp = fopen($this->filename, 'w');

        fputcsv($fp, $this->columns);

        if(empty($this->rows)){
            foreach ($this->rows as $row) {
                fputcsv($fp, $row);
            }
        }else{
            foreach ($this->rows as $row) {
                unset($row['id_voucher']);
                unset($row['id_locacion']);
                unset($row['id_campania']);
                fputcsv($fp, $row);
            }
        }
        fclose($fp);

        $aliasFrom = env('ALIAS_MAIL_FROM');
        $campaing = $this->name_campaing;
        return (new MailMessage)
            ->from($aliasFrom,'Vouchers IPfi')
            ->subject(Lang::get('Notificación de envío de CSV vouchers'))
            ->line(Lang::get("Se te ha enviado un listado de vouchers de la campaña: <strong>$campaing</strong>, el cual ha sido adjuntado en formato CSV!"))
            ->attach($this->filename);
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
