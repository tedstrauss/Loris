<?php
/**
 * This page
 *
 * PHP Version 5
 *
 * @category Statistics
 * @package  Main
 * @author   Ted Strauss <ted.strauss@mcgill.ca>
 * @license  GPLv3
 * @link     https://www.github.com/aces/Loris-Trunk/
 */
require_once "NDB_Form.class.inc";
/**
 * Stub class.. all this does is check permissions, since everything else is done
 * in the template/javascript
 *
 * @category MRI
 * @package  Main
 * @author   Ted Strauss <ted.strauss@mcgill.ca>
 * @license  GPLv3
 * @link     https://www.github.com/aces/Loris-Trunk/
 */
class NDB_Form_reporting extends NDB_Form
{

    function _hasAccess() {
        $user =& User::singleton();
        if(Utility::isErrorX($user)) {
            return PEAR::raiseError("User Error: ".$user->getMessage());
        }
        return $user->hasPermission('data_entry');
    }

    // Wrapper to get the user object and check the permission.
    function _has_perm($perm)
    {
        $user =& User::singleton();
        if (PEAR::isError($user)) {
            return PEAR::raiseError("User Error: " .$user->getMessage());
        }
        return $user->hasPermission($perm);
    }
    function reporting()
    {
        $one = array(1,2,3);
        $this->tpl_data['one'] = json_encode($one);

    }
}
?>
