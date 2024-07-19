import React from 'react';
import Image from 'next/image';

const Top = () => {
    return (
        <div className="flex w-1/3 justify-between border-2 p-4 bg-white shadow-md">
            <div>
                <Image
                    src="/userImage.png"
                    alt="유저이미지"
                    width={64}
                    height={64}
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold">알고리즘 고수1</h3>
                <h3 className="text-sm text-gray-500">상위 6% [#9,474]</h3>
                <h3 className="text-sm text-yellow-500">Gold | 1557</h3>
            </div>
        </div>
    );
};

export default Top;
