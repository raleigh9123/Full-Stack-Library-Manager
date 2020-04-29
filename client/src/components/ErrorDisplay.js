import React from 'react';

export default function ErrorDisplay({errors}) {
    
    if(errors) {
        return (
            <div>
                {errors.validationError && <h2 className="validation--errors--label">Validation Errors</h2>}
                {errors.validationErrors && <h2 className="validation--errors--label">Validation Errors</h2>}
                {errors.error && <h2 className="validation--errors--label">Login Error</h2>}
                <div className="validation-errors">
                    <ul>
                        {errors.validationError && errors.validationError.map((error, i) => <li key={i}>{error}</li>)}
                        {errors.validationErrors && errors.validationErrors.map((error, i) => <li key={i}>{error}</li>)}
                        {errors.error && <li key={1}>{errors.error}</li>}
                    </ul>
                </div>
            </div>
        )
    } else {
        return null
    }
}