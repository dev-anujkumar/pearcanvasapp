import React from 'React'
class CommentsForm extends React.Component {
    render() {
        return (
          <div>
                <textarea rows="10"
                    className="new-comment textarea-input"
                    defaultValue="commnet"
                    onChange={this.props.onChange}
                />
                <div className="buttons-wrapper">
                    <button className="btn btn__initial"
                        onClick={this.props.onClick}>
                        Cancel
                </button>
                    <button className="btn btn__initial"
                        onClick={this.props.onClick}>
                        Save
                </button>
                </div>
            </div>
        )
    }
}
export default CommentsForm;