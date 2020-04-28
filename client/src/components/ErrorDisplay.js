import React from 'react';

export default function ErrorDisplay({errors}) {
    
    if(errors) {
        return (
            <div>
                <h2 className="validation--errors--label">Validation Errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.validationError && errors.validationError.map((error, i) => <li key={i}>{error}</li>)}
                        {errors.validationErrors && errors.validationErrors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        )
    } else {
        return null
    }
}