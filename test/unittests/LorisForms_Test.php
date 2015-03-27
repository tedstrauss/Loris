<?php
/**
 * This tests the LorisForm replacement for HTML_QuickForm used by
 * Loris.
 *
 * PHP Version 5
 *
 * @category Tests
 * @package  Main
 * @author   Dave MacFarlane <david.macfarlane2@mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../php/libraries/LorisForm.class.inc';

/**
 * This tests the LorisForm replacement for HTML_QuickForm used by
 * Loris.
 *
 * @category Tests
 * @package  Main
 * @author   Dave MacFarlane <david.macfarlane2@mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class LorisForms_Test extends PHPUnit_Framework_TestCase
{
    /**
     * Creates a new LorisForm to use for testing
     *
     * @return none
     */
    function setUp()
    {
        $this->form = new LorisForm();
    }

    /**
     * Custom assertion to assert that the type of an element
     * is equal to the provided type. Use this instead of
     *
     * @param string $el   The element name
     * @param string $type The expected type of this element
     *                     (ie select, checkbox, etc)
     *
     * @return none, but makes assertions
     */
    function assertType($el, $type)
    {
        if (!isset($this->form->form[$el])) {
            $this->fail("Element $el does not exist");
            return;
        }
        $this->assertEquals(
            $this->form->form[$el]['type'],
            $type,
            "Element $el was not of type $type"
        );
    }

    /**
     * Custom assertion to assert that the label of an element
     * is correct
     *
     * @param string $el    The element name
     * @param string $label The expected type of this element
     *                      (ie select, checkbox, etc)
     *
     * @return none, but makes assertions
     */
    function assertLabel($el, $label)
    {
        if (!isset($this->form->form[$el])) {
            $this->fail("Element $el does not exist");
            return;
        }
        $this->assertEquals(
            $this->form->form[$el]['label'],
            $label,
            "Element $el's label did not match $label"
        );
    }


    /**
     * Test that the addSelect wrapper adds an element of the appropriate
     * type to the page
     *
     * @return none
     */
    function testAddSelect()
    {
        $this->form->addSelect("abc", "Hello", array());

        $this->assertTrue(isset($this->form->form['abc']));
        $this->assertType("abc", "select");
        $this->assertLabel("abc", "Hello");
    }

    /**
     * Test that the addText wrapper adds an element of the appropriate
     * type to the page
     *
     * @return none
     */
    function testAddText()
    {
        $this->form->addText("abc", "Hello", array());
        $this->assertType("abc", "text");
        $this->assertLabel("abc", "Hello");
    }

    /**
     * Test that the addDate wrapper adds an element of the appropriate
     * type to the page
     *
     * @return none
     */
    function testAddDate()
    {
        $this->form->addDate("abc", "Hello", array());
        $this->assertType("abc", "date");
        $this->assertLabel("abc", "Hello");
    }


    /**
     * Test that the addDate wrapper adds an element of the appropriate
     * type to the page
     *
     * @return none
     */
    function testAddFile()
    {
        $this->form->addFile("abc", "Hello", array());
        $this->assertType("abc", "file");
        $this->assertLabel("abc", "Hello");
    }




    /**
     * Test that the addElement wrapper with type "select" adds an element of
     * the appropriate type to the page
     *
     * @return none
     */
    function testAddElementSelect()
    {
        $this->form = $this->getMockBuilder('LorisForm')
            ->setMethods(array('addSelect', 'addDate'))
            ->getMock();
        $this->form->expects($this->once())
            ->method('addSelect');
        $this->form->addElement("select", "abc", "Hello");
    }

    /**
     * Test that the addElement wrapper with type "date" adds an element of
     * the appropriate type to the page
     *
     * @return none
     */
    function testAddElementDate()
    {
        $this->form = $this->getMockBuilder('LorisForm')
            ->setMethods(array('addDate'))
            ->getMock();
        $this->form->expects($this->once())
            ->method('addDate');
        $this->form->addElement("date", "abc", "Hello");
    }

    /**
     * Test that the addElement wrapper with type "text" adds an element of
     * the appropriate type to the page
     *
     * @return none
     */
    function testAddElementText()
    {
        $this->form = $this->getMockBuilder('LorisForm')
            ->setMethods(array('addText'))
            ->getMock();
        $this->form->expects($this->once())
            ->method('addText');
        $this->form->addElement("text", "abc", "Hello");
    }

    /**
     * Test that the addElement wrapper with type "text" adds an element of
     * the appropriate type to the page
     *
     * @return none
     */
    function testAddElementFile()
    {
        $this->form = $this->getMockBuilder('LorisForm')
            ->setMethods(array('addFile'))
            ->getMock();
        $this->form->expects($this->once())
            ->method('addFile');
        $this->form->addElement("file", "abc", "Hello");
    }



}
?>
