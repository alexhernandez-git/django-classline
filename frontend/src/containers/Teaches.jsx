import React from 'react';
import "static/assets/styles/containers/StudentsZone.scss"
import { Route, Redirect } from 'react-router-dom';
import ScrollToTop from "src/utils/ScrollToTop"

import StudentsMenu from "src/components/Users/Students/StudentsZone/StudentsMenu"
// import StudentsProfileEdit from "src/components/Users/Students/StudentsZone/StudentsProfileEdit/StudentsProfileEdit"
import { AppContext } from 'src/context/AppContext'
const StudentsZone = () => {

    return (
        <AppContext.Consumer>
            {appContext => (
                <>
                    {
                        appContext.userProfile.user.profile.is_teacher ?
                            <>
                                <Redirect
                                    to={{
                                        pathname: "/",
                                    }}
                                />
                            </>
                            :
                            ''
                    }

                </>
            )
            }
        </AppContext.Consumer >
    );
}

export default StudentsZone;
