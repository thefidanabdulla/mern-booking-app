import StarRatingFilter from "../components/StarRatingFilter.tsx";
import SearchResultCard from "../components/SearchResultCard.tsx";
import {useSearchContext} from "../contexts/SearchContext.tsx";
import Pagination from "../components/Pagination.tsx";
import * as apiClient from '../api-client.ts';
import React, {useState} from "react";
import {useQuery} from "react-query";
import HotelTypesFilter from "../components/HotelTypesFilter.tsx";
import FacilitiesFilter from "../components/FacilitiesFilter.tsx";
import PriceFilter from "../components/PriceFilter.tsx";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption
    }

    const { data: hotelData } = useQuery(
        ["searchHotels", searchParams],
        () => apiClient.searchHotels(searchParams)
    );

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStars(
            (prevStars) =>
                event.target.checked
                    ? [...prevStars, starRating]
                    : prevStars.filter((star) => star !== starRating)
        )
    }

    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;

        setSelectedHotelTypes(
            (prevHotelTypes) =>
                event.target.checked
                    ? [...prevHotelTypes, hotelType]
                    : prevHotelTypes.filter((type) => type !== hotelType)
        )
    }

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;

        setSelectedFacilities(
            (prevFacilities) =>
                event.target.checked
                    ? [...prevFacilities, facility]
                    : prevFacilities.filter((facilityItem) => facilityItem !== facility)
        )
    }


    return(
        <div className={'grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'}>
            <div className={'rounded-lg border border-slate-300 p-5 h-fit lg:sticky lg:top-10'}>
                <div className={'space-y-5'}>
                    <h3 className={'text-lg font-semibold border-b border-slate-300 pb-5'}>
                        Filter by:
                    </h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange}
                    />
                    <PriceFilter
                        onChange={(value?:number) => setSelectedPrice(value)}
                        selectedPrice={selectedPrice}
                    />
                </div>
            </div>
            <div className={'flex flex-col gap-5'}>
                <div className={'flex items-center justify-between'}>
                    <span className={'text-xl font-bold '}>
                        {hotelData?.pagination.total} Hotels found {search.destination ? ` in ${search.destination}` : "" }
                    </span>
                    <select
                        value={sortOption}
                        onChange={(event) =>setSortOption(event.target.value)}
                        className={"p-2 border rounded-md text-xs md:text-base"}
                    >
                        <option value={''}>Sort by</option>
                        <option value={'starRating'}>Star Rating</option>
                        <option value={'pricePerNightAsc'}>Price Per Night (low to high)</option>
                        <option value={'pricePerNightDesc'}>Price Per Night (high to low)</option>
                    </select>
                </div>
                {hotelData?.data?.map((hotel) => (
                    <SearchResultCard hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;