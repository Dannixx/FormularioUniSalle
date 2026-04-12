<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = '127.0.0.1';
$user = 'root';
$pass = 'root';
$db   = 'lasalle_db';
$port = 8889;

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die("<p style='color:red'>❌ Error: " . $conn->connect_error . "</p>");
}

echo "<p style='color:green; font-family:sans-serif'>✅ Conexión exitosa a <strong>$db</strong></p>";

$result = $conn->query("SELECT * FROM contactos ORDER BY id ASC");

echo "
<style>
  body  { font-family: sans-serif; padding: 2rem; background: #f5f5f5; }
  h2    { color: #0B1F3A; }
  table { border-collapse: collapse; width: 100%; background: white; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
  th    { background: #0B1F3A; color: white; padding: 10px 14px; text-align: left; }
  td    { padding: 10px 14px; border-bottom: 1px solid #eee; font-size: .88rem; }
  tr:hover td { background: #FFF8EE; }
</style>
<h2>📋 contactos — " . $result->num_rows . " registros</h2>
<table>
  <thead><tr>
    <th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th>
    <th>Teléfono</th><th>Asunto</th><th>Mensaje</th><th>Fecha</th>
  </tr></thead><tbody>";

while ($row = $result->fetch_assoc()) {
    echo "<tr>
      <td>{$row['id']}</td>
      <td>" . htmlspecialchars($row['nombre'])  . "</td>
      <td>" . htmlspecialchars($row['apellido']) . "</td>
      <td>" . htmlspecialchars($row['email'])    . "</td>
      <td>" . htmlspecialchars($row['telefono']) . "</td>
      <td>" . htmlspecialchars($row['asunto'])   . "</td>
      <td>" . htmlspecialchars($row['mensaje'])  . "</td>
      <td>{$row['fecha_envio']}</td>
    </tr>";
}

echo "</tbody></table><p style='color:gray;font-size:.8rem;margin-top:1rem'>✅ Prueba MAMP completada</p>";
$conn->close();
?>
