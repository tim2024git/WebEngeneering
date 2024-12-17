import React from 'react';

import HomeCarousel from './HomeCarousel';
import Header from './Header';

function HomeView() {
    return (
        <div className="content-container mt-5">
            <Header />
            <HomeCarousel />
        </div>
    );
}

export default HomeView;