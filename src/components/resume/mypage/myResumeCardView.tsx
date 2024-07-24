'use client';
import AdminResumeApi from '@/api/resume/adminResume';
import * as React from 'react';
import MyResumeCard from './myResumeCard';

interface IMyResumeCardViewProps {}

const MyResumeCardView: React.FunctionComponent<IMyResumeCardViewProps> = () => {
    const [myResumeData, setMyResumeData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AdminResumeApi();
                setMyResumeData(data.resume);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    console.log(myResumeData);
    return (
        <div>
            <div className=" bg-gray my-5 rounded-lg grid grid-cols-4 gap-4">
                {myResumeData.length > 0 &&
                    myResumeData.map((myResume, index) => {
                        return <MyResumeCard key={index} myResume={myResume}></MyResumeCard>;
                    })}
            </div>
        </div>
    );
};

export default MyResumeCardView;
