import React from 'react';

import Index from '../Components/Pages/Index/Index';
import Dashboard from '../Components/Pages/dashboard/Dashboard';


const Routes =  {
    "/": () =>  <Index/>,
    "/dashboard": () => <Dashboard/>
}

export default Routes;