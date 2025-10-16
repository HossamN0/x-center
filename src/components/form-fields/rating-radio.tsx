import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
    label: string;
    name: string;
    register: any;
    required?: boolean;
    errors?: any;
    defaultValue?: number;
    size?: "sm" | "md" | "lg";
    color?: string;
}

function StarRating({
    label,
    name,
    register,
    required = true,
    errors,
    defaultValue = 0,
    size = "md",
    color = "#fbbf24" // yellow-400
}: StarRatingProps) {
    const t = useTranslations("form");
    const [rating, setRating] = useState(defaultValue);
    const [hover, setHover] = useState(0);

    // Size configurations
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    const labelSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    const getStarColor = (star: number) => {
        if (star <= (hover || rating)) {
            return color; // Active color
        }
        return "#d1d5db"; // gray-300
    };

    const getStarFill = (star: number) => {
        return star <= (hover || rating) ? color : "none";
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className={`block ${labelSizeClasses[size]} font-medium text-gray-700`}>
                {label}
            </Label>

            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="relative">
                        <input
                            {...register(name, {
                                required: { value: required, message: t("required", { field: label }) },
                                min: { value: 1, message: t("required", { field: label }) }
                            })}
                            type="radio"
                            id={`${name}-${star}`}
                            name={name}
                            value={star}
                            className="absolute opacity-0 w-0 h-0"
                            onClick={() => setRating(star)}
                        />
                        <label
                            htmlFor={`${name}-${star}`}
                            className="cursor-pointer transition-colors duration-200 hover:scale-110"
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <Star
                                className={sizeClasses[size]}
                                fill={getStarFill(star)}
                                color={getStarColor(star)}
                            />
                        </label>
                    </div>
                ))}
            </div>

            {errors && errors[name] && (
                <Label className="text-red-500 text-sm font-normal mt-1 block">
                    {errors[name].message}
                </Label>
            )}
        </div>
    );
}

export default StarRating;