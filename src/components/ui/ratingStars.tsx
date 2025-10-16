'use client';

import { Star } from "lucide-react";

interface RatingStarsProps {
    num: number;
    size?: number;
    className?: string;
}

export default function RatingStars({ num, size = 20, className }: RatingStarsProps) {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div className={`flex items-center gap-1 ${className || ''}`}>
            {stars.map((star) => {
                if (num >= star) {
                    return <Star key={star} size={size} className="text-yellow-400 fill-yellow-400" />;
                } else if (num >= star - 0.5) {
                    return (
                        <div key={star} className="relative">
                            <Star size={size} className="text-yellow-400 fill-yellow-400 absolute left-0 w-1/2 overflow-hidden" />
                            <Star size={size} className="text-yellow-400" />
                        </div>
                    );
                } else {
                    return <Star key={star} size={size} className="text-yellow-400" />;
                }
            })}
        </div>
    );
}
