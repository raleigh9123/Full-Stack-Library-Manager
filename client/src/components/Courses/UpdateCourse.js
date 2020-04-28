import React from 'react';
import UpdateCourseForm from './UpdateCourseForm';

export default class UpdateCourse extends React.Component {

    componentDidMount() {
        const { course } = this.props.location.state;
        const { id, title, description, author, estimatedTime, materialsNeeded, User } = course;
        this.setState({ 
            id,
            title, 
            description, 
            author: `${User.firstName} ${User.lastName}`,
            estimatedTime, 
            materialsNeeded,
            loading: false })
    }
    
    state = {
        errors: [],
        loading: true
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState( () => {
            return {
                [name]:value
            }
        })
    }

    submit = () => {
        const { context } = this.props;
        const { id, title, description, estimatedTime, materialsNeeded } = this.state;
        const userId = 1;
        const course = { id, title, description, estimatedTime, materialsNeeded, userId }

        context.utility.updateCourse(course)
            .then(errData => {
                if(errData) {
                    this.setState({errors: errData})
                } else {
                }
                this.props.history.push(`/courses/${course.id}`)
            })
            .catch(errors => {
                console.log('catch runs ' + errors);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push(`/courses/${this.state.id}`);
    }

    render() {

        const {
            title,
            description,
            author,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;


        if(this.state.loading) {
            return null
        } else 
        return (
            <div>
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <UpdateCourseForm
                            submit={this.submit}
                            cancel={this.cancel}
                            errors={errors}
                            formElements={() => (
                                <React.Fragment>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div>
                                                <input 
                                                    id="title" 
                                                    name="title" 
                                                    type="text" 
                                                    className="input-title course--title--input"
                                                    placeholder="Course title..."
                                                    onChange={this.change}
                                                    value={title} />
                                            </div>
                                            <p>{author}</p>
                                        </div>
                                        <div className="course--description">
                                            <div>
                                                <textarea 
                                                    id="description"
                                                    name="description"
                                                    className=""
                                                    placeholder="Course description..."
                                                    onChange={this.change}
                                                    value={description} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div>
                                                        <input 
                                                            id="estimatedTime"
                                                            name="estimatedTime"
                                                            type="text"
                                                            className="course--time--input"
                                                            placeholder="Hours"
                                                            onChange={this.change}
                                                            value={estimatedTime}/>
                                                    </div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div>
                                                        <textarea
                                                            id="materialsNeeded"
                                                            name="materialsNeeded"
                                                            className=""
                                                            placeholder="List materials..."
                                                            onChange={this.change}
                                                            value={materialsNeeded}/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}>
                        </UpdateCourseForm>
                    </div>
                </div>
            </div>
        );
    }
}