import {Link} from 'react-router-dom';

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div className='page'>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': 'red'}}>Page doesn't exist!</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/wizard-form">Back to main page</Link>
        </div>
    )
}

export default Page404;