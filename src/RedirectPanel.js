import {Navigate, Route, Routes} from "react-router-dom";

function redirect () {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/login' replace /> } />
        </Routes>
    )
}
export default redirect