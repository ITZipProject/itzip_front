'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
interface IMyResumeCardProps {
    myResume: {
        resume_id: number;
        resume_title: string;
        modify_date: string;
    };
}

const MyResumeCard: React.FunctionComponent<IMyResumeCardProps> = ({ myResume }) => {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.push(`/resume/${myResume.resume_id}`);
            }}
        >
            <div className="bg-white h-[150px] p-5 m-5 rounded-xl">
                {myResume && (
                    <>
                        <div className="h-[80%]">
                            <h1 className="font-bold text-left">{myResume.resume_title}</h1>
                            <p className="text-sm text-left">{myResume.modify_date}</p>
                        </div>
                        <div className="h-[20%] flex justify-between">
                            <span>비공개</span>
                            <div>
                                <button className="px-2">수정</button>
                                <button>삭제</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </button>
    );
};

export default MyResumeCard;
