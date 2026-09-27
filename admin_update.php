<?php
// Simple endpoint to update assets/site-content.json
// Expects a JSON body: { "password": "...", "content": { ... } }
// WARNING: This is a simple demo auth. Replace with proper auth in production.

header('Content-Type: application/json');

$raw = file_get_contents('php://input');
if(!$raw){
    echo json_encode(["success" => false, "message" => "No input"]);
    exit;
}

$data = json_decode($raw, true);
if($data === null){
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit;
}

$password = isset($data['password']) ? $data['password'] : '';
$expected = 'admin'; // per request: use 'admin' as the password
if($password !== $expected){
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$content = isset($data['content']) ? $data['content'] : null;
if($content === null){
    echo json_encode(["success" => false, "message" => "Missing content"]);
    exit;
}

$target = __DIR__ . '/assets/site-content.json';

// Ensure assets dir exists
if(!is_dir(dirname($target))){
    if(!mkdir(dirname($target), 0755, true)){
        echo json_encode(["success" => false, "message" => "Failed to create assets directory"]);
        exit;
    }
}

// Create backups dir
$backupDir = __DIR__ . '/assets/backups';
if(!is_dir($backupDir)){
    if(!mkdir($backupDir, 0755, true)){
        echo json_encode(["success" => false, "message" => "Failed to create backup directory"]);
        exit;
    }
}

$json = json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
if($json === false){
    echo json_encode(["success" => false, "message" => "Failed to encode JSON"]);
    exit;
}

// If existing file exists, copy to timestamped backup
if(file_exists($target)){
    $ts = date('Ymd-His');
    $backupFile = $backupDir . '/site-content-' . $ts . '.json';
    if(!copy($target, $backupFile)){
        // non-fatal, but report
        // continue
    }
}

if(file_put_contents($target, $json) === false){
    echo json_encode(["success" => false, "message" => "Failed to write file"]);
    exit;
}

echo json_encode(["success" => true, "message" => "Saved"]);
?>
