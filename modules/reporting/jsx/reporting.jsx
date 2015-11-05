/**
 *	This file contains the React classes for Reporting
 */

/**
 *	Base class for accordion sections within the UI of the Reporting module
 */
AccordionPane = React.createClass({
    render: function() {
        var classList = "panel panel-default";
        if(this.props.Active) {
            classList += " active"
        }
        // Render the HTML
        return (
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id={this.props.TabId}>
                    <h4 className="panel-title">
                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={this.props.HrefId} aria-expanded="false" aria-controls={this.props.CollapseId}>
                            {this.props.Title}
                        </a>
                    </h4>
                </div>
                <div id={this.props.CollapseId} className="panel-collapse collapse" role="tabpanel" aria-labelledby={this.props.CollapseId}>
                    <div className="panel-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

/**
 *	This is the React class for the accordion
 */
AccordionPaneApp = React.createClass({
    loadCallback: function(){
        console.log("one two three");
    },
    // Render the HTML
    render: function () {
        var accordions = [];
        accordions.push(
            <AccordionPane
                TabId="sites"
                CollapseId="sitesCollapse"
                HrefId="#sitesCollapse"
                loadCallback={this.loadCallback}
                Title="Sites"
            >
                To make this more clear and to make it
                easier to build more environments that
                React can render to
            </AccordionPane>
        );
        accordions.push(
            <AccordionPane
                TabId="six"
                CollapseId="sixCollapse"
                HrefId="#sixCollapse"
                loadCallback={this.loadCallback}
                Title="Six"
            >
                To make this more clear and to make it
                easier to build more environments that
                React can render to
            </AccordionPane>
        );
        accordions.push(
            <AccordionPane
                TabId="larp"
                CollapseId="larpCollapse"
                HrefId="#larpCollapse"
                loadCallback={this.loadCallback}
                Title="Larp"
            >
                To make this more clear and to make it
                easier to build more environments that
                React can render to
            </AccordionPane>
        );

        return (
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                {accordions}
            </div>
        )
    }
});
RAccordionPaneApp = React.createFactory(AccordionPaneApp);


/**
 *	Base class for tabs within the UI of the ...
 */
TabPane = React.createClass({
    render: function() {
        var classList = "tab-pane";
        if(this.props.Active) {
            classList += " active"
        }
        // Render the HTML
        return (
            <div className={classList} id={this.props.TabId}>
                <h1 className="tabHeader">{this.props.Title}</h1>
                	{this.props.children}
            </div>
        );
    }
});

/**
 *	This is the React class for the ...
 */
TabPaneApp = React.createClass({
    // Save the instrument
    saveInstrument: function(){
        // Call to external function, passing it the save information and the elements
        // to save
        //Instrument.save(this.refs.savePane.state, this.refs.buildPane.state.Elements);
        console.log("saveInstrument");
    },
    // Load an instrument
    loadCallback: function(elements, info) {
        // Set the savePane state to that extracted from the file
        //this.refs.savePane.loadState(info);
        // Set the buildPane elements to the rendered elements
        //this.refs.buildPane.loadElements(elements);
        // Set the alert state to success in the loadPane
        //this.refs.loadPane.setAlert('success');
        console.log("loadCallback");
    },
    // Render the HTML
    render: function () {
        var tabs = [];
        tabs.push(
            <TabPane
                TabId="Sites"
                ref="sitesPane"
                loadCallback={this.loadCallback}
                Title="Sites"
            >
                <AccordionPaneApp/>
            </TabPane>
        );
        tabs.push(
            <TabPane
                TabId="Instruments"
                ref="InstrumentsPane"
                Title="Instruments"
            >
                <AccordionPaneApp/>
            </TabPane>
        );
        tabs.push(
            <TabPane
                TabId="Study"
                ref="studyPane"
                save={this.saveInstrument}
                Title="Study"
            >
                <AccordionPaneApp/>
            </TabPane>
        );
        return (
        <div>
            <ul className="nav nav-tabs" role="tablist">
                <li role="presentation"><a href="#Sites" aria-controls="home" role="tab" data-toggle="tab">Sites</a></li>
                <li role="presentation" className="active"><a href="#Instruments" aria-controls="build" role="tab" data-toggle="tab">Instruments</a></li>
                <li role="presentation"><a href="#Study" aria-controls="messages" role="tab" data-toggle="tab">Study</a></li>
            </ul>

            <div className="tab-content col-xs-12">
				    {tabs}
            </div>
        </div>
        )
    }
});
RTabPaneApp = React.createFactory(TabPaneApp);

