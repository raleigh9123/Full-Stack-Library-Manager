import React from 'react';
import UpdateCourseForm from './UpdateCourseForm';

export default class UpdateCourse extends React.Component {
    async componentDidMount() {
        const { courseId } = this.props.match.params;
        await fetch(`http://localhost:5000/api/courses/${courseId}`)
            .then(res => res.json())
            .then((data) => {
                const { context } = this.props
                const currentUserId = context.authenticatedUser.id;
                if(data.error) {
                    this.props.history.push('/notfound');
                } else if(currentUserId !== data.User.id) {
                    this.props.history.push('/forbidden');
                } else {
                    const { id, title, description, estimatedTime, materialsNeeded, User } = data;
                    this.setState({
                        id,
                        title,
                        description,
                        estimatedTime,
                        materialsNeeded,
                        User,
                        loading: false
                    })
                }
            })
            .catch((errors) => {
                console.log(errors);
                
            })
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
        const userId = context.authenticatedUser.id;
        const { id, title, description, estimatedTime, materialsNeeded } = this.state;
        const course = { id, title, description, estimatedTime, materialsNeeded, userId }

        context.utility.updateCourse(course)
            .then(errData => {
                if(errData) {
                    this.setState({errors: errData})
                } else {
                    this.props.history.push(`/courses/${course.id}`)
                }
            })
            .catch(errors => {
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push(`/courses/${this.state.id}`);
    }

    render() {
        if(this.state.loading) {
            return null
        } else {
            const {
                title,
                description,
                User,
                estimatedTime,
                materialsNeeded,
                errors
            } = this.state;
            const author = `${User.firstName} ${User.lastName}`

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
                                                <p>By {author}</p>
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
}