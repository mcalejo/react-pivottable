import React from 'react';
import tips from './tips';
import {sortAs} from '../src/Utilities';
import TableRenderers from '../src/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from '../src/PlotlyRenderers';
import PivotTableUI from '../src/PivotTableUI';
import '../src/pivottable.css';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';

const Plot = createPlotlyComponent(window.Plotly);

class PivotTableUISmartWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {pivotState: props};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pivotState: nextProps});
    }

    render() {
        return (
            <PivotTableUI
                renderers={Object.assign(
                    {},
                    TableRenderers,
                    createPlotlyRenderers(Plot)
                )}
                {...this.state.pivotState}
                onChange={s => this.setState({pivotState: s})}
                unusedOrientationCutoff={Infinity}
            />
        );
    }
}

export default class App extends React.Component {
    componentWillMount() {
        this.setState({
            mode: 'demo',
            filename: 'Sample Dataset: Tips',
            pivotState: {
                data: tips,
                rows: ['Payer Gender'],
                cols: ['Party Size'],
                aggregatorName: 'myAggregator',
                vals: ['Tip', 'Total Bill'],
                rendererName: 'Table',
                sorters: {
                    Meal: sortAs(['Lunch', 'Dinner']),
                    'Day of Week': sortAs([
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ]),
                },
                plotlyOptions: {width: 900, height: 500},
                plotlyConfig: {},
                tableOptions: {
                    clickCallback: function(e, value, filters, pivotData) {
                        var names = [];
                        pivotData.forEachMatchingRecord(filters, function(
                            record
                        ) {
                            names.push(record.Meal);
                        });
                        alert(names.join('\n'));
                    },
                },
                url : (dim,attr) => {return `https://www.google.com/search?q=${dim}+${attr}`},
                tooltip: (dim,attr) => {return dim+ " : " + attr},
                labeller: (dim,attr) => {return dim+"-"+attr+":-)"},
                indenter: (dim,attr) => {return 20}, // return null for no incenting
                hiddenFromDragDrop: ["Tip"], // assuming this to be our main "value"
                aggregators :{
                    "myAggregator" : function(attributeArray){
                        // attributeArray[0] is the attribute being aggregated; we don't care here
                        return function(data, rowKey, colKey){
                            var self = {
                                // cf. https://github.com/nicolaskruchten/pivottable/wiki/Aggregators
                                theValue: null,
                                theSum:0,
                                theMeta:null,
                                theInfo:null, 
                                push: function(record){
                                    self.theInfo=record; 
                                    self.theValue=record['Tip']; // assuming this to be our "value"
                                    self.theMeta=record.meta;
                                    if(!isNaN(record.value)) self.theSum+=record.value;
                                    },
                                value: function(){ return self.theValue; },
                                format: function(x) { return x; },
                                formatHTML: function(x) { 
                                    return "<i>"+x+"</i>";
                                },
                                tip: function() {
                                    return "tip for "+self.theValue;
                                    },
                                getFID: function() {return "someFID_"+self.theValue;},
                                numInputs: 0
                            };
                            return self;
                        }
                    }
                }
            },
        });
    }

    onDrop(files) {
        this.setState(
            {
                mode: 'thinking',
                filename: '(Parsing CSV...)',
                textarea: '',
                pivotState: {data: []},
            },
            () =>
                Papa.parse(files[0], {
                    skipEmptyLines: true,
                    error: e => alert(e),
                    complete: parsed =>
                        this.setState({
                            mode: 'file',
                            filename: files[0].name,
                            pivotState: {data: parsed.data},
                        }),
                })
        );
    }

    onType(event) {
        Papa.parse(event.target.value, {
            skipEmptyLines: true,
            error: e => alert(e),
            complete: parsed =>
                this.setState({
                    mode: 'text',
                    filename: 'Data from <textarea>',
                    textarea: event.target.value,
                    pivotState: {data: parsed.data},
                }),
        });
    }

    render() {
        return (
            <div>
                <div className="row text-center">
                    <div className="col-md-3 col-md-offset-3">
                        <p>Try it right now on a file...</p>
                        <Dropzone
                            onDrop={this.onDrop.bind(this)}
                            accept="text/csv"
                            className="dropzone"
                            activeClassName="dropzoneActive"
                            rejectClassName="dropzoneReject"
                        >
                            <p>
                                Drop a CSV file here, or click to choose a file
                                from your computer.
                            </p>
                        </Dropzone>
                    </div>
                    <div className="col-md-3 text-center">
                        <p>...or paste some data:</p>
                        <textarea
                            value={this.state.textarea}
                            onChange={this.onType.bind(this)}
                            placeholder="Paste from a spreadsheet or CSV-like file"
                        />
                    </div>
                </div>
                <div className="row text-center">
                    <p>
                        <em>Note: the data never leaves your browser!</em>
                    </p>
                    <br />
                </div>
                <div className="row">
                    <h2 className="text-center">{this.state.filename}</h2>
                    <br />

                    <PivotTableUISmartWrapper {...this.state.pivotState} />
                </div>
            </div>
        );
    }
}
