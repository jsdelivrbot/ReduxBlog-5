import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        const { fields: {title, categories, content }, handleSubmit } = this.props;
        //=== const handleSubmit = this.props.handleSubmit;
        //=== const title = this.props.fields.title
        return (
            <form onSubmit={handleSubmit(this.props.createPost)}>
                <h3>Create A New Post</h3>

                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}` }>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors={};
    if (!values.title) {
        errors.title = 'Enter a username';
    }
    if (!values.categories) {
        errors.categories = 'Enter categories';
    }
    if (!values.content) {
        errors.content = 'Enter some content';
    }
    return errors;
}

// connect : first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form copnfig, 2nd is mapStatetoProps, 3rd is mapDispatchToProps
export default reduxForm({
    form: 'PostNewForm',
    fields: ['title','categories','content'],
    validate
}, null, { createPost })(PostsNew);