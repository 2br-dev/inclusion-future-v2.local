<?php
/* Smarty version 4.5.2, created on 2024-09-06 18:09:37
  from 'D:\Projects\Hosts\inclusion-future-v2.local\release\setup\templates\complete.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.2',
  'unifunc' => 'content_66db1b31cfe529_84606021',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'dfdde397fb5c241d445cd699b7e0543ee6578298' => 
    array (
      0 => 'D:\\Projects\\Hosts\\inclusion-future-v2.local\\release\\setup\\templates\\complete.tpl',
      1 => 1712726260,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_66db1b31cfe529_84606021 (Smarty_Internal_Template $_smarty_tpl) {
?><form id="install" action="?action=complete" method="post">
    <div class="setup_body">
        <h2><?php echo $_smarty_tpl->tpl_vars['_lang']->value['thank_installing'];
echo $_smarty_tpl->tpl_vars['app_name']->value;?>
.</h2>

        <?php if ($_smarty_tpl->tpl_vars['errors']->value) {?>
            <div class="note">
                <h3><?php echo $_smarty_tpl->tpl_vars['_lang']->value['cleanup_errors_title'];?>
</h3>

                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['errors']->value, 'error');
$_smarty_tpl->tpl_vars['error']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['error']->value) {
$_smarty_tpl->tpl_vars['error']->do_else = false;
?>
                    <p><?php echo $_smarty_tpl->tpl_vars['error']->value;?>
</p><hr />
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            </div>
            <br />
        <?php }?>

        <p><?php echo $_smarty_tpl->tpl_vars['_lang']->value['please_select_login'];?>
</p>

        <p class="cleanup">
            <input type="checkbox" value="1" id="cleanup" name="cleanup" <?php if ($_smarty_tpl->tpl_vars['cleanup']->value) {?>checked="checked"<?php }?> />

            <label for="cleanup">
                <span class="cleanup_text"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['delete_setup_dir'];?>
</span>
            </label>
        </p>
    </div>

    <div class="setup_navbar complete">
        <input type="submit" id="modx-next" class="button" name="proceed" value="<?php echo $_smarty_tpl->tpl_vars['_lang']->value['login'];?>
" autofocus="autofocus" />
    </div>
</form>
<?php }
}
