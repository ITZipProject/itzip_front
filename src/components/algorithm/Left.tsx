import React from 'react';

interface LeftProps {
    onSearchChange: (term: string) => void;
}

const Left: React.FC<LeftProps> = ({ onSearchChange }) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="flex flex-col gap-4 p-4 border-2 rounded-md shadow-md bg-white h-full">
            <div className="mb-4">
                <input
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">태그 순위</h3>
                <div className="w-full h-72 gap-1 border-2 border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center p-4 overflow-y-auto">
                    {Array(8)
                        .fill('다이나믹 프로그래밍')
                        .map((tag, index) => (
                            <h3 key={index} className="text-gray-700">
                                {index + 1}. {tag}
                            </h3>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Left;
