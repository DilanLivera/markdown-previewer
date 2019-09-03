// state needs to keep track of the text change and resizing of the editer and preview
// use markup to styles the text
// use DOMPurify to sanitize the input html

marked.setOptions({
  breaks: true,
  smartLists: true,
  smartypants: true
});


const Editor = (props) => {
  return (
    <div className={ `Editor ${ props.classList }` } >
      <button onClick={ props.onClick } name="editor-maximize-btn" className={ props.icon }></button>
      <textarea onChange={ props.onChange } defaultValue={ props.text }></textarea>
    </div>
  )
}

const Previewer = ({ text, onClick, classList, icon }) => {
  return (
    <div className={ `Previewer ${ classList }` }  >
      <button onClick={ onClick } name="preview-maximize-btn" className={ icon }></button>
      <div dangerouslySetInnerHTML={{ __html: text }} defaultValue={ text }></div>
    </div>
  )
}

class MarkdownPriviewer extends React.Component {
  static defaultProps = {
    preview: "# Welcome to my React Markdown Previewer! \n## This is a sub-heading... \n### And here's some other cool stuff:Heres some code, `<div></div>`, between 2 backticks."
  }

  constructor(props) {
    super(props);
    this.state = {
      markdownText: this.createMarkup(this.props.preview),
      editorWindowMinimized: true, 
      previewWindowMinimized: true, 
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  createMarkup(text) {
    let sanitizeText = DOMPurify.sanitize(text);
    return marked(sanitizeText);
  }

  handleKeyDown(evt) {
    this.setState({ markdownText: this.createMarkup(evt.target.value) });
  }

  maximizeWindow(btn){
    let state = this.state;
    let { editorWindowMinimized, previewWindowMinimized } = state;

    if(btn === "editor-maximize-btn") editorWindowMinimized = !editorWindowMinimized;

    if(btn === "preview-maximize-btn") previewWindowMinimized = !previewWindowMinimized;

    this.setState({
      ...state, editorWindowMinimized, previewWindowMinimized 
    })
  }

  handleClick(evt) {
    this.maximizeWindow(evt.target.name);
  }

  render(){
    let editorClassList = (!this.state.editorWindowMinimized) ?  "maximize " : "";
    editorClassList += (!this.state.previewWindowMinimized) ?  "hide " : "";

    let previewClassList = (!this.state.previewWindowMinimized) ?  "maximize " : "";
    previewClassList += (!this.state.editorWindowMinimized) ?  "hide " : "";

    let editorIcon = (!this.state.editorWindowMinimized) ?  "fa fa-compress" : "fa fa-arrows-alt";
    let previewIcon = (!this.state.previewWindowMinimized) ?  "fa fa-compress" : "fa fa-arrows-alt";;

    return (
      <div className="MarkdownPriviewer-container">
        <Editor
          text={ this.props.preview }  
          onClick={ this.handleClick } 
          onChange={ this.handleKeyDown }
          classList={ editorClassList }
          icon={ editorIcon }
        />
        <Previewer
          text={ this.state.markdownText }  
          onClick={ this.handleClick }
          classList={ previewClassList }
          icon={ previewIcon }
        />
      </div>
    );
  }
}

ReactDOM.render(<MarkdownPriviewer />, document.getElementById("root"));