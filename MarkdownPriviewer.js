// state needs to keep track of the text change and resizing of the editer and preview
// use markup to styles the text
// use DOMPurify to sanitize the input html

marked.setOptions({
  breaks: true,
  smartLists: true,
  smartypants: true
});

class MarkdownPriviewer extends React.Component {
  static defaultProps = {
    preview: "# Welcome to my React Markdown Previewer! \n## This is a sub-heading... \n### And here's some other cool stuff:Heres some code, `<div></div>`, between 2 backticks."
  }

  constructor(props) {
    super(props);
    this.state = {
      markdownText: this.props.preview,
      editorWindowMinimized: true, 
      previewWindowMinimized: true, 
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  createMarkup() {
    let sanitizeText = DOMPurify.sanitize(this.state.markdownText);
    return { __html: marked(sanitizeText) };
  }

  showTextChange(value) {
    this.setState({ markdownText: value });
  }

  handleKeyDown(evt) {
    this.showTextChange(evt.target.value);
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
    return (
      <div className="MarkdownPriviewer-container">
        <div 
          className="MarkdownPriviewer-editor" 
          style={{ 
            width: (!this.state.editorWindowMinimized) ? "100%" : "50%" , 
            display: (!this.state.previewWindowMinimized) ? "none" : "block" 
          }}
        >
          <button onClick={ this.handleClick } name="editor-maximize-btn">X</button>
          <textarea id="editor" onChange={ this.handleKeyDown } defaultValue={ this.props.preview }></textarea>
        </div>
        <div 
          className="MarkdownPriviewer-preview"
          style={{ 
            width: (!this.state.previewWindowMinimized) ? "100%" : "50%" , 
            display: (!this.state.editorWindowMinimized) ? "none" : "block" 
          }}
        >
          <button onClick={ this.handleClick } name="preview-maximize-btn">X</button>
          <div className="MarkdownPriviewer-output" id="preview" dangerouslySetInnerHTML={ this.createMarkup() }></div>
        </div>
      </div>
    );
  }
}