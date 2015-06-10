<?php

/**
 * Created by PhpStorm.
 * User: kmarasinska
 * Date: 03/06/15
 * Time: 11:08 AM
 */

/**
 * Class NDB_BVL_FeedbackTest
 *
 */
class NDB_BVL_FeedbackTest extends Loris_PHPUnit_Database_TestCase
{

    /**
     * NDB_BVL_Feedback object used for testing
     *
     * @var NDB_BVL_Feedback
     */
    private $_feedbackObj;


    /**
     * Setup test
     *
     * @throws Exception
     * @return void
     */
    protected function setUp()
    {
        parent::setUp();
        $this->createLorisDBConnection();
        $this->_feedbackObj = NDB_BVL_Feedback::singleton("karo_test", null, 3);
    }


    /**
     * Returns test data set.
     * Populates table feedback_bvl_type.
     *
     * @return PHPUnit_Extensions_Database_DataSet_IDataSet
     */
    protected function getDataSet()
    {
        return $this->createMySQLXMLDataSet(
            TABLE_FIXTURES_PATH . 'feedback_bvl_type.xml'
        );
    }

    /**
     * Test createFeedbackType passing an invalid name
     *
     * @covers NDB_BVL_Feedback::createFeedbackType
     * @throws LorisException
     * @return void
     */
    public function testCreateFeedbackTypeWithInvalidName()
    {
        $this->setExpectedException('LorisException');
        $this->_feedbackObj->createFeedbackType("");
    }

    /**
     * Test createFeedbackType: create a new valid feedback type
     *
     * @covers NDB_BVL_Feedback::createFeedbackType
     * @throws LorisException
     * @return void
     */
    public function testCreateNewFeedbackType()
    {
        $this->assertEquals(6, $this->_feedbackObj->createFeedbackType('New Test Type', 'Created from PHPUnit tests'));
    }

    /**
     * Test getFeedbackTypeIdByName for existing name
     *
     * @covers NDB_BVL_Feedback::getFeedbackTypeIdByName
     * @return void
     */
    public function testGetFeedbackTypeIdByNameForExistingValue()
    {
        $this->assertEquals(5, $this->_feedbackObj->getFeedbackTypeIdByName('Other'));

    }

    /**
     * Test getFeedbackTypeIdByName for value which does not exist in feedback_bvl_type table
     * @covers NDB_BVL_Feedback::getFeedbackTypeIdByName
     * @return void
     */
    public function testGetFeedbackTypeIdByNameForNoneExistingValue()
    {
        $this->assertEmpty(
            $res = $this->_feedbackObj->getFeedbackTypeIdByName(
                'None existing value'
            )
        );
    }
}
