<?php
/* Smarty version 4.5.2, created on 2024-09-06 18:09:54
  from 'D:\Projects\Hosts\inclusion-future-v2.local\release\manager\templates\default\dashboard\buttons.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.2',
  'unifunc' => 'content_66db1b42f14da9_61214651',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b72191eea674ea3bdf6c201db68e924446a8b3a4' => 
    array (
      0 => 'D:\\Projects\\Hosts\\inclusion-future-v2.local\\release\\manager\\templates\\default\\dashboard\\buttons.tpl',
      1 => 1712726260,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_66db1b42f14da9_61214651 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="dashboard-block headless <?php echo $_smarty_tpl->tpl_vars['size']->value;?>
" id="dashboard-block-<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
" data-id="<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
">
    <div class="body<?php if ($_smarty_tpl->tpl_vars['customizable']->value) {?> draggable<?php }?>">
        <?php if ($_smarty_tpl->tpl_vars['customizable']->value) {?>
            <div class="action-buttons">
                <button class="action icon icon-compress<?php if ($_smarty_tpl->tpl_vars['size']->value == 'quarter') {?> hidden<?php }?>"
                        data-action="shrink"></button>
                <button class="action icon icon-expand<?php if ($_smarty_tpl->tpl_vars['size']->value == 'double') {?> hidden<?php }?>"
                        data-action="expand"></button>
                <button class="action icon icon-times-circle"
                        data-action="remove"></button>
            </div>
        <?php }?>
        <div class="dashboard-buttons">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['properties']->value, 'item');
$_smarty_tpl->tpl_vars['item']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->do_else = false;
?>
                <a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['link'];?>
" class="dashboard-button"<?php if (!empty($_smarty_tpl->tpl_vars['item']->value['target'])) {?> target="<?php echo $_smarty_tpl->tpl_vars['item']->value['target'];?>
"<?php }?>>
                    <div class="dashboard-button-icon">
                        <i class="icon icon-<?php echo $_smarty_tpl->tpl_vars['item']->value['icon'];?>
"></i>
                    </div>
                    <div class="dashboard-button-wrapper">
                        <div class="dashboard-button-title"><?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
</div>
                        <div class="dashboard-button-description"><?php echo $_smarty_tpl->tpl_vars['item']->value['description'];?>
</div>
                    </div>
                </a>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        </div>
    </div>
</div><?php }
}
