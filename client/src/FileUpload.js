import React from 'react'
import XLSX from 'xlsx'
import {Loading} from './Loading'
import { connect } from 'react-redux'
import _ from 'underscore'

const orderGuideCols = ['productId', 'name', 'vendor', 'pack', 'size','unit',
'category',
'subcategory',
'location',
'inventoryCode',
'price',
'parLevel',
'currentStock']

const dragDropStyle = {
	height: '150px',
	border: '1px dotted #888',
	backgroundColor: 'rgba(207, 207, 207, 0.48)',
	marginBottom: '25px'
}


const mapStateToProps = state => {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = dispatch => ({
  // importOrderGuide: (payload) =>
  //   dispatch({type: IMPORT_ORDER_GUIDE, payload })
});


class FileUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [],
			cols: []
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
	};
	handleFile = (file/*:File*/) => {
		/* Boilerplate to set up FileReader */
		this.setState({loading: true})
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert to json */
			const data = XLSX.utils.sheet_to_json(ws);
			/* Update state */
			this.setState({ loading: false, data: data, file: bstr, cols: make_cols(ws['!ref']) });
		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};
	exportFile = () => {
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(this.state.data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
	};

	importFile = () => {
		const data = this.state.file
		//TODO: validation & error handling
		//this.props.importOrderGuide(agent.Import.submit(data))
		this.setState({
			file: ''
		})
	};

	render() {
		const {loading} = this.state
		const browserSupport = !!(window.File && window.FileReader && window.FileList && window.Blob)
	  if (browserSupport) {return (
			<div>
				{loading && <Loading />}
				<div className='row'>
					<DragDropFile handleFile={this.handleFile}>
					</DragDropFile>
					<div className='col-md-6'>
							<DataInput handleFile={this.handleFile} />
						</div>
					</div>
						<div className="row"><div className="col-xs-12">
							<button disabled={!this.state.data.length} className="btn btn-success" onClick={this.importFile}>Import</button>
						</div></div>
					<table className="table table-striped table-responsive">
						<tbody>
							{/*<tr>{orderGuideCols.map((c,i) => <td key={i}>{c}</td>)}</tr>
						{this.state.data.length && <tr>{orderGuideCols.map(c => <td><ColsDropdown cols={Object.keys(this.state.data[0])} /></td>)}</tr>}*/}
						</tbody>
					</table>
					<div className="row"><div className="col-xs-12">
							{this.state.data.length && <OutTable data={this.state.data} cols={Object.keys(this.state.data[0])} /> }
						</div></div>
						</div>
					)} else return (<div><h1>This browser does not fully support the HTML5 File API, which Orderr uses for imports. Please use Chrome or another modern browser.</h1></div>)
				};
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	};
	suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
	onDrop(evt) { evt.stopPropagation(); evt.preventDefault();
		const files = evt.dataTransfer.files;
		if(files && files[0]) this.props.handleFile(files[0]);
	};
	render() { return (
<div className='col-md-6' style={dragDropStyle} onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
	drag a spreadsheet file here...
	<img src='/plus.svg' style={{width: '50px', height: '50px', marginTop: '50px'}} />
</div>
	); };
};

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) this.props.handleFile(files[0]);
	};
	render() { return (
<form className="form-inline">
	<div className="form-group">
		<label htmlFor="file">or upload one by clicking here:</label>
		<input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
	</div>
</form>
	); };
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {
	constructor(props) { super(props); };
	render() { return (
<div className="table-responsive">
	<table className="table table-striped">
		<thead>
			<tr>{this.props.cols.map((c, i) => <th key={i}>{c}</th>)}</tr>
		</thead>
		<tbody>
			{this.props.data.map((r,i) => <tr key={i}>
				{this.props.cols.map((c, i) => <td key={i}>{ r[c] }</td>)}
			</tr>)}
		</tbody>
	</table>
</div>
	); };
};

class ColsDropdown extends React.Component {
	constructor(props) { super(props); };
	render() { return (
		<select>
			{this.props.cols.map((c,i) => <option key={i} value={c}>{c}</option>)}
		</select>
	)}
}

/* list of supported file types */
const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

/* generate an array of column objects */
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
}
