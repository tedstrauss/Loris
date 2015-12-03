ImagePanelHeader = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    render: function() {
        var QCStatusLabel;
        if(this.props.QCStatus == 'Pass') {
            QCStatusLabel = <span className="label label-success">{this.props.QCStatus}</span>;

        } else if(this.props.QCStatus == 'Fail') {
            QCStatusLabel = <span className="label label-danger">{this.props.QCStatus}</span>;
        }

        var arrow;
        if(this.props.Expanded) {
            arrow = <span onClick={this.props.onToggleBody} className="pull-right clickable glyphicon arrow glyphicon-chevron-up"></span>;
        }    else {
            arrow = <span onClick={this.props.onToggleBody} className="pull-right clickable glyphicon arrow glyphicon-chevron-down"></span>;
        }
        var headerButton = (
            <div className="pull-right">
                <div className="btn-group views">
                    <button
                        type="button"
                        className="btn btn-default btn-xs dropdown-toggle"
                        onClick={this.props.onToggleHeaders}
                        aria-expanded={this.props.HeadersExpanded ? true : false}>
                        Header Info
                        </button>
                    <span className="caret"></span>
                </div>
            </div>
            );
        return (

            <div className="panel-heading">
                <h3 className="panel-title">{this.props.Filename}</h3>
                {QCStatusLabel}
                {arrow}
                {headerButton}
            </div>
        );
    }

});

ImagePanelHeadersTable = React.createClass({
    componentDidMount: function() {
        $(this.getDOMNode()).DynamicTable();
    },
    render: function() {
        return (
            <table className="table table-hover table-bordered header-info col-xs-12 dynamictable">
                <tr>
                    <th className="info col-xs-2">Voxel Size</th>
                    <td className="col-xs-6" colSpan="3">
                        {this.props.HeaderInfo.XStep != '' ? 'X: ' + this.props.HeaderInfo.XStep + " mm ": ' '}
                        {this.props.HeaderInfo.YStep != '' ? 'Y: ' + this.props.HeaderInfo.YStep + " mm ": ' '}
                        {this.props.HeaderInfo.ZStep != '' ? 'Z: ' + this.props.HeaderInfo.ZStep + " mm ": ' '}
                    </td>
                    <th className="col-xs-2 info">Output Type</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.OutputType}</td>
                </tr>
                <tr>
                    <th className="col-xs-2 info">Acquisition Date</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.AcquisitionDate}</td>

                    <th className="col-xs-2 info">Space</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.CoordinateSpace}</td>

                    <th className="col-xs-2 info">Inserted Date</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.InsertedDate}</td>
                </tr>
                <tr>
                    <th className="col-xs-2 info">Protocol</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.AcquisitionProtocol}</td>

                    <th className="col-xs-2 info">Series Description</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.SeriesDescription}</td>

                    <th className="col-xs-2 info">Series Number</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.SeriesNumber}</td>
                </tr>
                <tr>
                    <th className="col-xs-2 info">Echo Time</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.EchoTime} ms</td>

                    <th className="col-xs-2 info">Rep Time</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.RepetitionTime} ms</td>

                    <th className="col-xs-2 info">Slice Thick</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.SliceThickness} mm</td>
                </tr>
                <tr>
                    <th className="col-xs-2 info">Number of volumes</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.Time} volumes</td>

                    <th className="col-xs-2 info">Pipeline</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.Pipeline}</td>

                    <th className="col-xs-2 info">Algorithm</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.Algorithm}</td>
                </tr>
                <tr>
                    <th className="col-xs-2 info">Number of rejected directions</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.TotalRejected}</td>

                    <th className="col-xs-2 info">Number of Interlace correlations</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.InterlaceRejected}</td>

                    <th className="col-xs-2 info">Number of Gradient-wise correlations</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.IntergradientRejected}</td>
                </tr>
                <tr>
                    <th className="col-xs-2 info">Number of Slicewise correlations</th>
                    <td className="col-xs-2">{this.props.HeaderInfo.SlicewiseRejected}</td>
                    <td className="col-xs-4" colSpan="4">&nbsp;</td>
                </tr>

            </table>
        );
    }
});
ImageQCDropdown = React.createClass({
    render: function() {
        var dropdown;
        if(this.props.editable) {
            var options = [];
            for (var key in this.props.options) {
                if(this.props.options.hasOwnProperty(key)) {
                    options.push(<option key={this.props.FormName + this.props.FileID + key} className="form-control input-sm option" value={key}>{this.props.options[key]}</option>);
                }
            }
            dropdown = (
                <select name={this.props.FormName + "[" + this.props.FileID + "]"}
                    defaultValue={this.props.defaultValue}
                    className="form-control input-sm"
                    >
                    {options}
                </select>
                );
        }
        return (
            <div className="row">
                <label>{this.props.Label}</label>
                {dropdown}
            </div>
        );
    }
});
ImagePanelQCStatusSelector = React.createClass({
    render: function() {
        var qcStatusLabel;
        if(this.props.HasQCPerm && this.props.FileNew) {
            qcStatusLabel = <span>QC Status <span className="text-info">( <span className="glyphicon glyphicon-star"></span> New )</span></span>
        } else {
            qcStatusLabel = "QC Status";
        }

        return (
            <ImageQCDropdown
                    Label={qcStatusLabel}
                    FormName="status"
                    FileID={this.props.FileID}
                    editable={this.props.HasQCPerm}
                    defaultValue={this.props.QCStatus}
                    options={ { "" : "", "Pass" : "Pass", "Fail" : "Fail" } }
            />
        );
    }
});
ImagePanelQCSelectedSelector = React.createClass({
    render: function () {
        return (
            <ImageQCDropdown
                Label="Selected"
                FormName="selectedvol"
                FileID={this.props.FileID}
                editable={this.props.HasQCPerm}
                options={this.props.SelectedOptions}
                defaultValue={this.props.Selected}
            />
        );
    }
});
ImagePanelQCCaveatSelector = React.createClass({
    render: function () {
        return (
            <ImageQCDropdown
                Label="Caveat"
                FormName="caveat"
                FileID={this.props.FileID}
                editable={this.props.HasQCPerm}
                options={
                    {
                        "" : "",
                        "1" : "True",
                        "0" : "False"
                    }
                } 
                defaultValue={this.props.Caveat}
            />
        );
    }
});
ImagePanelQCPanel = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    render: function() {
        return (
            <div className="form-group">
                <ImagePanelQCStatusSelector
                    FileID={this.props.FileID}
                    HasQCPerm={this.props.HasQCPerm}
                    QCStatus={this.props.QCStatus}
                    FileNew={this.props.FileNew}
                    />
                <ImagePanelQCSelectedSelector
                    FileID={this.props.FileID}
                    HasQCPerm={this.props.HasQCPerm}
                    SelectedOptions={this.props.SelectedOptions}
                    Selected={this.props.Selected}
                />
                <ImagePanelQCCaveatSelector
                    FileID={this.props.FileID}
                    HasQCPerm={this.props.HasQCPerm}
                    Caveat={this.props.Caveat}
                />

            </div>
        );
    }
});

