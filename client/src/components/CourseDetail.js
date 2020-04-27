import React from 'react';
import {
    Link,
    withRouter 
} from 'react-router-dom';

class CourseDetail extends React.Component {
    
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
    }
    render() {
        if(this.state.loading) {
            return null
        } else {
            const { description, estimatedTime, materialsNeeded, title, User } = this.state.course;
            const { firstName, lastName } = User
            
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
                                            //Add Update Course Redirect
                                        }}>Update Course</Link>
                                        <Link className="button" to={{
                                            //Add Delete Course Redirect
                                        }}>Delete Course</Link>
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

export default withRouter(CourseDetail);