<?php
/* Smarty version 4.5.2, created on 2024-09-06 18:09:31
  from 'D:\Projects\Hosts\inclusion-future-v2.local\release\setup\templates\footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.2',
  'unifunc' => 'content_66db1b2ba9fc45_26835834',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '85d588761d635d5a9fe4854d6277c57d22c52be6' => 
    array (
      0 => 'D:\\Projects\\Hosts\\inclusion-future-v2.local\\release\\setup\\templates\\footer.tpl',
      1 => 1712726260,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_66db1b2ba9fc45_26835834 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'D:\\Projects\\Hosts\\inclusion-future-v2.local\\release\\core\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.replace.php','function'=>'smarty_modifier_replace',),));
?>
            </div>
        </div>
    </div>

    <!-- start footer -->
    <footer>
        <div class="wrapper">
            <div class="copyrite">
                <p><?php ob_start();
echo date('Y');
$_prefixVariable1 = ob_get_clean();
echo smarty_modifier_replace($_smarty_tpl->tpl_vars['_lang']->value['modx_footer1'],'[[+current_year]]',$_prefixVariable1);?>
</p>
            </div>
            <div class="copyrite_info">
                <p><?php echo $_smarty_tpl->tpl_vars['_lang']->value['modx_footer2'];?>
</p>
            </div>
        </div>
    </footer>
    <!-- end footer -->
</body>

</html>
<?php }
}
