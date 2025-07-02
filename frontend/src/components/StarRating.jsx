import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ count = 5, value, onChange }) => {
    const [hover, setHover] = useState(null);

    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {[...Array(count)].map((_, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={ratingValue} style={{ cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => onChange(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            size={30}
                            color={
                                ratingValue <= (hover || value) ? '#f8e825' : '#e4e5e9'
                            }
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
