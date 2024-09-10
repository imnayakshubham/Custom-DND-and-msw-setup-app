import { useCallback, useEffect, useState } from 'react';
import { dummyData } from './data';
import axios from 'axios';

export const GridLayoutContainer = () => {
    const [items, setItems] = useState(dummyData);
    const [loading, setLoading] = useState(false);

    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [draggedOver, setDraggedOver] = useState<number | null>(null);



    const fetchItem = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/dummy_data');
            setItems(response.data);
            setLoading(false)

        } catch (error) {
            setLoading(false)

            console.error('Error fetching documents:', error);
        }
    }, [])

    useEffect(() => {
        fetchItem();
    }, [fetchItem]);



    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragOver = useCallback((index: number) => {
        setDraggedOver(index);
    }, []);

    const handleDrop = () => {
        setDraggedItem(null);
        setDraggedOver(null);
    };

    const onDragEnd = () => {
        if (draggedOver === null || draggedItem === null || (draggedOver === draggedItem)) return;
        const reorderedItems = [...items];
        const draggedData = reorderedItems[draggedItem]
        const draggedOverData = reorderedItems[draggedOver]
        reorderedItems[draggedItem] = draggedOverData
        reorderedItems[draggedOver] = draggedData
        setItems(reorderedItems);
        handleDrop()
    };

    return (
        <>
            {loading ? (
                <SkeletonLoader />
            ) : (

                <div className="grid md:grid-cols-3 gap-4 p-4 sm:grid-cols-2 grid-cols-1 ">
                    {items.map((item, index) => (
                        <div
                            key={item.type}
                            className={`p-4 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 ease-in-out ${draggedOver === index
                                ? 'scale-105'
                                : draggedItem === index
                                    ? 'opacity-50'
                                    : ''
                                }`}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                handleDragOver(index);
                            }}
                            onDragEnd={onDragEnd}
                            // onDrop={handleDrop}
                            role="button"
                        >
                            <h3 className="mt-4">{item.title}</h3>
                            <img src={item.url} alt={item.type} className="h-52 object-fit w-full rounded-md" />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};


const SkeletonLoader: React.FC = () => {
    return (
        <div className="grid md:grid-cols-3 gap-4 p-4 sm:grid-cols-2 grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="p-4 rounded-lg shadow-md bg-gray-200 animate-pulse"
                >
                    <div className="h-4 bg-gray-300 rounded-md w-3/4  mb-4"></div>

                    <div className="h-52 bg-gray-300 rounded-md"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
