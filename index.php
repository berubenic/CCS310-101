<?php
session_start();

//This will get the ?lang=en or fr at the end of the url
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
} else {
    $lang = 'en'; // default language
}

include('i18n/' . $lang . '.php');

// Get the requested URL
$url = $_SERVER['REQUEST_URI'];

// Remove the leading slash from the URL
$html_file = 'content' . $url;

if (!file_exists($html_file)) {
    // If the HTML file doesn't exist, use the 404.html file
    $html_file = 'content/404.html';
}

// Load the HTML file
$html = file_get_contents($html_file);

// Find all placeholders in the HTML
preg_match_all('/\{\{(.*?)\}\}/', $html, $matches);

// Replace each placeholder with the translated text
foreach ($matches[1] as $key) {
    if (isset($lang[$key])) {
        $html = str_replace('{{' . $key . '}}', $lang[$key], $html);
    }
}

echo $html;
?>