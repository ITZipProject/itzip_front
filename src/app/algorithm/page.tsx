import React from 'react';
import Left from '../../components/algorithm/Left';
import Main from '../../components/algorithm/Main';
import Top from '../../components/algorithm/Top';

export default function Home() {
    return (
        <div className="flex flex-col gap-11 w-full h-screen overflow-auto">
            <div className="m-10">
                <Top />
            </div>
            <div className="flex mx-11 flex-1 overflow-hidden">
                <div className="w-1/3 h-full overflow-auto">
                    <Left />
                </div>
                <div className="w-2/3 h-full overflow-auto">
                    <Main />
                </div>
            </div>
        </div>
    );
}
