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
    <div width={ props.width } >
      <button onClick={ props.onClick }>X</button>
      <textarea onChange={ props.onChange } defaultValue={ props.text }></textarea>
    </div>
  )
}

const Previewer = ({ text, width, onClick }) => {
  return (
    <div width={ width } >
      <button onClick={ onClick }>X</button>
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
    return (
      <div className="MarkdownPriviewer-container">
        <Editor
          text={ this.props.preview }  
          onClick={ this.handleClick } 
          onChange={ this.handleKeyDown }
          width={ 600 } 
        />
        <Previewer
          text={ this.state.markdownText }  
          onClick={ this.handleClick } 
          width={ 600 } 
        />
      </div>
    );
  }
}

ReactDOM.render(<MarkdownPriviewer />, document.getElementById("root"));