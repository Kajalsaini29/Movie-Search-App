"use client";

import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";


interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void;
}

export default function MovieCard({ movie, isFavorite, toggleFavorite }: MovieCardProps) {
    return (
        <div
            key={movie.imdbID}
            className="relative border rounded-lg shadow-md bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
        >
            {/* Poster */}
            {movie.Poster && movie.Poster !== "N/A" ? (
                <div className="relative aspect-[2/3] w-full">
                    <Image
                        src={movie.Poster}
                        alt={movie.Title}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="aspect-[2/3] w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                </div>
            )}

            {/* Content */}
            
            <div className="p-3">
                <h3 className="font-semibold text-lg truncate">{movie.Title}</h3>
                <p className="text-sm text-gray-600">{movie.Year}</p>
            </div>

            {/* Favorite Button */}

            <button
                onClick={() => toggleFavorite(movie.imdbID)}
                className="absolute top-3 right-3"
            >
                {isFavorite ? (
                    <HeartIcon className="h-7 w-7 text-red-600 transition" />
                ) : (
                    <HeartOutline className="h-7 w-7 text-gray-400 transition" />
                )}
            </button>

        </div>
    );
}
