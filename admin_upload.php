<?php
// Simple file upload endpoint for admin panel.
// Accepts multipart/form-data with field 'file'. Saves into assets/uploads/ and returns { success, url }

header('Content-Type: application/json');

// Ensure only POST is accepted; return 405 for other methods so client sees a clear message
if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use POST to upload files."]);
    exit;
}

if (empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
    exit;
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Upload error code: " . $file['error']]);
    exit;
}

// Size limit (5 MB)
$maxBytes = 5 * 1024 * 1024;
if (isset($file['size']) && $file['size'] > $maxBytes) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "File too large (max 5MB)"]);
    exit;
}

// Determine MIME type in a robust way
$mime = '';
if (function_exists('finfo_open')) {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    if ($finfo) {
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
    }
}
if (!$mime && function_exists('mime_content_type')) {
    $mime = mime_content_type($file['tmp_name']);
}

$allowed = [ 'image/jpeg' => '.jpg', 'image/png' => '.png', 'image/gif' => '.gif', 'image/webp' => '.webp' ];
// Fallback: use extension if detected mime not available
if (!$mime) {
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $mapExt = ['jpg'=>'.jpg','jpeg'=>'.jpg','png'=>'.png','gif'=>'.gif','webp'=>'.webp'];
    if (isset($mapExt[$ext])) {
        $ext = $mapExt[$ext];
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Could not determine file type"]);
        exit;
    }
} else {
    if (!isset($allowed[$mime])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Unsupported file type: $mime"]);
        exit;
    }
    $ext = $allowed[$mime];
}

$uploadsDir = __DIR__ . '/assets/uploads';
if (!is_dir($uploadsDir)) {
    if (!mkdir($uploadsDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to create uploads directory"]);
        exit;
    }
}

$baseName = preg_replace('/[^a-zA-Z0-9-_\.]/', '-', pathinfo($file['name'], PATHINFO_FILENAME));
$ts = date('Ymd-His');
$targetName = $ts . '-' . $baseName . $ext;
$target = $uploadsDir . '/' . $targetName;

if (!is_uploaded_file($file['tmp_name'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Temp upload file missing or not an uploaded file"]);
    exit;
}

if (!move_uploaded_file($file['tmp_name'], $target)) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to move uploaded file to destination"]);
    exit;
}

$url = 'assets/uploads/' . $targetName;
echo json_encode(["success" => true, "url" => $url]);
exit;
?>
