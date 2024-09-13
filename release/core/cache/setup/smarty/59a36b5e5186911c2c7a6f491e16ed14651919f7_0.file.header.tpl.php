<?php
/* Smarty version 4.5.2, created on 2024-09-06 18:09:37
  from 'D:\Projects\Hosts\inclusion-future-v2.local\release\setup\templates\header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.2',
  'unifunc' => 'content_66db1b314d5aa8_11629931',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '59a36b5e5186911c2c7a6f491e16ed14651919f7' => 
    array (
      0 => 'D:\\Projects\\Hosts\\inclusion-future-v2.local\\release\\setup\\templates\\header.tpl',
      1 => 1712726260,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_66db1b314d5aa8_11629931 (Smarty_Internal_Template $_smarty_tpl) {
?><!doctype html>
<html lang="en">

<head>
    <title><?php echo $_smarty_tpl->tpl_vars['app_name']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['app_version']->value;?>
 &raquo; <?php echo $_smarty_tpl->tpl_vars['_lang']->value['install'];?>
</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <base href="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
">

    <link rel="shortcut icon" href="favicon.ico" />
    <link href="assets/css/installer.css" type="text/css" rel="stylesheet" />

    <?php if ($_smarty_tpl->tpl_vars['_lang']->value['additional_css'] != '') {?>
        <style type="text/css"> <?php echo $_smarty_tpl->tpl_vars['_lang']->value['additional_css'];?>
 </style>
    <?php }?>

    <?php echo '<script'; ?>
 src="assets/js/ext-core.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="assets/js/modx.setup.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
>
        window.onload = function () {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var action = url.searchParams.get('action');

            switch (action) {
                case 'welcome':
                    setCurrent(0);
                    break;
                case 'options':
                    setCurrent(1);
                    break;
                case 'database':
                    setCurrent(2);
                    break;
                case 'contexts':
                    setCurrent(3);
                    break;
                case 'summary':
                    setCurrent(4);
                    break;
                case 'install':
                    setCurrent(5);
                    break;
                case 'complete':
                    setCurrent(6);
                    break;
                default:
                    setCurrent(0);
            }

            function setCurrent(index) {
                for (let i = 0; i < index; i++) {
                    document.querySelectorAll('.modx-installer-steps li')[i].classList.add('active');
                }
                document.querySelectorAll('.modx-installer-steps li')[index].classList.add('current');
            }
        }
    <?php echo '</script'; ?>
>

</head>

<body>
    <!-- start header -->
    <header>
        <div class="wrapper">
            <div class="wrapper_logo">
                <a href="https://modx.com/" title="MODX" class="logo" target="_blank">MODX</a>
            </div>
            <div class="wrapper_version">
                <?php echo $_smarty_tpl->tpl_vars['app_name']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['app_version']->value;?>

            </div>
            <div class="steps-outer">
                <ul class="modx-installer-steps">
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_welcome'];?>
</span></li>
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_options'];?>
</span></li>
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_connect'];?>
</span></li>
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_contexts'];?>
</span></li>
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_test'];?>
</span></li>
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_install'];?>
</span></li>
                    <li><span class="icon"></span> <span class="title"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['step_complete'];?>
</span></li>
                </ul>
            </div>
        </div>
    </header>
    <!-- end header -->

    <div id="content">
        <div class="content-inside">
            <div class="wrapper">
                <div class="content_header">
                    <div class="content_header_title">
                        <?php echo $_smarty_tpl->tpl_vars['_lang']->value['modx_installer'];?>

                    </div>
                </div>
<?php }
}
