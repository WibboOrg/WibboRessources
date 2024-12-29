<?php
header('Content-Type: application/json');

$cache = !empty($_GET["cache"]) ? $_GET["cache"] : "";
$category = !empty($_GET["cate"]) ? $_GET["cate"] : "";

$date = date('j-n-Y');
if ($cache != $date) {
    echo '[]';
    exit;
}

// Map categories to their respective paths
$categoryPaths = [
    "banner" => "images/banner",
    "backgrounds" => "c_images/backgrounds",
    "badge" => "c_images/album1584",
    "catalogue" => "c_images/catalogue",
    "navigator" => "c_images/navigator",
    "reception" => "c_images/reception",
    "web_promo_small" => "c_images/web_promo_small"
];

$path = $categoryPaths[$category] ?? "";

if ($path !== "") {
    $data = json_encode(getFilesFromDirectory($path));
    echo $data;
} else {
    echo '[]';
}

/**
 * Scans a directory and returns a list of files.
 *
 * @param string $dir The directory to scan.
 * @return array The list of files.
 */
function getFilesFromDirectory($dir)
{
    $files = scanAllDir($dir);
    arsort($files);
    return array_keys($files);
}

/**
 * Recursively scans all directories and files.
 *
 * @param string $dir The directory to scan.
 * @return array An associative array of files and their modification times.
 */
function scanAllDir($dir)
{
    $result = [];
    foreach (scandir($dir) as $filename) {
        if ($filename[0] === '.') {
            continue;
        }

        $filePath = $dir . '/' . $filename;
        if (is_dir($filePath)) {
            $result = array_merge($result, scanAllDir($filePath));
        } else {
            $result[$filePath] = filemtime($filePath);
        }
    }
    return $result;
}
