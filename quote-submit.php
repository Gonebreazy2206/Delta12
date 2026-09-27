<?php
// Simple quote submission endpoint
// Expects JSON payload, returns JSON { success: bool, error?: string }
// NOTE: For production, implement proper validation, rate limiting, mailing (e.g., PHPMailer), and persistence.

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$raw = file_get_contents('php://input');
if(!$raw){ echo json_encode(['success'=>false,'error'=>'Leeg verzoek']); exit; }
$data = json_decode($raw, true);
if(!$data){ echo json_encode(['success'=>false,'error'=>'Ongeldige JSON']); exit; }

// Basic validation
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$type = trim($data['type'] ?? '');
$addons = $data['addons'] ?? [];
$notes = trim($data['notes'] ?? '');
$pricing = $data['pricing'] ?? [];

if($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)){
  echo json_encode(['success'=>false,'error'=>'Naam of e‑mail ongeldig']);
  exit;
}
if(!in_array($type, ['Inbouw','Bovenbouw','Wellness'])){
  echo json_encode(['success'=>false,'error'=>'Onbekend type']);
  exit;
}

// Compose message
$subject = 'Nieuwe zwembad offerte aanvraag - '.$name;
$lines = [];
$lines[] = 'Naam: '.$name;
$lines[] = 'E-mail: '.$email;
$lines[] = 'Type: '.$type;
$lines[] = 'Add-ons:';
if(is_array($addons) && count($addons)){
  foreach($addons as $a){
    $label = $a['label'] ?? 'onbekend';
    $price = $a['price'] ?? 0;
    $lines[] = '  - '.$label.' (€'.number_format((float)$price,0,',','.').')';
  }
} else {
  $lines[] = '  (geen)';
}
$lines[] = 'Notities: '.($notes !== '' ? $notes : '(geen)');
$lines[] = '--- Prijsindicatie ---';
$lines[] = 'Basis: '.($pricing['base'] ?? 'nvt');
$lines[] = 'Add-ons: '.($pricing['addons'] ?? 'nvt');
$lines[] = 'Installatiefactor: '.($pricing['installFactor'] ?? 'nvt');
$lines[] = 'Totaal: '.($pricing['total'] ?? 'nvt');
$body = implode("\n", $lines);

// For now: write to a log file (mail stub)
$logDir = __DIR__ . DIRECTORY_SEPARATOR . 'storage';
if(!is_dir($logDir)) @mkdir($logDir, 0775, true);
$logFile = $logDir . DIRECTORY_SEPARATOR . 'quotes.log';
file_put_contents($logFile, "\n---\n".date('c')."\n".$body."\n", FILE_APPEND);

// Try sending mail (will fail silently if mail() disabled)
$sent = @mail('info@delta12.test', $subject, $body, 'From: no-reply@delta12.test');

if($sent){
  echo json_encode(['success'=>true]);
} else {
  // Still success (logged); you can change to false if mail critical
  echo json_encode(['success'=>true,'warning'=>'Mail niet verzonden (gelogd)']);
}
