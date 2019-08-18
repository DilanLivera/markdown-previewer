// state needs to keep track of the text change
// use markup to styles the text
// use DOMPurify to sanitize the input html

class MarkdownPriviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownText : "# Welcome to my React Markdown Previewer! \n## This is a sub-heading... \n### And here's some other cool stuff:"
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  createMarkup() {
    return { __html: marked(this.state.markdownText) };
  }

  showTextChange(value) {
    this.setState({ markdownText: value });
  }

  handleKeyDown(e) {
    this.showTextChange(e.target.value);
  }

  render(){
    return (
      <div className="MarkdownPriviewer-container">
        <textarea id="editor" onChange={ this.handleKeyDown }></textarea>
        <div className="MarkdownPriviewer-output" id="preview" dangerouslySetInnerHTML={ this.createMarkup() }></div>
      </div>
    );
  }
}