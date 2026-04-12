<?php
define('DB_HOST', 'sql107.infinityfree.com');
define('DB_USER', 'if0_41453668');
define('DB_PASS', 'goC0Tryjzruga');
define('DB_NAME', 'if0_41453668_XXX');

header('Content-Type: application/json; charset=UTF-8');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Leer y limpiar datos
$nombre   = trim($_POST['nombre']   ?? '');
$apellido = trim($_POST['apellido'] ?? '');
$email    = trim($_POST['email']    ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$asunto   = trim($_POST['asunto']   ?? '');
$mensaje  = trim($_POST['mensaje']  ?? '');

// Validaciones básicas
$errores = [];
if (empty($nombre))            $errores[] = 'El nombre es obligatorio.';
if (empty($apellido))          $errores[] = 'El apellido es obligatorio.';
if (empty($email))             $errores[] = 'El email es obligatorio.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email inválido.';
if (empty($asunto))            $errores[] = 'El asunto es obligatorio.';
if (strlen($mensaje) < 10)     $errores[] = 'El mensaje es muy corto.';

if (!empty($errores)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errores' => $errores]);
    exit;
}

// Conectar a MySQL
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]);
    exit;
}

$conn->set_charset('utf8mb4');

// Insertar en la tabla contactos
$stmt = $conn->prepare(
    "INSERT INTO contactos (nombre, apellido, email, telefono, asunto, mensaje, fecha_envio)
     VALUES (?, ?, ?, ?, ?, ?, NOW())"
);
$stmt->bind_param('ssssss', $nombre, $apellido, $email, $telefono, $asunto, $mensaje);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => "¡Gracias, $nombre! Tu mensaje ha sido registrado.",
        'id'      => $stmt->insert_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
