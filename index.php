<?php
session_start();

//This will get the ?lang=en or fr at the end of the url
if (isset ($_GET['lang'])) {
    $lang = $_GET['lang'];
} else {
    $lang = 'en'; // default language
}

include ('i18n/' . $lang . '.php');

// Get the requested URL
$url = $_SERVER['REQUEST_URI'];

// remove ?lang=en or fr from the url
$url = strtok($url, '?');

// If the URL is empty, assume it's index.html
if ($url == '/') {
    $html_file = 'content/index.html';
} else {
    // Remove the leading slash from the URL
    $html_file = 'content' . $url;

    // Add .html extension if not present
    if (pathinfo($html_file, PATHINFO_EXTENSION) != 'html') {
        $html_file .= '.html';
    }
}

if (!file_exists($html_file)) {
    // If the HTML file doesn't exist, use the 404.html file
    $html_file = 'content/404.html';
}

// Load the HTML file
$html = file_get_contents($html_file);

// Replace header placeholder with translated header content
$html = str_replace('{{header.html}}', file_get_contents('content/header.html'), $html);

// Replace footer placeholder with translated footer content
$html = str_replace('{{footer.html}}', file_get_contents('content/footer.html'), $html);

// Replace favicon placeholder with favicon content
$html = str_replace('{{favicon.html}}', file_get_contents('content/favicon.html'), $html);

// Replace stylesheet placeholder with stylesheet content
$html = str_replace('{{styles.html}}', file_get_contents('content/styles.html'), $html);

// Replace script placeholder with script content
$html = str_replace('{{scripts.html}}', file_get_contents('content/scripts.html'), $html);

// Find all remaining placeholders in the HTML
preg_match_all('/\{\{(.*?)\}\}/', $html, $matches);

// Replace other placeholders with the translated text
foreach ($matches[1] as $key) {
    if ($key == 'title') {
        $title_to_replace = $lang['title'];
        $url_without_slash = ltrim($url, '/');
        $capitalized_url = ucfirst($url_without_slash);
        if ($capitalized_url == '') {
            $capitalized_url = $lang["lang.code"] == 'en' ? 'Home' : 'Accueil';
        } elseif ($capitalized_url == 'Reviews') {
            $capitalized_url = $lang["lang.code"] == 'en' ? 'Reviews' : 'Avis';
        } elseif ($capitalized_url == 'Guides') {
            $capitalized_url = $lang["lang.code"] == 'en' ? 'Guides' : 'Guides';
        } elseif ($capitalized_url == 'Inspiration') {
            $capitalized_url = $lang["lang.code"] == 'en' ? 'Inspiration' : 'Inspiration';
        } elseif ($capitalized_url == 'Connect') {
            $capitalized_url = $lang["lang.code"] == 'en' ? 'Connect' : 'Connecter';
        }
        $title_to_replace .= " - $capitalized_url";
        $html = str_replace('{{title}}', $title_to_replace, $html);
    } elseif (isset($lang[$key])) {
        $html = str_replace('{{' . $key . '}}', $lang[$key], $html);
    }
}

echo $html;