ImagePanelBody = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-9 imaging_browser_pic">
                            <img className="img-checkpic img-responsive" src={this.props.Checkpic} />
                        </div>
                        <div className="col-xs-3 mri-right-panel">
                            <ImagePanelQCPanel
                                FileID={this.props.FileID}
                                FileNew={this.props.FileNew}
                                HasQCPerm={this.props.HasQCPerm}
                                QCStatus={this.props.QCStatus}
                                Caveat={this.props.Caveat}
                                SelectedOptions={this.props.SelectedOptions}
                                Selected={this.props.Selected}
                            />
                         </div>
                    </div>
                    {this.props.HeadersExpanded ? <ImagePanelHeadersTable HeaderInfo={this.props.HeaderInfo} /> : ''}
                </div>
            </div>
        );
    }
});

ImagePanel = React.createClass({
    getInitialState: function() {
        return {
            'BodyCollapsed' : false,
            'HeadersCollapsed' : true
        }
    },
    toggleBody: function(e) {
        this.setState({
            'BodyCollapsed' : !this.state.BodyCollapsed
        });
    },
    toggleHeaders: function(e) {
        this.setState({
            'HeadersCollapsed' : !this.state.HeadersCollapsed
        });
    },
    render: function() {
        return (
            <div className="col-xs-12 col-md-6">
                <ImagePanelHeader 
                    FileID={this.props.FileID}
                    Filename={this.props.Filename}
                    QCStatus={this.props.QCStatus}
                    onToggleBody={this.toggleBody}
                    onToggleHeaders={this.toggleHeaders}
                    Expanded={!this.state.BodyCollapsed}
                    HeadersExpanded={!this.state.HeadersCollapsed}
                />
                {this.state.BodyCollapsed ? '' : 
                    <ImagePanelBody
                        FileID={this.props.FileID}
                        Filename={this.props.Filename}
                        Checkpic={this.props.Checkpic}
                        HeadersExpanded={!this.state.HeadersCollapsed}

                        HeaderInfo={this.props.HeaderInfo} 

                        FileNew={this.props.FileNew}
                        HasQCPerm={this.props.HasQCPerm}
                        QCStatus={this.props.QCStatus}
                        Caveat={this.props.Caveat}
                        SelectedOptions={this.props.SelectedOptions}
                        Selected={this.props.Selected}
                    /> }
            </div>
        );
    }
});
RImagePanel = React.createFactory(ImagePanel);
