<?php
$f = shell_exec('cat secretboards');
$d = explode('),', $f);
print_r($d);
?>
