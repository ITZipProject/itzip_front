'use client';

import React, { useEffect, useState } from 'react';
import Left from '../../components/algorithm/Left';
import Main from '../../components/algorithm/Main';
import Top from '../../components/algorithm/Top';
import { fetchAlgorithmData } from '@/api/algorithm/fetchAlgorithmData';

interface AlgorithmData {
    username: string;
}

export default function Home() {
    const [algorithmData, setAlgorithmData] = useState<AlgorithmData[] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAlgorithmData();
                setAlgorithmData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchTermChange = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <div className="flex flex-col gap-11 w-full h-screen overflow-auto">
            <div className="m-10">
                <Top algorithmData={algorithmData} />
            </div>
            <div className="flex mx-11 flex-1 overflow-hidden">
                <div className="w-1/3 h-full overflow-auto">
                    <Left onSearchChange={handleSearchTermChange} />
                </div>
                <div className="w-2/3 h-full overflow-auto">
                    <Main searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    );
}
