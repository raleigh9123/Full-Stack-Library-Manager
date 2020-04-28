import React from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends React.Component {
    
    async componentDidMount() {
        const id = this.props.match.params.courseId;
        await fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    course: data,
                    loading: false
                })
            })
    }
    state = {
        course: [],
        loading: true,
        // this.handleCancel = this.handleCancel.bind(this)
    }

    
    handleCancel = (e) => {
        e.preventDefault()
        const { context } = this.props;
        const id = this.state.course.id;
    
        context.utility.deleteCourse(id)
            .then(() => {
                this.props.history.push('/courses');
            })
            .catch (() => {
                this.props.history.push('/error');
            })
    }

    render() {
        if(this.state.loading) {
            return null
        } else {
            const { course } = this.state;
            const { id, description, estimatedTime, materialsNeeded, title, User } = course;
            const { firstName, lastName } = User;
            
            let materialsNeededPrettyPrint;
            if(materialsNeeded) {
                const materialsArray = materialsNeeded.split('* ')
                materialsNeededPrettyPrint = materialsArray.filter(item => item).map((string, stringIndex) => {
                    return (
                        <li key={stringIndex}>{string}</li>
                    )
                })
            }

            return (
                <div>

                    <div>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    <span>
                                        <Link className="button" to={{
                                            pathname: `/courses/${id}/update`,
                                            state: {
                                                ...{course}
                                            }
                                        }}>Update Course</Link>
                                        <button className="button" onClick={this.handleCancel}>Delete Course</button>
                                    </span>
                                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By {firstName} {lastName}</p>
                            </div>
                            <div className="course--description">
                            <p>{description}</p>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {materialsNeededPrettyPrint}
                                    </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            );
        }
    }
}