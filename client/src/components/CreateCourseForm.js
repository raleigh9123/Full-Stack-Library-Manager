import React from 'react';

export default (props) => {
    const {
        submit,
        cancel,
        errors,
        formElements
    } = props;
    
    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorDisplay errors={errors}/>
            <form onSubmit={handleSubmit}>
                {formElements()}
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

function ErrorDisplay({errors}) {
    
   if(!errors.length) {
       return null
   } else {
       return (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
       )

   }
}

