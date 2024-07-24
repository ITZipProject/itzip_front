import * as React from 'react';

interface IMyResumeHeaderProps {}

const MyResumeHeader: React.FunctionComponent<IMyResumeHeaderProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">
                <span className="text-primary">my</span> 이력서
            </h1>
            <div className="py-5 flex">
                <button className="p-2 border border-bc rounded-xl mr-5">
                    <span className="font-bold text-btnTextColor">🙋🏻 my 이력서</span>
                </button>
                <button className="p-2  bg-primary rounded-xl mr-5">
                    <span className="font-bold text-white">📝 이력서 생성</span>
                </button>
            </div>
        </div>
    );
};

export default MyResumeHeader;
