// state needs to keep track of the text change
// use markup to styles the text
// use DOMPurify to sanitize the input html

class MarkdownPriviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownText : "# Welcome to my React Markdown Previewer! \n## This is a sub-heading... \n### And here's some other cool stuff:"
    }
  }

  createMarkup() {
    return { __html: marked(this.state.markdownText) };
  }

  render(){
    return (
      <div className="MarkdownPriviewer-container">
        <textarea id="editor" >
        </textarea>
        <div className="MarkdownPriviewer-output" id="preview" dangerouslySetInnerHTML={ this.createMarkup() }>
        </div>
      </div>
    );
  }
}