import React from 'react';
import CreateCourseForm from './CreateCourseForm'; 

export default class CreateCourse extends React.Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        author: '',
        errors: []
    }

    render() {
        const {
            title,
            description,
            author,
            errors,
            estimatedTime,
            materialsNeeded
        } = this.state;

        return (
            <div>
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <CreateCourseForm
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
                                                    value={title}
                                                    placeholder='Course Title...'
                                                    className="input-title course--title--input"
                                                    onChange={this.change}/>
                                            </div>
                                            <p>By Joe Smith</p>
                                        </div>
                                        <div className="course--description">
                                            <div>
                                                <textarea 
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    value={description}
                                                    placeholder='Course Description...'
                                                    onChange={this.change}/>
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
                                                        value={estimatedTime}
                                                        placeholder='Hours'
                                                        className="course--time--input"
                                                        onChange={this.change}/>
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea 
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        type="text"
                                                        value={materialsNeeded}
                                                        placeholder='List Materials (separate items with "\n")'
                                                        onChange={this.change}/>
                                                </div>
                                            </li>
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        >
                        </CreateCourseForm>
                    </div>
                </div>    
            </div>
        );
    }
    
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState(() => {
            return {
                [name]:value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const userId = 1;
        const course = {title, description, estimatedTime, materialsNeeded, userId};
        
        context.utility.createCourse(course)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                
                }
            })
            .catch((err) => {
                console.log(err);
                // this.props.history.push('/error');
            });
    }


    cancel = () => {
        this.props.history.push('/courses');
    }


}