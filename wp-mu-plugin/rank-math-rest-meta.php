<?php
/**
 * Plugin Name: RankMath REST Meta (Fabricio)
 * Description: Libera os campos do RankMath (palavra-chave foco, título SEO e meta description) para a API REST, para que a publicação automatizada preencha o SEO sozinha.
 * Version: 1.0
 * Author: fabriciomourateam
 *
 * INSTALAÇÃO: copie este arquivo para wp-content/mu-plugins/ (crie a pasta se não existir).
 * mu-plugins ativam sozinhos — não precisa "ativar" no painel.
 */

if (!defined('ABSPATH')) exit;

add_action('init', function () {
    $keys = [
        'rank_math_focus_keyword', // palavra-chave foco
        'rank_math_title',         // título SEO
        'rank_math_description',   // meta description
    ];

    foreach ($keys as $key) {
        register_post_meta('post', $key, [
            'type'          => 'string',
            'single'        => true,
            'show_in_rest'  => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});
